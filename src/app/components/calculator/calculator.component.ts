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
    // Initialize based on formula ID
    switch (this.formulaId) {
      case 'kinetic-energy':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'v', value: null, unit: 'm/s', description: 'Velocity' }
        ];
        break;
      case 'gravitational-force':
        this.formulaVariables = [
          { key: 'G', value: 6.67430e-11, unit: 'N⋅m²/kg²', description: 'Gravitational constant' },
          { key: 'm1', value: null, unit: 'kg', description: 'Mass 1' },
          { key: 'm2', value: null, unit: 'kg', description: 'Mass 2' },
          { key: 'r', value: null, unit: 'm', description: 'Distance' }
        ];
        break;
      default:
        this.formulaVariables = [
          { key: 'x', value: null, unit: '', description: 'Variable' },
          { key: 'y', value: null, unit: '', description: 'Variable' }
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

    switch (this.formulaId) {
      case 'kinetic-energy':
        const m = this.formulaVariables.find(v => v.key === 'm')?.value || 0;
        const v = this.formulaVariables.find(v => v.key === 'v')?.value || 0;
        calculatedValue = 0.5 * m * v * v;
        unit = 'J';
        break;
      case 'gravitational-force':
        const G = this.formulaVariables.find(v => v.key === 'G')?.value || 0;
        const m1 = this.formulaVariables.find(v => v.key === 'm1')?.value || 0;
        const m2 = this.formulaVariables.find(v => v.key === 'm2')?.value || 0;
        const r = this.formulaVariables.find(v => v.key === 'r')?.value || 0;
        calculatedValue = G * m1 * m2 / (r * r);
        unit = 'N';
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
      detail: `Result: ${calculatedValue.toFixed(4)} ${unit}`
    });
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
