import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
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
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, CardModule, TooltipModule, ToastModule],
  providers: [MessageService],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
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

  // New properties for enhanced calculator
  calculating = false;
  calculatorMode: 'formula' | 'scientific' = 'formula';

  // Track if scientific calc has focus for keyboard input
  sciCalcActive = false;
  
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.initializeFormulaVariables();
  }

  ngOnDestroy(): void {
    // cleanup handled by @HostListener automatically
  }

  /** Keyboard support for scientific calculator */
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (this.calculatorMode !== 'scientific') return;

    // Don't intercept when typing in an input field
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    switch (e.key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        e.preventDefault(); this.inputDigit(e.key); break;
      case '.': case ',':
        e.preventDefault(); this.inputDecimal(); break;
      case '+': e.preventDefault(); this.performOperation('+'); break;
      case '-': e.preventDefault(); this.performOperation('-'); break;
      case '*': e.preventDefault(); this.performOperation('*'); break;
      case '/': e.preventDefault(); this.performOperation('/'); break;
      case 'Enter': case '=':
        e.preventDefault(); this.performOperation('='); break;
      case 'Backspace':
        e.preventDefault(); this.backspace(); break;
      case 'Escape': case 'Delete':
        e.preventDefault(); this.clear(); break;
      case '^':
        e.preventDefault(); this.performOperation('^'); break;
      case 's': this.sin(); break;
      case 'c': this.cos(); break;
      case 't': this.tan(); break;
      case 'l': this.log(); break;
      case 'r': this.sqrt(); break;
    }
  }

  // Enhanced formula-specific methods
  getFormulaDisplayName(): string {
    const names: { [key: string]: string } = {
      'velocity': 'Velocity',
      'acceleration': 'Acceleration', 
      'displacement': 'Displacement',
      'free-fall': 'Free Fall',
      'projectile-range': 'Projectile Range',
      'newton-second': 'Force (F = ma)',
      'weight': 'Weight',
      'friction': 'Friction Force',
      'centripetal-force': 'Centripetal Force',
      'kinetic-energy': 'Kinetic Energy',
      'potential-energy': 'Potential Energy',
      'work': 'Work Done',
      'power': 'Power',
      'momentum': 'Momentum',
      'impulse': 'Impulse',
      'ideal-gas-law': 'Ideal Gas Law',
      'heat-capacity': 'Heat Transfer',
      'coulombs-law': 'Coulomb\'s Law',
      'ohms-law': 'Ohm\'s Law',
      'magnetic-force': 'Magnetic Force',
      'wave-speed': 'Wave Speed',
      'einstein-mass-energy': 'Mass-Energy Equivalence',
      'planck-energy': 'Photon Energy'
    };
    return names[this.formulaId] || 'Physics Formula';
  }

  getFormulaExpression(): string {
    const expressions: { [key: string]: string } = {
      'velocity': 'v = Δx/Δt',
      'acceleration': 'a = Δv/Δt',
      'displacement': 's = v₀t + ½at²',
      'free-fall': 'h = ½gt²',
      'projectile-range': 'R = (v₀²sin(2θ))/g',
      'newton-second': 'F = ma',
      'weight': 'W = mg',
      'friction': 'f = μN',
      'centripetal-force': 'F = mv²/r',
      'kinetic-energy': 'KE = ½mv²',
      'potential-energy': 'PE = mgh',
      'work': 'W = Fd cos(θ)',
      'power': 'P = W/t',
      'momentum': 'p = mv',
      'impulse': 'J = FΔt',
      'ideal-gas-law': 'PV = nRT',
      'heat-capacity': 'Q = mcΔT',
      'coulombs-law': 'F = k(q₁q₂)/r²',
      'ohms-law': 'V = IR',
      'magnetic-force': 'F = qvB sin(θ)',
      'wave-speed': 'v = fλ',
      'einstein-mass-energy': 'E = mc²',
      'planck-energy': 'E = hf'
    };
    return expressions[this.formulaId] || '';
  }

  isConstant(key: string): boolean {
    const constants = ['g', 'c', 'h', 'k', 'R', 'G'];
    return constants.includes(key);
  }

  getPlaceholder(variable: FormulaVariable): string {
    if (this.isConstant(variable.key)) {
      return `Constant: ${variable.value}`;
    }
    return `Enter ${variable.description.toLowerCase()}`;
  }

  getDecimalPlaces(key: string): number {
    const highPrecision = ['h', 'c', 'k', 'G', 'R'];
    return highPrecision.includes(key) ? 6 : 2;
  }

  getInputClass(key: string): string {
    if (this.isConstant(key)) return 'constant-input';
    return 'variable-input';
  }

  getVariableInfo(key: string): string {
    const info: { [key: string]: string } = {
      'g': 'Standard Earth gravity',
      'c': 'Speed of light in vacuum',
      'h': 'Planck constant',
      'k': 'Coulomb constant',
      'R': 'Universal gas constant',
      'θ': 'Angle in degrees',
      'μ': 'Coefficient ranges from 0 to 1+'
    };
    return info[key] || '';
  }

  getQuickValues(): Array<{label: string, variable: string, value: number, description: string}> {
    const quickValues: { [key: string]: Array<any> } = {
      'kinetic-energy': [
        {label: 'Car (1000kg, 60km/h)', variable: 'm', value: 1000, description: 'Typical car mass'},
        {label: 'Person (70kg)', variable: 'm', value: 70, description: 'Average person mass'}
      ],
      'projectile-range': [
        {label: '45°', variable: 'θ', value: 45, description: 'Optimal angle for maximum range'},
        {label: '30°', variable: 'θ', value: 30, description: 'Common launch angle'},
        {label: '60°', variable: 'θ', value: 60, description: 'High trajectory angle'}
      ]
    };
    return quickValues[this.formulaId] || [];
  }

  setQuickValue(quickVal: any): void {
    const variable = this.formulaVariables.find(v => v.key === quickVal.variable);
    if (variable) {
      variable.value = quickVal.value;
    }
  }

  getCalculateButtonText(): string {
    const buttonTexts: { [key: string]: string } = {
      'kinetic-energy': 'Calculate Energy',
      'velocity': 'Calculate Velocity',
      'acceleration': 'Calculate Acceleration',
      'newton-second': 'Calculate Force',
      'power': 'Calculate Power'
    };
    return buttonTexts[this.formulaId] || 'Calculate Result';
  }

  hasAnyInput(): boolean {
    return this.formulaVariables.some(v => v.value !== null && !this.isConstant(v.key));
  }

  getValidationMessage(): string {
    const missing = this.formulaVariables.filter(v => (v.value === null || v.value === undefined) && !this.isConstant(v.key));
    if (missing.length === 1) {
      return `Please enter ${missing[0].description.toLowerCase()}`;
    }
    return `Please enter all required values`;
  }

  getCalculationPreview(): string {
    const values = this.formulaVariables.map(v => {
      if (v.value !== null) {
        return `${v.key} = ${v.value}${v.unit ? ' ' + v.unit : ''}`;
      }
      return `${v.key} = ?`;
    }).join(', ');
    return values;
  }

  formatResult(value: number): string {
    if (Math.abs(value) < 0.001 || Math.abs(value) > 10000) {
      return value.toExponential(4);
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }

  getResultInterpretation(): Array<{label: string, value: string}> | null {
    if (!this.result) return null;
    
    const interpretations: { [key: string]: Array<any> } = {
      'kinetic-energy': [
        {label: 'In kWh', value: (this.result.value / 3600000).toFixed(6) + ' kWh'},
        {label: 'In calories', value: (this.result.value / 4184).toFixed(2) + ' cal'}
      ],
      'velocity': [
        {label: 'In km/h', value: (this.result.value * 3.6).toFixed(2) + ' km/h'},
        {label: 'In mph', value: (this.result.value * 2.237).toFixed(2) + ' mph'}
      ]
    };
    return interpretations[this.formulaId] || null;
  }

  getResultContext(): string | null {
    if (!this.result) return null;
    
    const contexts: { [key: string]: string } = {
      'kinetic-energy': 'This is the energy of motion. Higher speeds increase energy quadratically.',
      'velocity': 'This represents the rate of change of position over time.',
      'acceleration': 'This shows how quickly velocity changes over time.'
    };
    return contexts[this.formulaId] || null;
  }

  getFormulaExplanation(): string {
    const explanations: { [key: string]: string } = {
      'kinetic-energy': 'Kinetic energy is the energy an object possesses due to its motion. It depends on both mass and velocity, with velocity having a squared relationship.',
      'velocity': 'Velocity measures how fast position changes over time. Unlike speed, velocity includes direction.',
      'acceleration': 'Acceleration measures how quickly velocity changes. It can be positive (speeding up) or negative (slowing down).'
    };
    return explanations[this.formulaId] || 'This formula calculates a fundamental physics quantity.';
  }

  getFormulaTips(): string[] {
    const tips: { [key: string]: string[] } = {
      'kinetic-energy': [
        'Energy increases with the square of velocity - doubling speed quadruples energy',
        'Units are in Joules (J) - the SI unit of energy'
      ],
      'projectile-range': [
        'Maximum range occurs at 45° launch angle',
        'Range is independent of mass (ignoring air resistance)'
      ]
    };
    return tips[this.formulaId] || [];
  }

  formatHistoryInputs(inputs: any): string {
    return Object.entries(inputs).map(([key, value]) => `${key}=${value}`).join(', ');
  }

  loadFromHistory(calc: CalculationHistory): void {
    Object.entries(calc.inputs).forEach(([key, value]) => {
      const variable = this.formulaVariables.find(v => v.key === key);
      if (variable && !this.isConstant(key)) {
        variable.value = value as number;
      }
    });
  }

  copyResult(): void {
    if (this.result) {
      const text = `${this.formatResult(this.result.value)} ${this.result.unit}`;
      navigator.clipboard.writeText(text).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied',
          detail: 'Result copied to clipboard'
        });
      });
    }
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

      // ROTATION
      case 'angular-velocity':
        this.formulaVariables = [
          { key: 'Δθ', value: null, unit: 'rad', description: 'Change in angle' },
          { key: 'Δt', value: null, unit: 's', description: 'Change in time' }
        ];
        break;
      case 'moment-of-inertia':
        this.formulaVariables = [
          { key: 'm', value: null, unit: 'kg', description: 'Mass' },
          { key: 'r', value: null, unit: 'm', description: 'Distance from axis' }
        ];
        break;
      case 'torque':
        this.formulaVariables = [
          { key: 'r', value: null, unit: 'm', description: 'Distance from axis' },
          { key: 'F', value: null, unit: 'N', description: 'Force' },
          { key: 'θ', value: null, unit: '°', description: 'Angle (degrees)' }
        ];
        break;
      case 'angular-momentum':
        this.formulaVariables = [
          { key: 'I', value: null, unit: 'kg·m²', description: 'Moment of inertia' },
          { key: 'ω', value: null, unit: 'rad/s', description: 'Angular velocity' }
        ];
        break;

      // FLUIDS
      case 'pressure':
        this.formulaVariables = [
          { key: 'F', value: null, unit: 'N', description: 'Force' },
          { key: 'A', value: null, unit: 'm²', description: 'Area' }
        ];
        break;
      case 'buoyancy':
        this.formulaVariables = [
          { key: 'ρ', value: null, unit: 'kg/m³', description: 'Fluid density' },
          { key: 'V', value: null, unit: 'm³', description: 'Displaced volume' },
          { key: 'g', value: 9.8, unit: 'm/s²', description: 'Gravity' }
        ];
        break;
      case 'continuity-equation':
        this.formulaVariables = [
          { key: 'A₁', value: null, unit: 'm²', description: 'Area 1' },
          { key: 'v₁', value: null, unit: 'm/s', description: 'Velocity 1' },
          { key: 'A₂', value: null, unit: 'm²', description: 'Area 2' }
        ];
        break;

      // ENTROPY & ENGINES
      case 'entropy-change':
        this.formulaVariables = [
          { key: 'Q', value: null, unit: 'J', description: 'Heat transferred' },
          { key: 'T', value: null, unit: 'K', description: 'Temperature' }
        ];
        break;
      case 'carnot-efficiency':
        this.formulaVariables = [
          { key: 'T_c', value: null, unit: 'K', description: 'Cold temperature' },
          { key: 'T_h', value: null, unit: 'K', description: 'Hot temperature' }
        ];
        break;
      case 'heat-engine-work':
        this.formulaVariables = [
          { key: 'Q_h', value: null, unit: 'J', description: 'Heat absorbed' },
          { key: 'Q_c', value: null, unit: 'J', description: 'Heat rejected' }
        ];
        break;

      // SOUND
      case 'sound-intensity':
        this.formulaVariables = [
          { key: 'P', value: null, unit: 'W', description: 'Power' },
          { key: 'A', value: null, unit: 'm²', description: 'Area' }
        ];
        break;
      case 'sound-level':
        this.formulaVariables = [
          { key: 'I', value: null, unit: 'W/m²', description: 'Intensity' },
          { key: 'I₀', value: 1e-12, unit: 'W/m²', description: 'Reference intensity' }
        ];
        break;

      // LIGHT
      case 'snells-law':
        this.formulaVariables = [
          { key: 'n₁', value: null, unit: '', description: 'Refractive index 1' },
          { key: 'θ₁', value: null, unit: '°', description: 'Angle 1 (degrees)' },
          { key: 'n₂', value: null, unit: '', description: 'Refractive index 2' }
        ];
        break;
      case 'lens-equation':
        this.formulaVariables = [
          { key: 'd_o', value: null, unit: 'm', description: 'Object distance' },
          { key: 'd_i', value: null, unit: 'm', description: 'Image distance' }
        ];
        break;

      // ELECTROMAGNETIC WAVES
      case 'em-wave-speed':
        this.formulaVariables = [
          { key: 'ε₀', value: 8.854e-12, unit: 'F/m', description: 'Permittivity' },
          { key: 'μ₀', value: 1.257e-6, unit: 'H/m', description: 'Permeability' }
        ];
        break;

      // PARTICLE PHYSICS
      case 'rest-energy':
        this.formulaVariables = [
          { key: 'm₀', value: null, unit: 'kg', description: 'Rest mass' },
          { key: 'c', value: 3e8, unit: 'm/s', description: 'Speed of light' }
        ];
        break;
      case 'relativistic-energy':
        this.formulaVariables = [
          { key: 'γ', value: null, unit: '', description: 'Lorentz factor' },
          { key: 'm₀', value: null, unit: 'kg', description: 'Rest mass' },
          { key: 'c', value: 3e8, unit: 'm/s', description: 'Speed of light' }
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

    this.calculating = true;

    // Simulate calculation delay for better UX
    setTimeout(() => {
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

        // ROTATION
        case 'angular-velocity':
          calculatedValue = getVar('Δθ') / getVar('Δt');
          unit = 'rad/s';
          break;
        case 'moment-of-inertia':
          calculatedValue = getVar('m') * getVar('r') ** 2;
          unit = 'kg·m²';
          break;
        case 'torque':
          const torqueAngle = toRadians(getVar('θ'));
          calculatedValue = getVar('r') * getVar('F') * Math.sin(torqueAngle);
          unit = 'N·m';
          break;
        case 'angular-momentum':
          calculatedValue = getVar('I') * getVar('ω');
          unit = 'kg·m²/s';
          break;

        // FLUIDS
        case 'pressure':
          calculatedValue = getVar('F') / getVar('A');
          unit = 'Pa';
          break;
        case 'buoyancy':
          calculatedValue = getVar('ρ') * getVar('V') * getVar('g');
          unit = 'N';
          break;
        case 'continuity-equation':
          // Solving for v₂: v₂ = (A₁v₁)/A₂
          calculatedValue = (getVar('A₁') * getVar('v₁')) / getVar('A₂');
          unit = 'm/s';
          break;

        // ENTROPY & ENGINES
        case 'entropy-change':
          calculatedValue = getVar('Q') / getVar('T');
          unit = 'J/K';
          break;
        case 'carnot-efficiency':
          calculatedValue = 1 - (getVar('T_c') / getVar('T_h'));
          unit = '';
          break;
        case 'heat-engine-work':
          calculatedValue = getVar('Q_h') - getVar('Q_c');
          unit = 'J';
          break;

        // SOUND
        case 'sound-intensity':
          calculatedValue = getVar('P') / getVar('A');
          unit = 'W/m²';
          break;
        case 'sound-level':
          calculatedValue = 10 * Math.log10(getVar('I') / getVar('I₀'));
          unit = 'dB';
          break;

        // LIGHT
        case 'snells-law':
          // Solving for θ₂: θ₂ = arcsin((n₁/n₂)sin(θ₁))
          const theta1Rad = toRadians(getVar('θ₁'));
          const sinTheta2 = (getVar('n₁') / getVar('n₂')) * Math.sin(theta1Rad);
          calculatedValue = Math.asin(sinTheta2) * 180 / Math.PI;
          unit = '°';
          break;
        case 'lens-equation':
          // Solving for f: 1/f = 1/d_o + 1/d_i
          calculatedValue = 1 / ((1 / getVar('d_o')) + (1 / getVar('d_i')));
          unit = 'm';
          break;

        // ELECTROMAGNETIC WAVES
        case 'em-wave-speed':
          calculatedValue = 1 / Math.sqrt(getVar('ε₀') * getVar('μ₀'));
          unit = 'm/s';
          break;

        // PARTICLE PHYSICS
        case 'rest-energy':
          calculatedValue = getVar('m₀') * getVar('c') ** 2;
          unit = 'J';
          break;
        case 'relativistic-energy':
          calculatedValue = getVar('γ') * getVar('m₀') * getVar('c') ** 2;
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

      this.calculating = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Calculation Complete',
        detail: `Result: ${this.formatNumber(calculatedValue)} ${unit}`
      });
    }, 500);
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

  clearEntry(): void {
    this.displayValue = '0';
  }

  backspace(): void {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  performOperation(nextOperation: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (nextOperation === '=') {
      // Evaluate immediately
      if (this.operation && this.previousValue !== null) {
        const newValue = this.performCalculation(this.previousValue, inputValue);
        this.displayValue = String(parseFloat(newValue.toFixed(10)));
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = true;
      }
      return;
    }

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const newValue = this.performCalculation(this.previousValue, inputValue);
      this.displayValue = String(parseFloat(newValue.toFixed(10)));
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
  private setDisplay(value: number): void {
    const rounded = parseFloat(value.toFixed(10));
    this.displayValue = String(rounded);
    this.waitingForOperand = true;
  }

  sin(): void {
    const v = parseFloat(this.displayValue);
    this.setDisplay(this.angleUnit === 'deg' ? Math.sin(v * Math.PI / 180) : Math.sin(v));
  }

  cos(): void {
    const v = parseFloat(this.displayValue);
    this.setDisplay(this.angleUnit === 'deg' ? Math.cos(v * Math.PI / 180) : Math.cos(v));
  }

  tan(): void {
    const v = parseFloat(this.displayValue);
    this.setDisplay(this.angleUnit === 'deg' ? Math.tan(v * Math.PI / 180) : Math.tan(v));
  }

  log(): void { this.setDisplay(Math.log10(parseFloat(this.displayValue))); }
  ln(): void  { this.setDisplay(Math.log(parseFloat(this.displayValue))); }
  sqrt(): void { this.setDisplay(Math.sqrt(parseFloat(this.displayValue))); }
  square(): void { const v = parseFloat(this.displayValue); this.setDisplay(v * v); }
  inverse(): void { this.setDisplay(1 / parseFloat(this.displayValue)); }

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
