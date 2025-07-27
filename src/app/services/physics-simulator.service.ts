import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Material {
  id: string;
  name: string;
  density: number; // kg/m³
  conductivity: number; // W/m·K
  specificHeat: number; // J/kg·K
  elasticity: number; // GPa
  cost: number;
  color: string;
  description: string;
}

export interface Component {
  id: string;
  name: string;
  type: 'engine' | 'collider' | 'generator' | 'motor' | 'custom';
  materials: { materialId: string; quantity: number }[];
  properties: { [key: string]: any };
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

export interface SimulationProject {
  id: string;
  name: string;
  description: string;
  components: Component[];
  environment: {
    temperature: number; // Kelvin
    pressure: number; // Pa
    gravity: number; // m/s²
    airDensity: number; // kg/m³
  };
  physics: {
    timeStep: number;
    iterations: number;
    damping: number;
  };
  createdAt: Date;
  lastModified: Date;
}

export interface SimulationState {
  isRunning: boolean;
  currentTime: number;
  temperature: number;
  pressure: number;
  energy: number;
  efficiency: number;
  forces: { [componentId: string]: { x: number; y: number; z: number } };
  velocities: { [componentId: string]: { x: number; y: number; z: number } };
}

@Injectable({
  providedIn: 'root'
})
export class PhysicsSimulatorService {
  private currentProjectSubject = new BehaviorSubject<SimulationProject | null>(null);
  public currentProject$ = this.currentProjectSubject.asObservable();

  private simulationStateSubject = new BehaviorSubject<SimulationState>({
    isRunning: false,
    currentTime: 0,
    temperature: 293.15, // 20°C
    pressure: 101325, // 1 atm
    energy: 0,
    efficiency: 0,
    forces: {},
    velocities: {}
  });
  public simulationState$ = this.simulationStateSubject.asObservable();

  private materials: Material[] = [
    {
      id: 'steel',
      name: 'Steel',
      density: 7850,
      conductivity: 50,
      specificHeat: 490,
      elasticity: 200,
      cost: 10,
      color: '#C0C0C0',
      description: 'Strong, durable metal suitable for structural components'
    },
    {
      id: 'aluminum',
      name: 'Aluminum',
      density: 2700,
      conductivity: 237,
      specificHeat: 897,
      elasticity: 70,
      cost: 15,
      color: '#D3D3D3',
      description: 'Lightweight metal with excellent heat conduction'
    },
    {
      id: 'copper',
      name: 'Copper',
      density: 8960,
      conductivity: 401,
      specificHeat: 385,
      elasticity: 130,
      cost: 25,
      color: '#B87333',
      description: 'Excellent electrical and thermal conductor'
    },
    {
      id: 'titanium',
      name: 'Titanium',
      density: 4500,
      conductivity: 22,
      specificHeat: 523,
      elasticity: 116,
      cost: 100,
      color: '#C0C0C0',
      description: 'Ultra-strong, lightweight, corrosion-resistant'
    },
    {
      id: 'carbon_fiber',
      name: 'Carbon Fiber',
      density: 1600,
      conductivity: 100,
      specificHeat: 710,
      elasticity: 230,
      cost: 200,
      color: '#2F2F2F',
      description: 'Ultra-lightweight with exceptional strength'
    },
    {
      id: 'glass',
      name: 'Borosilicate Glass',
      density: 2230,
      conductivity: 1.2,
      specificHeat: 830,
      elasticity: 63,
      cost: 5,
      color: '#E6F3FF',
      description: 'Heat-resistant glass for observation windows'
    }
  ];

  private componentTemplates = {
    stirling_engine: {
      name: 'Stirling Engine',
      type: 'engine' as const,
      requiredMaterials: [
        { materialId: 'steel', quantity: 5 },
        { materialId: 'aluminum', quantity: 3 },
        { materialId: 'glass', quantity: 1 }
      ],
      properties: {
        displacement: 100, // cm³
        maxPressure: 10, // bar
        operatingTemp: 373, // K
        efficiency: 0.3
      }
    },
    particle_collider: {
      name: 'Particle Collider',
      type: 'collider' as const,
      requiredMaterials: [
        { materialId: 'steel', quantity: 20 },
        { materialId: 'copper', quantity: 10 },
        { materialId: 'titanium', quantity: 5 }
      ],
      properties: {
        energy: 1000000, // eV
        magneticField: 2, // Tesla
        beamRadius: 0.001, // m
        length: 10 // m
      }
    },
    electric_generator: {
      name: 'Electric Generator',
      type: 'generator' as const,
      requiredMaterials: [
        { materialId: 'copper', quantity: 8 },
        { materialId: 'steel', quantity: 6 },
        { materialId: 'aluminum', quantity: 4 }
      ],
      properties: {
        voltage: 220, // V
        current: 10, // A
        frequency: 50, // Hz
        efficiency: 0.85
      }
    }
  };

  constructor() {}

  getMaterials(): Material[] {
    return [...this.materials];
  }

  getComponentTemplates() {
    return { ...this.componentTemplates };
  }

  createNewProject(name: string, description: string): SimulationProject {
    const project: SimulationProject = {
      id: this.generateId(),
      name,
      description,
      components: [],
      environment: {
        temperature: 293.15, // 20°C
        pressure: 101325, // 1 atm
        gravity: 9.81, // m/s²
        airDensity: 1.225 // kg/m³
      },
      physics: {
        timeStep: 0.016, // 60 FPS
        iterations: 10,
        damping: 0.99
      },
      createdAt: new Date(),
      lastModified: new Date()
    };

    this.currentProjectSubject.next(project);
    return project;
  }

  addComponent(templateKey: string, position: { x: number; y: number; z: number }): Component | null {
    const template = this.componentTemplates[templateKey as keyof typeof this.componentTemplates];
    if (!template) return null;

    const component: Component = {
      id: this.generateId(),
      name: template.name,
      type: template.type,
      materials: template.requiredMaterials.map(m => ({ ...m })),
      properties: { ...template.properties },
      position,
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    };

    const currentProject = this.currentProjectSubject.value;
    if (currentProject) {
      currentProject.components.push(component);
      currentProject.lastModified = new Date();
      this.currentProjectSubject.next(currentProject);
    }

    return component;
  }

  removeComponent(componentId: string): void {
    const currentProject = this.currentProjectSubject.value;
    if (currentProject) {
      currentProject.components = currentProject.components.filter(c => c.id !== componentId);
      currentProject.lastModified = new Date();
      this.currentProjectSubject.next(currentProject);
    }
  }

  updateComponent(componentId: string, updates: Partial<Component>): void {
    const currentProject = this.currentProjectSubject.value;
    if (currentProject) {
      const componentIndex = currentProject.components.findIndex(c => c.id === componentId);
      if (componentIndex !== -1) {
        currentProject.components[componentIndex] = {
          ...currentProject.components[componentIndex],
          ...updates
        };
        currentProject.lastModified = new Date();
        this.currentProjectSubject.next(currentProject);
      }
    }
  }

  startSimulation(): void {
    const currentState = this.simulationStateSubject.value;
    if (!currentState.isRunning) {
      this.simulationStateSubject.next({
        ...currentState,
        isRunning: true,
        currentTime: 0
      });
      this.runSimulationLoop();
    }
  }

  stopSimulation(): void {
    const currentState = this.simulationStateSubject.value;
    this.simulationStateSubject.next({
      ...currentState,
      isRunning: false
    });
  }

  resetSimulation(): void {
    this.simulationStateSubject.next({
      isRunning: false,
      currentTime: 0,
      temperature: 293.15,
      pressure: 101325,
      energy: 0,
      efficiency: 0,
      forces: {},
      velocities: {}
    });
  }

  private runSimulationLoop(): void {
    const simulate = () => {
      const currentState = this.simulationStateSubject.value;
      const currentProject = this.currentProjectSubject.value;

      if (!currentState.isRunning || !currentProject) return;

      // Physics calculations
      const newState = this.calculatePhysics(currentState, currentProject);
      this.simulationStateSubject.next(newState);

      // Continue simulation loop
      requestAnimationFrame(simulate);
    };

    requestAnimationFrame(simulate);
  }

  private calculatePhysics(state: SimulationState, project: SimulationProject): SimulationState {
    const newState = { ...state };
    newState.currentTime += project.physics.timeStep;

    // Calculate forces and energy for each component
    let totalEnergy = 0;
    let totalEfficiency = 0;

    project.components.forEach(component => {
      switch (component.type) {
        case 'engine':
          const engineResult = this.calculateStirlingEngine(component, project.environment);
          newState.forces[component.id] = engineResult.force;
          newState.velocities[component.id] = engineResult.velocity;
          totalEnergy += engineResult.energy;
          totalEfficiency += engineResult.efficiency;
          break;

        case 'collider':
          const colliderResult = this.calculateParticleCollider(component, project.environment);
          newState.forces[component.id] = colliderResult.force;
          totalEnergy += colliderResult.energy;
          break;

        case 'generator':
          const generatorResult = this.calculateGenerator(component, project.environment);
          newState.forces[component.id] = generatorResult.force;
          totalEnergy += generatorResult.energy;
          totalEfficiency += generatorResult.efficiency;
          break;
      }
    });

    newState.energy = totalEnergy;
    newState.efficiency = project.components.length > 0 ? totalEfficiency / project.components.length : 0;

    // Environmental effects
    newState.temperature = this.calculateTemperature(project.environment.temperature, totalEnergy);
    newState.pressure = this.calculatePressure(project.environment.pressure, newState.temperature);

    return newState;
  }

  private calculateStirlingEngine(component: Component, environment: any) {
    const props = component.properties;
    const tempDiff = environment.temperature - 273.15; // Convert to Celsius
    const efficiency = Math.min(props['efficiency'] * (tempDiff / 100), 0.4);
    const energy = props['displacement'] * environment.pressure * efficiency;
    
    return {
      force: { x: 0, y: energy / 1000, z: 0 },
      velocity: { x: 0, y: Math.sin(Date.now() / 1000) * 0.1, z: 0 },
      energy,
      efficiency
    };
  }

  private calculateParticleCollider(component: Component, environment: any) {
    const props = component.properties;
    const energy = props['energy'] * Math.sin(Date.now() / 500) * 0.5 + props['energy'] * 0.5;
    
    return {
      force: { x: Math.cos(Date.now() / 1000) * 100, y: 0, z: Math.sin(Date.now() / 1000) * 100 },
      energy
    };
  }

  private calculateGenerator(component: Component, environment: any) {
    const props = component.properties;
    const energy = props['voltage'] * props['current'] * props['efficiency'];
    
    return {
      force: { x: 0, y: 0, z: Math.sin(Date.now() / 800) * 50 },
      energy,
      efficiency: props['efficiency']
    };
  }

  private calculateTemperature(baseTemp: number, energy: number): number {
    return baseTemp + (energy / 10000); // Simplified heat calculation
  }

  private calculatePressure(basePressure: number, temperature: number): number {
    return basePressure * (temperature / 293.15); // Ideal gas law approximation
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  calculateMaterialCost(materials: { materialId: string; quantity: number }[]): number {
    return materials.reduce((total, mat) => {
      const material = this.materials.find(m => m.id === mat.materialId);
      return total + (material ? material.cost * mat.quantity : 0);
    }, 0);
  }

  exportProject(): string {
    const project = this.currentProjectSubject.value;
    return project ? JSON.stringify(project, null, 2) : '';
  }

  importProject(projectData: string): boolean {
    try {
      const project = JSON.parse(projectData);
      this.currentProjectSubject.next(project);
      return true;
    } catch (error) {
      console.error('Failed to import project:', error);
      return false;
    }
  }
}
