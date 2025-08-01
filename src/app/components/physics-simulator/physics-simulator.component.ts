import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SimulationState {
  time: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
}

@Component({
  selector: 'app-physics-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './physics-simulator.component.html',
  styleUrls: ['./physics-simulator.component.css']
})
export class PhysicsSimulatorComponent implements OnInit, OnDestroy {
  @ViewChild('simulationCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  public isRunning: boolean = false;
  private startTime: number = 0;
  
  // Simulation parameters
  simulationType: 'projectile' | 'pendulum' | 'spring' = 'projectile';
  
  // Projectile motion parameters
  projectileParams = {
    initialVelocity: 50,
    angle: 45,
    gravity: 9.81,
    initialHeight: 0
  };
  
  // Pendulum parameters
  pendulumParams = {
    length: 100,
    gravity: 9.81,
    initialAngle: 30,
    damping: 0.99
  };
  
  // Spring-mass parameters
  springParams = {
    mass: 1,
    springConstant: 10,
    damping: 0.5,
    equilibriumPosition: 0,
    initialDisplacement: 50
  };
  
  // Current simulation state
  currentState: SimulationState = {
    time: 0,
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 }
  };
  
  // Simulation history for trails
  simulationHistory: SimulationState[] = [];
  
  // Canvas dimensions
  canvasWidth: number = 800;
  canvasHeight: number = 600;
  
  // UI state
  showTrails: boolean = true;
  showVectors: boolean = true;
  simulationSpeed: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.initializeCanvas();
    this.resetSimulation();
  }

  ngOnDestroy(): void {
    this.stopSimulation();
  }

  initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
  }

  startSimulation(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = performance.now();
      this.animate();
    }
  }

  stopSimulation(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resetSimulation(): void {
    this.stopSimulation();
    this.simulationHistory = [];
    this.currentState = this.getInitialState();
    this.draw();
  }

  getInitialState(): SimulationState {
    switch (this.simulationType) {
      case 'projectile':
        const angleRad = (this.projectileParams.angle * Math.PI) / 180;
        const v0 = this.projectileParams.initialVelocity;
        return {
          time: 0,
          position: { x: 50, y: this.canvasHeight - this.projectileParams.initialHeight },
          velocity: {
            x: v0 * Math.cos(angleRad),
            y: -v0 * Math.sin(angleRad)
          },
          acceleration: { x: 0, y: this.projectileParams.gravity }
        };
      
      case 'pendulum':
        const angleRadPendulum = (this.pendulumParams.initialAngle * Math.PI) / 180;
        const pivotX = this.canvasWidth / 2;
        const pivotY = 100;
        return {
          time: 0,
          position: {
            x: pivotX + this.pendulumParams.length * Math.sin(angleRadPendulum),
            y: pivotY + this.pendulumParams.length * Math.cos(angleRadPendulum)
          },
          velocity: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 }
        };
      
      case 'spring':
        return {
          time: 0,
          position: { x: this.canvasWidth / 2, y: this.canvasHeight / 2 + this.springParams.initialDisplacement },
          velocity: { x: 0, y: 0 },
          acceleration: { x: 0, y: 0 }
        };
      
      default:
        return { time: 0, position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, acceleration: { x: 0, y: 0 } };
    }
  }

  animate(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.startTime) * 0.001 * this.simulationSpeed;
    
    this.updateSimulation(deltaTime);
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateSimulation(deltaTime: number): void {
    this.currentState.time += deltaTime;
    
    switch (this.simulationType) {
      case 'projectile':
        this.updateProjectile(deltaTime);
        break;
      case 'pendulum':
        this.updatePendulum(deltaTime);
        break;
      case 'spring':
        this.updateSpring(deltaTime);
        break;
    }
    
    // Add to history for trails
    if (this.showTrails) {
      this.simulationHistory.push({ ...this.currentState });
      if (this.simulationHistory.length > 100) {
        this.simulationHistory.shift();
      }
    }
  }

  updateProjectile(deltaTime: number): void {
    // Update velocity
    this.currentState.velocity.x += this.currentState.acceleration.x * deltaTime;
    this.currentState.velocity.y += this.currentState.acceleration.y * deltaTime;
    
    // Update position
    this.currentState.position.x += this.currentState.velocity.x * deltaTime;
    this.currentState.position.y += this.currentState.velocity.y * deltaTime;
    
    // Check for ground collision
    if (this.currentState.position.y >= this.canvasHeight - 50) {
      this.currentState.position.y = this.canvasHeight - 50;
      this.currentState.velocity.y = -this.currentState.velocity.y * 0.7; // Bounce with energy loss
      
      // Stop if velocity is too low
      if (Math.abs(this.currentState.velocity.y) < 5) {
        this.stopSimulation();
      }
    }
  }

  updatePendulum(deltaTime: number): void {
    const pivotX = this.canvasWidth / 2;
    const pivotY = 100;
    
    // Calculate angle from current position
    const dx = this.currentState.position.x - pivotX;
    const dy = this.currentState.position.y - pivotY;
    const currentAngle = Math.atan2(dx, dy);
    
    // Calculate angular acceleration
    const angularAcceleration = -(this.pendulumParams.gravity / this.pendulumParams.length) * Math.sin(currentAngle);
    
    // Update angular velocity (simplified)
    const angularVelocity = Math.sqrt(2 * this.pendulumParams.gravity / this.pendulumParams.length * 
      (Math.cos(currentAngle) - Math.cos((this.pendulumParams.initialAngle * Math.PI) / 180)));
    
    // Apply damping
    const dampedAngularVelocity = angularVelocity * Math.pow(this.pendulumParams.damping, deltaTime);
    
    // Update position
    const newAngle = currentAngle + dampedAngularVelocity * deltaTime;
    this.currentState.position.x = pivotX + this.pendulumParams.length * Math.sin(newAngle);
    this.currentState.position.y = pivotY + this.pendulumParams.length * Math.cos(newAngle);
  }

  updateSpring(deltaTime: number): void {
    const equilibriumY = this.canvasHeight / 2;
    const displacement = this.currentState.position.y - equilibriumY;
    
    // Spring force: F = -kx
    const springForce = -this.springParams.springConstant * displacement;
    
    // Damping force: F = -cv
    const dampingForce = -this.springParams.damping * this.currentState.velocity.y;
    
    // Net force
    const netForce = springForce + dampingForce;
    
    // Acceleration: a = F/m
    this.currentState.acceleration.y = netForce / this.springParams.mass;
    
    // Update velocity
    this.currentState.velocity.y += this.currentState.acceleration.y * deltaTime;
    
    // Update position
    this.currentState.position.y += this.currentState.velocity.y * deltaTime;
  }

  draw(): void {
    // Clear canvas
    this.ctx.fillStyle = '#0a0f1c';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw grid
    this.drawGrid();
    
    // Draw trails
    if (this.showTrails && this.simulationHistory.length > 1) {
      this.drawTrails();
    }
    
    // Draw simulation elements
    switch (this.simulationType) {
      case 'projectile':
        this.drawProjectile();
        break;
      case 'pendulum':
        this.drawPendulum();
        break;
      case 'spring':
        this.drawSpring();
        break;
    }
    
    // Draw vectors
    if (this.showVectors) {
      this.drawVectors();
    }
    
    // Draw info panel
    this.drawInfoPanel();
  }

  drawGrid(): void {
    this.ctx.strokeStyle = '#2a2f3e';
    this.ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= this.canvasWidth; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvasHeight);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= this.canvasHeight; y += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvasWidth, y);
      this.ctx.stroke();
    }
  }

  drawTrails(): void {
    this.ctx.strokeStyle = '#7c3aed';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    
    for (let i = 0; i < this.simulationHistory.length; i++) {
      const point = this.simulationHistory[i];
      const alpha = i / this.simulationHistory.length;
      this.ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
      
      if (i === 0) {
        this.ctx.moveTo(point.position.x, point.position.y);
      } else {
        this.ctx.lineTo(point.position.x, point.position.y);
      }
    }
    this.ctx.stroke();
  }

  drawProjectile(): void {
    // Draw ground
    this.ctx.fillStyle = '#4a4f5e';
    this.ctx.fillRect(0, this.canvasHeight - 50, this.canvasWidth, 50);
    
    // Draw projectile
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(this.currentState.position.x, this.currentState.position.y, 8, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // Draw shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.arc(this.currentState.position.x, this.canvasHeight - 42, 6, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawPendulum(): void {
    const pivotX = this.canvasWidth / 2;
    const pivotY = 100;
    
    // Draw pivot
    this.ctx.fillStyle = '#6b7280';
    this.ctx.beginPath();
    this.ctx.arc(pivotX, pivotY, 15, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // Draw string
    this.ctx.strokeStyle = '#9ca3af';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(pivotX, pivotY);
    this.ctx.lineTo(this.currentState.position.x, this.currentState.position.y);
    this.ctx.stroke();
    
    // Draw bob
    this.ctx.fillStyle = '#3b82f6';
    this.ctx.beginPath();
    this.ctx.arc(this.currentState.position.x, this.currentState.position.y, 12, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawSpring(): void {
    const equilibriumY = this.canvasHeight / 2;
    
    // Draw spring
    this.ctx.strokeStyle = '#f59e0b';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvasWidth / 2, 50);
    
    const springSegments = 20;
    const springLength = this.currentState.position.y - 50;
    const segmentLength = springLength / springSegments;
    
    for (let i = 0; i < springSegments; i++) {
      const y = 50 + i * segmentLength;
      const x = this.canvasWidth / 2 + Math.sin(i * 0.5) * 10;
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    
    // Draw mass
    this.ctx.fillStyle = '#10b981';
    this.ctx.beginPath();
    this.ctx.arc(this.canvasWidth / 2, this.currentState.position.y, 15, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // Draw equilibrium line
    this.ctx.strokeStyle = '#6b7280';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, equilibriumY);
    this.ctx.lineTo(this.canvasWidth, equilibriumY);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  drawVectors(): void {
    const scale = 0.5;
    
    // Velocity vector
    this.ctx.strokeStyle = '#3b82f6';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentState.position.x, this.currentState.position.y);
    this.ctx.lineTo(
      this.currentState.position.x + this.currentState.velocity.x * scale,
      this.currentState.position.y + this.currentState.velocity.y * scale
    );
    this.ctx.stroke();
    
    // Acceleration vector
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentState.position.x, this.currentState.position.y);
    this.ctx.lineTo(
      this.currentState.position.x + this.currentState.acceleration.x * scale,
      this.currentState.position.y + this.currentState.acceleration.y * scale
    );
    this.ctx.stroke();
  }

  drawInfoPanel(): void {
    this.ctx.fillStyle = 'rgba(26, 31, 46, 0.9)';
    this.ctx.fillRect(10, 10, 250, 120);
    
    this.ctx.fillStyle = '#f8fafc';
    this.ctx.font = '14px Inter';
    this.ctx.fillText(`Time: ${this.currentState.time.toFixed(2)}s`, 20, 30);
    this.ctx.fillText(`Position: (${this.currentState.position.x.toFixed(1)}, ${this.currentState.position.y.toFixed(1)})`, 20, 50);
    this.ctx.fillText(`Velocity: (${this.currentState.velocity.x.toFixed(1)}, ${this.currentState.velocity.y.toFixed(1)})`, 20, 70);
    this.ctx.fillText(`Acceleration: (${this.currentState.acceleration.x.toFixed(1)}, ${this.currentState.acceleration.y.toFixed(1)})`, 20, 90);
    this.ctx.fillText(`Type: ${this.simulationType}`, 20, 110);
  }

  onSimulationTypeChange(): void {
    this.resetSimulation();
  }

  toggleTrails(): void {
    this.showTrails = !this.showTrails;
    if (!this.showTrails) {
      this.simulationHistory = [];
    }
  }

  toggleVectors(): void {
    this.showVectors = !this.showVectors;
  }
}
