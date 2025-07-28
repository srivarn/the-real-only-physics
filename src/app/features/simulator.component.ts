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
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
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
  ) { }

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
        { key: 'energy', unit: 'eV', step: 1000 }
      ],
    }
    return propertyConfigs[component.type] || [];
  }

   getForceDisplay(componentId: string): string {
    return this.simulationState.forces[componentId]?.y?.toFixed(2) || '0.00';
  }
}
