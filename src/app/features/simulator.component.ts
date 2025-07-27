import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PhysicsSimulatorService, Material, Component as SimComponent, SimulationProject, SimulationState } from '../services/physics-simulator.service';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="simulator-container">
      <!-- Authentication Check -->
      <div *ngIf="!isAuthenticated" class="auth-required">
        <div class="auth-card">
          <h2>🔒 Account Required</h2>
          <p>You need to be logged in to access the Physics Simulator.</p>
          <div class="auth-buttons">
            <button (click)="goToLogin()" class="btn btn-primary">Login</button>
            <button (click)="goToSignUp()" class="btn btn-secondary">Sign Up</button>
          </div>
        </div>
      </div>

      <!-- Simulator Interface -->
      <div *ngIf="isAuthenticated" class="simulator-interface">
        <!-- Header -->
        <div class="simulator-header">
          <h1>🔬 Physics Simulator</h1>
          <p>Build and experiment with real-life physics models</p>
          <div class="user-info">
            Welcome, {{ currentUser?.username }}!
          </div>
        </div>

        <!-- Project Management -->
        <div class="project-section">
          <div class="project-controls">
            <div class="project-info" *ngIf="currentProject">
              <h3>{{ currentProject.name }}</h3>
              <p>{{ currentProject.description }}</p>
              <small>Last modified: {{ currentProject.lastModified | date:'short' }}</small>
            </div>
            <div class="project-actions">
              <button (click)="showNewProjectModal = true" class="btn btn-primary">New Project</button>
              <button (click)="exportProject()" class="btn btn-secondary" [disabled]="!currentProject">Export</button>
              <input type="file" #fileInput (change)="importProject($event)" accept=".json" style="display: none;">
              <button (click)="fileInput.click()" class="btn btn-secondary">Import</button>
            </div>
          </div>
        </div>

        <!-- Main Simulator -->
        <div class="simulator-main" *ngIf="currentProject">
          <!-- Component Library -->
          <div class="component-library">
            <h3>Component Library</h3>
            <div class="component-templates">
              <div *ngFor="let template of componentTemplates | keyvalue" 
                   class="component-template"
                   (click)="addComponentToProject(template.key)">
                <div class="template-icon">{{ getComponentIcon(template.value.type) }}</div>
                <div class="template-info">
                  <h4>{{ template.value.name }}</h4>
                  <p>Cost: ${{ calculateTemplateCost(template.value) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 3D Workspace -->
          <div class="workspace">
            <div class="workspace-header">
              <h3>Workspace</h3>
              <div class="simulation-controls">
                <button (click)="startSimulation()" 
                        [disabled]="simulationState.isRunning || currentProject.components.length === 0"
                        class="btn btn-success">
                  ▶️ Start
                </button>
                <button (click)="stopSimulation()" 
                        [disabled]="!simulationState.isRunning"
                        class="btn btn-warning">
                  ⏸️ Stop
                </button>
                <button (click)="resetSimulation()" class="btn btn-danger">
                  🔄 Reset
                </button>
              </div>
            </div>
            
            <div class="workspace-canvas">
              <div class="canvas-grid">
                <div *ngFor="let component of currentProject.components" 
                     class="component-item"
                     [style.left.px]="component.position.x * 50 + 200"
                     [style.top.px]="component.position.y * 50 + 200"
                     (click)="selectComponent(component)">
                  <div class="component-visual" [style.background-color]="getComponentColor(component)">
                    {{ getComponentIcon(component.type) }}
                  </div>
                  <div class="component-label">{{ component.name }}</div>
                  <div class="component-status" *ngIf="simulationState.isRunning">
                    <div class="force-indicator">
                      F: {{ getForceDisplay(component.id) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Properties Panel -->
          <div class="properties-panel">
            <h3>Properties</h3>
            <div *ngIf="selectedComponent" class="component-properties">
              <h4>{{ selectedComponent.name }}</h4>
              <div class="property-group">
                <label>Position</label>
                <div class="position-controls">
                  <input type="number" [(ngModel)]="selectedComponent.position.x" 
                         (change)="updateComponent()" placeholder="X">
                  <input type="number" [(ngModel)]="selectedComponent.position.y" 
                         (change)="updateComponent()" placeholder="Y">
                  <input type="number" [(ngModel)]="selectedComponent.position.z" 
                         (change)="updateComponent()" placeholder="Z">
                </div>
              </div>
              
              <div class="property-group">
                <label>Materials</label>
                <div *ngFor="let material of selectedComponent.materials" class="material-item">
                  <span>{{ getMaterialName(material.materialId) }}</span>
                  <input type="number" [(ngModel)]="material.quantity" 
                         (change)="updateComponent()" min="1">
                  <span class="material-cost">${{ getMaterialCost(material.materialId, material.quantity) }}</span>
                </div>
              </div>

              <div class="property-group">
                <label>Physics Properties</label>
                <div *ngFor="let prop of getComponentProperties(selectedComponent)" class="physics-property">
                  <label>{{ prop.key }}</label>
                  <input type="number" [(ngModel)]="selectedComponent.properties[prop.key]" 
                         (change)="updateComponent()" [step]="prop.step">
                  <span class="property-unit">{{ prop.unit }}</span>
                </div>
              </div>

              <button (click)="removeComponent(selectedComponent.id)" class="btn btn-danger">
                🗑️ Remove Component
              </button>
            </div>

            <div *ngIf="!selectedComponent" class="no-selection">
              <p>Select a component to view its properties</p>
            </div>
          </div>
        </div>

        <!-- Simulation Dashboard -->
        <div class="simulation-dashboard" *ngIf="currentProject">
          <h3>Simulation Data</h3>
          <div class="dashboard-metrics">
            <div class="metric">
              <label>Time</label>
              <span>{{ simulationState.currentTime.toFixed(2) }}s</span>
            </div>
            <div class="metric">
              <label>Temperature</label>
              <span>{{ (simulationState.temperature - 273.15).toFixed(1) }}°C</span>
            </div>
            <div class="metric">
              <label>Pressure</label>
              <span>{{ (simulationState.pressure / 1000).toFixed(1) }} kPa</span>
            </div>
            <div class="metric">
              <label>Total Energy</label>
              <span>{{ simulationState.energy.toFixed(0) }} J</span>
            </div>
            <div class="metric">
              <label>Efficiency</label>
              <span>{{ (simulationState.efficiency * 100).toFixed(1) }}%</span>
            </div>
          </div>

          <div class="environment-controls">
            <h4>Environment Settings</h4>
            <div class="env-control">
              <label>Temperature (K)</label>
              <input type="number" [(ngModel)]="currentProject.environment.temperature" 
                     (change)="updateProject()" min="0" step="0.1">
            </div>
            <div class="env-control">
              <label>Pressure (Pa)</label>
              <input type="number" [(ngModel)]="currentProject.environment.pressure" 
                     (change)="updateProject()" min="0" step="1000">
            </div>
            <div class="env-control">
              <label>Gravity (m/s²)</label>
              <input type="number" [(ngModel)]="currentProject.environment.gravity" 
                     (change)="updateProject()" min="0" step="0.1">
            </div>
          </div>
        </div>

        <!-- Materials Reference -->
        <div class="materials-reference">
          <h3>Available Materials</h3>
          <div class="materials-grid">
            <div *ngFor="let material of materials" class="material-card">
              <div class="material-color" [style.background-color]="material.color"></div>
              <div class="material-info">
                <h4>{{ material.name }}</h4>
                <p>{{ material.description }}</p>
                <div class="material-properties">
                  <span>Density: {{ material.density }} kg/m³</span>
                  <span>Cost: ${{ material.cost }}/unit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Project Modal -->
      <div *ngIf="showNewProjectModal" class="modal-overlay" (click)="showNewProjectModal = false">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Create New Project</h3>
          <div class="form-group">
            <label>Project Name</label>
            <input type="text" [(ngModel)]="newProjectName" placeholder="Enter project name">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newProjectDescription" placeholder="Enter project description"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="createNewProject()" class="btn btn-primary" [disabled]="!newProjectName">Create</button>
            <button (click)="showNewProjectModal = false" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .simulator-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .auth-required {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 400px;
    }

    .auth-card h2 {
      color: #2c3e50;
      margin-bottom: 20px;
    }

    .auth-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
    }

    .simulator-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      text-align: center;
    }

    .simulator-header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
    }

    .user-info {
      margin-top: 15px;
      opacity: 0.9;
    }

    .project-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .project-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-actions {
      display: flex;
      gap: 10px;
    }

    .simulator-main {
      display: grid;
      grid-template-columns: 250px 1fr 300px;
      gap: 20px;
      margin-bottom: 30px;
    }

    .component-library {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .component-templates {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .component-template {
      display: flex;
      align-items: center;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .component-template:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }

    .template-icon {
      font-size: 24px;
      margin-right: 15px;
    }

    .template-info h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
    }

    .template-info p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }

    .workspace {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .workspace-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
    }

    .simulation-controls {
      display: flex;
      gap: 10px;
    }

    .workspace-canvas {
      height: 500px;
      position: relative;
      background: 
        linear-gradient(90deg, #f0f0f0 1px, transparent 1px),
        linear-gradient(#f0f0f0 1px, transparent 1px);
      background-size: 50px 50px;
      overflow: hidden;
    }

    .canvas-grid {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .component-item {
      position: absolute;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .component-item:hover {
      transform: scale(1.1);
    }

    .component-visual {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .component-label {
      text-align: center;
      font-size: 0.8em;
      margin-top: 5px;
      color: #333;
    }

    .component-status {
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      margin-top: 5px;
    }

    .properties-panel {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .component-properties {
      margin-top: 15px;
    }

    .property-group {
      margin-bottom: 20px;
    }

    .property-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
      color: #2c3e50;
    }

    .position-controls {
      display: flex;
      gap: 5px;
    }

    .position-controls input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .material-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .material-cost {
      color: #28a745;
      font-weight: bold;
    }

    .physics-property {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .physics-property label {
      flex: 1;
      margin: 0;
    }

    .physics-property input {
      width: 80px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .property-unit {
      color: #666;
      font-size: 0.9em;
    }

    .simulation-dashboard {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .dashboard-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    .metric {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }

    .metric label {
      display: block;
      font-size: 0.9em;
      color: #666;
      margin-bottom: 5px;
    }

    .metric span {
      font-size: 1.2em;
      font-weight: bold;
      color: #2c3e50;
    }

    .environment-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .env-control {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .env-control input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .materials-reference {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .material-card {
      display: flex;
      align-items: center;
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .material-color {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      margin-right: 15px;
    }

    .material-info h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
    }

    .material-info p {
      margin: 0 0 8px 0;
      color: #666;
      font-size: 0.9em;
    }

    .material-properties {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .material-properties span {
      font-size: 0.8em;
      color: #888;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #2c3e50;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }

    .form-group textarea {
      height: 100px;
      resize: vertical;
    }

    .modal-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5a6fd8;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #5a6268;
    }

    .btn-success {
      background: #28a745;
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      background: #218838;
    }

    .btn-warning {
      background: #ffc107;
      color: #212529;
    }

    .btn-warning:hover:not(:disabled) {
      background: #e0a800;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background: #c82333;
    }

    .no-selection {
      text-align: center;
      color: #666;
      padding: 40px 20px;
    }

    @media (max-width: 1200px) {
      .simulator-main {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .component-library {
        order: 3;
      }
      
      .workspace {
        order: 1;
      }
      
      .properties-panel {
        order: 2;
      }
    }
  `]
})
export class SimulatorComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentUser: any = null;
  currentProject: SimulationProject | null = null;
  simulationState: SimulationState = {
    isRunning: false,
    currentTime: 0,
    temperature: 293.15,
    pressure: 101325,
    energy: 0,
    efficiency: 0,
    forces: {},
    velocities: {}
  };
  
  materials: Material[] = [];
  componentTemplates: any = {};
  selectedComponent: SimComponent | null = null;
  
  showNewProjectModal = false;
  newProjectName = '';
  newProjectDescription = '';
  
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private simulatorService: PhysicsSimulatorService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        this.isAuthenticated = !!user;
      })
    );

    // Load simulator data
    this.materials = this.simulatorService.getMaterials();
    this.componentTemplates = this.simulatorService.getComponentTemplates();

    // Subscribe to current project
    this.subscriptions.push(
      this.simulatorService.currentProject$.subscribe(project => {
        this.currentProject = project;
      })
    );

    // Subscribe to simulation state
    this.subscriptions.push(
      this.simulatorService.simulationState$.subscribe(state => {
        this.simulationState = state;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  createNewProject() {
    if (this.newProjectName.trim()) {
      this.simulatorService.createNewProject(this.newProjectName, this.newProjectDescription);
      this.showNewProjectModal = false;
      this.newProjectName = '';
      this.newProjectDescription = '';
    }
  }

  addComponentToProject(templateKey: string) {
    if (this.currentProject) {
      const position = {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: 0
      };
      this.simulatorService.addComponent(templateKey, position);
    }
  }

  selectComponent(component: SimComponent) {
    this.selectedComponent = component;
  }

  updateComponent() {
    if (this.selectedComponent) {
      this.simulatorService.updateComponent(this.selectedComponent.id, this.selectedComponent);
    }
  }

  removeComponent(componentId: string) {
    this.simulatorService.removeComponent(componentId);
    if (this.selectedComponent?.id === componentId) {
      this.selectedComponent = null;
    }
  }

  updateProject() {
    // Project updates are handled automatically through the service
  }

  startSimulation() {
    this.simulatorService.startSimulation();
  }

  stopSimulation() {
    this.simulatorService.stopSimulation();
  }

  resetSimulation() {
    this.simulatorService.resetSimulation();
  }

  exportProject() {
    const projectData = this.simulatorService.exportProject();
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.currentProject?.name || 'project'}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importProject(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.simulatorService.importProject(content);
      };
      reader.readAsText(file);
    }
  }

  getComponentIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'engine': '⚙️',
      'collider': '🔬',
      'generator': '⚡',
      'motor': '🔧',
      'custom': '🔩'
    };
    return icons[type] || '🔩';
  }

  getComponentColor(component: SimComponent): string {
    const colors: { [key: string]: string } = {
      'engine': '#e74c3c',
      'collider': '#3498db',
      'generator': '#f39c12',
      'motor': '#9b59b6',
      'custom': '#95a5a6'
    };
    return colors[component.type] || '#95a5a6';
  }

  calculateTemplateCost(template: any): number {
    return this.simulatorService.calculateMaterialCost(template.requiredMaterials);
  }

  getMaterialName(materialId: string): string {
    const material = this.materials.find(m => m.id === materialId);
    return material ? material.name : 'Unknown';
  }

  getMaterialCost(materialId: string, quantity: number): number {
    const material = this.materials.find(m => m.id === materialId);
    return material ? material.cost * quantity : 0;
  }

  getComponentProperties(component: SimComponent): any[] {
    const propertyConfigs: { [key: string]: any[] } = {
      'engine': [
        { key: 'displacement', unit: 'cm³', step: 1 },
        { key: 'maxPressure', unit: 'bar', step: 0.1 },
        { key: 'operatingTemp', unit: 'K', step: 1 },
        { key: 'efficiency', unit: '', step: 0.01 }
      ],
      'collider': [
        { key: 'energy', unit: 'eV', step: 1000 },
        { key:
