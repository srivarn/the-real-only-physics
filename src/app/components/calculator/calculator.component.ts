import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue: string = '0';
  private previousValue: number = 0;
  private currentOperator: string | null = null;
  private waitingForOperand: boolean = false;
  private isScientificMode: boolean = true;

  constructor() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (/\d/.test(key)) {
      this.inputDigit(key);
      event.preventDefault();
    } else if (key === '.') {
      this.inputDecimal();
      event.preventDefault();
    }
  }

  // Input number or decimal point
  inputDigit(digit: string): void {
    if (this.waitingForOperand) {
      this.displayValue = digit;
      this.waitingForOperand = false;
    } else {
      // Prevent multiple leading zeros
      if (this.displayValue === '0') {
        this.displayValue = digit;
      } else {
        this.displayValue += digit;
      }
    }
  }

  // Input decimal point
  inputDecimal(): void {
    if (this.waitingForOperand) {
      this.displayValue = '0.';
      this.waitingForOperand = false;
    } else if (this.displayValue.indexOf('.') === -1) {
      this.displayValue += '.';
    }
  }

  // Clear all
  clear(): void {
    this.displayValue = '0';
    this.previousValue = 0;
    this.currentOperator = null;
    this.waitingForOperand = false;
  }

  // Clear entry
  clearEntry(): void {
    this.displayValue = '0';
  }

  // Delete last character
  backspace(): void {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  // Basic arithmetic operations
  performOperation(nextOperator: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.currentOperator && !this.waitingForOperand) {
      const newValue = this.calculate(this.previousValue, inputValue, this.currentOperator);
      this.displayValue = String(newValue);
      this.previousValue = newValue;
    } else {
      this.previousValue = inputValue;
    }

    this.waitingForOperand = true;
    this.currentOperator = nextOperator;
  }

  // Calculate result
  calculateResult(): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.currentOperator && !this.waitingForOperand) {
      const newValue = this.calculate(this.previousValue, inputValue, this.currentOperator);
      this.displayValue = String(newValue);
      this.previousValue = 0;
      this.currentOperator = null;
      this.waitingForOperand = true;
    }
  }

  // Perform calculation
  private calculate(firstOperand: number, secondOperand: number, operator: string): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        if (secondOperand === 0) {
          this.displayValue = 'Error';
          return 0;
        }
        return firstOperand / secondOperand;
      case '^':
      case 'pow':
        return Math.pow(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
  }

  // Scientific functions
  performScientificFunction(func: string): void {
    const currentValue = parseFloat(this.displayValue);
    let result: number;

    try {
      switch (func) {
        case 'sin':
          result = Math.sin(this.toRadians(currentValue));
          break;
        case 'cos':
          result = Math.cos(this.toRadians(currentValue));
          break;
        case 'tan':
          result = Math.tan(this.toRadians(currentValue));
          break;
        case 'asin':
          result = this.toDegrees(Math.asin(currentValue));
          break;
        case 'acos':
          result = this.toDegrees(Math.acos(currentValue));
          break;
        case 'atan':
          result = this.toDegrees(Math.atan(currentValue));
          break;
        case 'sqrt':
          if (currentValue < 0) {
            this.displayValue = 'Error';
            return;
          }
          result = Math.sqrt(currentValue);
          break;
        case 'cbrt':
          result = Math.cbrt(currentValue);
          break;
        case 'log':
          if (currentValue <= 0) {
            this.displayValue = 'Error';
            return;
          }
          result = Math.log10(currentValue);
          break;
        case 'ln':
          if (currentValue <= 0) {
            this.displayValue = 'Error';
            return;
          }
          result = Math.log(currentValue);
          break;
        case 'exp':
          result = Math.exp(currentValue);
          break;
        case 'x²':
          result = Math.pow(currentValue, 2);
          break;
        case 'x³':
          result = Math.pow(currentValue, 3);
          break;
        case '1/x':
          if (currentValue === 0) {
            this.displayValue = 'Error';
            return;
          }
          result = 1 / currentValue;
          break;
        case 'x!':
          if (currentValue < 0 || !Number.isInteger(currentValue)) {
            this.displayValue = 'Error';
            return;
          }
          result = this.factorial(currentValue);
          break;
        case 'abs':
          result = Math.abs(currentValue);
          break;
        case '±':
          result = -currentValue;
          break;
        default:
          return;
      }

      // Round to avoid floating point precision issues
      result = Math.round(result * 1e10) / 1e10;
      this.displayValue = String(result);
      this.waitingForOperand = true;

    } catch (error) {
      this.displayValue = 'Error';
    }
  }

  // Insert constants
  insertConstant(constant: string): void {
    switch (constant) {
      case 'π':
        this.displayValue = String(Math.PI);
        break;
      case 'e':
        this.displayValue = String(Math.E);
        break;
    }
    this.waitingForOperand = true;
  }

  // Helper functions
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  private factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    return n * this.factorial(n - 1);
  }

  // Toggle between basic and scientific mode
  toggleScientificMode(): void {
    this.isScientificMode = !this.isScientificMode;
  }

  get scientificMode(): boolean {
    return this.isScientificMode;
  }
}
