import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface FormulaVariable {
  key: string;
  value: number | null;
  unit: string;
  description: string;
}

interface CalculationResult {
  value: number;
  unit: string;
}

interface CalculationHistory {
  timestamp: Date;
  inputs: any;
  result: number;
  unit: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Input() formulaId: string = '';

  formulaVariables: FormulaVariable[] = [];
  result: CalculationResult | null = null;
  calculationHistory: CalculationHistory[] = [];
  
  // Scientific calculator properties
  displayValue: string = '0';
  previousValue: number | null = null;
  operation: string | null = null;
  waitingForOperand: boolean = false;
  memory: number = 0;
  
  // Scientific functions
  scientificMode: boolean = false;
  angleUnit: 'deg' | 'rad' = 'deg';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.initializeFormulaVariables();
  }

  initializeFormulaVariables(): void {
    // Initialize based on formula ID - comprehensive list
    switch (this.formulaId) {
      // MECHANICS - KINEMATICS
      case 'velocity':
        this.formulaVariables = [
          { key: 'Δx', value: null, unit: 'm', description: 'Change in displacement' },
          { key: 'Δt', value: null, unit: 's', description: 'Change in time' }
        ];
        break;
      case 'acceleration':
        this.formulaVariables = [
          { key: 'Δv', value: null, unit: 'm/s', description: 'Change in velocity' },
          { key: 'Δt', value: null, unit: 's', description: 'Change in time' }
        ];
        break;
      case 'displacement':
        this.formulaVariables = [
          { key: 'v₀', value: null, unit: 'm/s', description: 'Initial velocity' },
          { key: 't', value: null, unit: 's', description: 'Time elapsed' },
          { key: 'a', value: null, unit: 'm/s²', description: 'Acceleration' }
        ];
        break;
      case 'free-fall':
        this.formulaVariables = [
          { key: 'g', value: 9.8, unit: 'm/s²', description: 'Gravity (9.8 m/s²)' },
          { key: 't', value: null, unit: 's', description: 'Time elapsed' }
        ];
        break;
      case 'projectile-range':
        this.formulaVariables = [
          { key: 'v₀', value: null, unit: 'm/s', description: 'Initial velocity' },
          { key: 'θ', value: null, unit: '°', description: 'Launch angle (degrees)' },
          { key: 'g', value: 9.8, unit: 'm/s²', description: 'Gravity' }
        ];
        break;

      // MECHANICS - DYNAMICS
      case 'newton-second':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'a', value: null, unit: 'm/s²', description: 'Acceleration' }
        ];
        break;
      case 'weight':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'g', value: 9.8, unit: 'm/s²', description: 'Gravity' }
        ];
        break;
      case 'friction':
        this.formulaVariables = [
          { key: 'μ', value: null, unit: '', description: 'Coefficient of friction' },
          { key: 'N', value: null, unit: 'N', description: 'Normal force' }
        ];
        break;
      case 'centripetal-force':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'v', value: null, unit: 'm/s', description: 'Velocity' },
          { key: 'r', value: null, unit: 'm', description: 'Radius' }
        ];
        break;

      // MECHANICS - ENERGY
      case 'kinetic-energy':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'v', value: null, unit: 'm/s', description: 'Velocity' }
        ];
        break;
      case 'potential-energy':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'g', value: 9.8, unit: 'm/s²', description: 'Gravity' },
          { key: 'h', value: null, unit: 'm', description: 'Height' }
        ];
        break;
      case 'work':
        this.formulaVariables = [
          { key: 'F', value: null, unit: 'N', description: 'Force' },
          { key: 'd', value: null, unit: 'm', description: 'Displacement' },
          { key: 'θ', value: null, unit: '°', description: 'Angle (degrees)' }
        ];
        break;
      case 'power':
        this.formulaVariables = [
          { key: 'W', value: null, unit: 'J', description: 'Work done' },
          { key: 't', value: null, unit: 's', description: 'Time' }
        ];
        break;

      // MECHANICS - MOMENTUM
      case 'momentum':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'v', value: null, unit: 'm/s', description: 'Velocity' }
        ];
        break;
      case 'impulse':
        this.formulaVariables = [
          { key: 'F', value: null, unit: 'N', description: 'Force' },
          { key: 'Δt', value: null, unit: 's', description: 'Time interval' }
        ];
        break;

      // THERMODYNAMICS
      case 'ideal-gas-law':
        this.formulaVariables = [
          { key: 'P', value: null, unit: 'Pa', description: 'Pressure' },
          { key: 'V', value: null, unit: 'm³', description: 'Volume' },
          { key: 'n', value: null, unit: 'mol', description: 'Number of moles' },
          { key: 'R', value: 8.314, unit: 'J/mol·K', description: 'Gas constant' },
          { key: 'T', value: null, unit: 'K', description: 'Temperature' }
        ];
        break;
      case 'heat-capacity':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'c', value: null, unit: 'J/kg·K', description: 'Specific heat capacity' },
          { key: 'ΔT', value: null, unit: 'K', description: 'Temperature change' }
        ];
        break;

      // ELECTROMAGNETISM
      case 'coulombs-law':
        this.formulaVariables = [
          { key: 'k', value: 8.99e9, unit: 'N·m²/C²', description: 'Coulomb constant' },
          { key: 'q₁', value: null, unit: 'C', description: 'Charge 1' },
          { key: 'q₂', value: null, unit: 'C', description: 'Charge 2' },
          { key: 'r', value: null, unit: 'm', description: 'Distance' }
        ];
        break;
      case 'ohms-law':
        this.formulaVariables = [
          { key: 'I', value: null, unit: 'A', description: 'Current' },
          { key: 'R', value: null, unit: 'Ω', description: 'Resistance' }
        ];
        break;
      case 'magnetic-force':
        this.formulaVariables = [
          { key: 'q', value: null, unit: 'C', description: 'Charge' },
          { key: 'v', value: null, unit: 'm/s', description: 'Velocity' },
          { key: 'B', value: null, unit: 'T', description: 'Magnetic field' },
          { key: 'θ', value: null, unit: '°', description: 'Angle (degrees)' }
        ];
        break;

      // WAVES AND OPTICS
      case 'wave-speed':
        this.formulaVariables = [
          { key: 'f', value: null, unit: 'Hz', description: 'Frequency' },
          { key: 'λ', value: null, unit: 'm', description: 'Wavelength' }
        ];
        break;

      // MODERN PHYSICS
      case 'einstein-mass-energy':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'c', value: 3e8, unit: 'm/s', description: 'Speed of light' }
        ];
        break;
      case 'planck-energy':
        this.formulaVariables = [
          { key: 'h', value: 6.626e-34, unit: 'J·s', description: 'Planck constant' },
          { key: 'f', value: null, unit: 'Hz', description: 'Frequency' }
        ];
        break;

      default:
        this.formulaVariables = [
          { key: 'x', value: null, unit: '', description: 'Variable X' },
          { key: 'y', value: null, unit: '', description: 'Variable Y' }
        ];
    }
  }

  canCalculate(): boolean {
    return this.formulaVariables.every(v => v.value !== null && v.value !== undefined);
  }

  calculate(): void {
    if (!this.canCalculate()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all variables'
      });
      return;
    }

    let calculatedValue: number;
    let unit: string;

    const getVar = (key: string) => this.formulaVariables.find(v => v.key === key)?.value || 0;
    const toRadians = (degrees: number) => degrees * Math.PI / 180;

    switch (this.formulaId) {
      // KINEMATICS
      case 'velocity':
        calculatedValue = getVar('Δx') / getVar('Δt');
        unit = 'm/s';
        break;
      case 'acceleration':
        calculatedValue = getVar('Δv') / getVar('Δt');
        unit = 'm/s²';
        break;
      case 'displacement':
        calculatedValue = getVar('v₀') * getVar('t') + 0.5 * getVar('a') * getVar('t') ** 2;
        unit = 'm';
        break;
      case 'free-fall':
        calculatedValue = 0.5 * getVar('g') * getVar('t') ** 2;
        unit = 'm';
        break;
      case 'projectile-range':
        const v0 = getVar('v₀');
        const theta = toRadians(getVar('θ'));
        calculatedValue = (v0 ** 2 * Math.sin(2 * theta)) / getVar('g');
        unit = 'm';
        break;

      // DYNAMICS
      case 'newton-second':
        calculatedValue = getVar('m') * getVar('a');
        unit = 'N';
        break;
      case 'weight':
        calculatedValue = getVar('m') * getVar('g');
        unit = 'N';
        break;
      case 'friction':
        calculatedValue = getVar('μ') * getVar('N');
        unit = 'N';
        break;
      case 'centripetal-force':
        calculatedValue = getVar('m') * getVar('v') ** 2 / getVar('r');
        unit = 'N';
        break;

      // ENERGY
      case 'kinetic-energy':
        calculatedValue = 0.5 * getVar('m') * getVar('v') ** 2;
        unit = 'J';
        break;
      case 'potential-energy':
        calculatedValue = getVar('m') * getVar('g') * getVar('h');
        unit = 'J';
        break;
      case 'work':
        const angle = toRadians(getVar('θ'));
        calculatedValue = getVar('F') * getVar('d') * Math.cos(angle);
        unit = 'J';
        break;
      case 'power':
        calculatedValue = getVar('W') / getVar('t');
        unit = 'W';
        break;

      // MOMENTUM
      case 'momentum':
        calculatedValue = getVar('m') * getVar('v');
        unit = 'kg·m/s';
        break;
      case 'impulse':
        calculatedValue = getVar('F') * getVar('Δt');
        unit = 'N·s';
        break;

      // THERMODYNAMICS
      case 'ideal-gas-law':
        // Solving for P: P = nRT/V
        calculatedValue = (getVar('n') * getVar('R') * getVar('T')) / getVar('V');
        unit = 'Pa';
        break;
      case 'heat-capacity':
        calculatedValue = getVar('m') * getVar('c') * getVar('ΔT');
        unit = 'J';
        break;

      // ELECTROMAGNETISM
      case 'coulombs-law':
        calculatedValue = getVar('k') * getVar('q₁') * getVar('q₂') / (getVar('r') ** 2);
        unit = 'N';
        break;
      case 'ohms-law':
        calculatedValue = getVar('I') * getVar('R');
        unit = 'V';
        break;
      case 'magnetic-force':
        const magAngle = toRadians(getVar('θ'));
        calculatedValue = getVar('q') * getVar('v') * getVar('B') * Math.sin(magAngle);
        unit = 'N';
        break;

      // WAVES
      case 'wave-speed':
        calculatedValue = getVar('f') * getVar('λ');
        unit = 'm/s';
        break;

      // MODERN PHYSICS
      case 'einstein-mass-energy':
        calculatedValue = getVar('m') * getVar('c') ** 2;
        unit = 'J';
        break;
      case 'planck-energy':
        calculatedValue = getVar('h') * getVar('f');
        unit = 'J';
        break;

      default:
        calculatedValue = 0;
        unit = '';
    }

    this.result = { value: calculatedValue, unit };
    
    // Add to history
    this.calculationHistory.push({
      timestamp: new Date(),
      inputs: this.formulaVariables.reduce((acc, v) => ({ ...acc, [v.key]: v.value }), {}),
      result: calculatedValue,
      unit
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Calculation Complete',
      detail: `Result: ${this.formatNumber(calculatedValue)} ${unit}`
    });
  }

  formatNumber(num: number): string {
    if (Math.abs(num) < 0.001 || Math.abs(num) > 10000) {
      return num.toExponential(4);
    }
    return num.toFixed(4);
  }

  // Scientific Calculator Methods
  inputDigit(digit: string): void {
    if (this.waitingForOperand) {
      this.displayValue = digit;
      this.waitingForOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  inputDecimal(): void {
    if (this.waitingForOperand) {
      this.displayValue = '0.';
      this.waitingForOperand = false;
      return;
    }

    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  clear(): void {
    this.displayValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  performOperation(nextOperation: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const currentValue = this.previousValue || 0;
      const newValue = this.performCalculation(currentValue, inputValue);

      this.displayValue = String(newValue);
      this.previousValue = newValue;
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
  }

  performCalculation(firstValue: number, secondValue: number): number {
    switch (this.operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '^': return Math.pow(firstValue, secondValue);
      default: return secondValue;
    }
  }

  // Scientific Functions
  sin(): void {
    const value = parseFloat(this.displayValue);
    const result = this.angleUnit === 'deg' ? Math.sin(value * Math.PI / 180) : Math.sin(value);
    this.displayValue = String(result);
  }

  cos(): void {
    const value = parseFloat(this.displayValue);
    const result = this.angleUnit === 'deg' ? Math.cos(value * Math.PI / 180) : Math.cos(value);
    this.displayValue = String(result);
  }

  tan(): void {
    const value = parseFloat(this.displayValue);
    const result = this.angleUnit === 'deg' ? Math.tan(value * Math.PI / 180) : Math.tan(value);
    this.displayValue = String(result);
  }

  log(): void {
    const value = parseFloat(this.displayValue);
    this.displayValue = String(Math.log10(value));
  }

  ln(): void {
    const value = parseFloat(this.displayValue);
    this.displayValue = String(Math.log(value));
  }

  sqrt(): void {
    const value = parseFloat(this.displayValue);
    this.displayValue = String(Math.sqrt(value));
  }

  square(): void {
    const value = parseFloat(this.displayValue);
    this.displayValue = String(value * value);
  }

  inverse(): void {
    const value = parseFloat(this.displayValue);
    this.displayValue = String(1 / value);
  }

  toggleScientificMode(): void {
    this.scientificMode = !this.scientificMode;
  }

  toggleAngleUnit(): void {
    this.angleUnit = this.angleUnit === 'deg' ? 'rad' : 'deg';
  }

  memoryStore(): void {
    this.memory = parseFloat(this.displayValue);
  }

  memoryRecall(): void {
    this.displayValue = String(this.memory);
  }

  memoryClear(): void {
    this.memory = 0;
  }

  memoryAdd(): void {
    this.memory += parseFloat(this.displayValue);
  }

  memorySubtract(): void {
    this.memory -= parseFloat(this.displayValue);
  }
}
