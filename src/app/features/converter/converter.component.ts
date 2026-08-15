import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

interface UnitOption {
  label: string;
  value: string;
}

interface CategoryDef {
  label: string;
  value: string;
  units: UnitOption[];
}

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DropdownModule, InputNumberModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {

  categories: CategoryDef[] = [
    {
      label: 'Speed',
      value: 'speed',
      units: [
        { label: 'm/s',   value: 'ms' },
        { label: 'km/h',  value: 'kmh' },
        { label: 'mph',   value: 'mph' },
        { label: 'ft/s',  value: 'fts' },
        { label: 'knots', value: 'knots' },
      ]
    },
    {
      label: 'Energy',
      value: 'energy',
      units: [
        { label: 'J',    value: 'J' },
        { label: 'kJ',   value: 'kJ' },
        { label: 'kWh',  value: 'kWh' },
        { label: 'cal',  value: 'cal' },
        { label: 'kcal', value: 'kcal' },
        { label: 'eV',   value: 'eV' },
        { label: 'BTU',  value: 'BTU' },
      ]
    },
    {
      label: 'Temperature',
      value: 'temperature',
      units: [
        { label: '°C', value: 'C' },
        { label: '°F', value: 'F' },
        { label: 'K',  value: 'K' },
      ]
    },
    {
      label: 'Length',
      value: 'length',
      units: [
        { label: 'm',    value: 'm' },
        { label: 'km',   value: 'km' },
        { label: 'cm',   value: 'cm' },
        { label: 'mm',   value: 'mm' },
        { label: 'ft',   value: 'ft' },
        { label: 'in',   value: 'in' },
        { label: 'mi',   value: 'mi' },
        { label: 'ly',   value: 'ly' },
      ]
    },
    {
      label: 'Mass',
      value: 'mass',
      units: [
        { label: 'kg', value: 'kg' },
        { label: 'g',  value: 'g' },
        { label: 'lb', value: 'lb' },
        { label: 'oz', value: 'oz' },
        { label: 't (metric ton)', value: 't' },
      ]
    },
    {
      label: 'Pressure',
      value: 'pressure',
      units: [
        { label: 'Pa',    value: 'Pa' },
        { label: 'kPa',   value: 'kPa' },
        { label: 'bar',   value: 'bar' },
        { label: 'atm',   value: 'atm' },
        { label: 'psi',   value: 'psi' },
        { label: 'mmHg',  value: 'mmHg' },
      ]
    },
    {
      label: 'Power',
      value: 'power',
      units: [
        { label: 'W',     value: 'W' },
        { label: 'kW',    value: 'kW' },
        { label: 'MW',    value: 'MW' },
        { label: 'hp',    value: 'hp' },
        { label: 'BTU/h', value: 'BTUh' },
      ]
    },
    {
      label: 'Frequency',
      value: 'frequency',
      units: [
        { label: 'Hz',  value: 'Hz' },
        { label: 'kHz', value: 'kHz' },
        { label: 'MHz', value: 'MHz' },
        { label: 'GHz', value: 'GHz' },
      ]
    },
  ];

  // Conversion factors to base unit (SI)
  // speed → m/s, energy → J, length → m, mass → kg, pressure → Pa, power → W, frequency → Hz
  private toBase: Record<string, Record<string, number>> = {
    speed:     { ms: 1, kmh: 1 / 3.6, mph: 0.44704, fts: 0.3048, knots: 0.514444 },
    energy:    { J: 1, kJ: 1000, kWh: 3_600_000, cal: 4.184, kcal: 4184, eV: 1.602176634e-19, BTU: 1055.06 },
    length:    { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, mi: 1609.344, ly: 9.4607304725808e15 },
    mass:      { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.028349523125, t: 1000 },
    pressure:  { Pa: 1, kPa: 1000, bar: 100_000, atm: 101_325, psi: 6894.757, mmHg: 133.322 },
    power:     { W: 1, kW: 1000, MW: 1_000_000, hp: 745.69987, BTUh: 0.29307107 },
    frequency: { Hz: 1, kHz: 1000, MHz: 1_000_000, GHz: 1_000_000_000 },
  };

  selectedCategory: CategoryDef = this.categories[0];
  fromUnit: UnitOption = this.categories[0].units[0];
  toUnit: UnitOption = this.categories[0].units[1];
  inputValue: number | null = 1;

  result: number | null = null;
  formulaText = '';

  get currentUnits(): UnitOption[] {
    return this.selectedCategory?.units ?? [];
  }

  onCategoryChange(): void {
    this.fromUnit = this.selectedCategory.units[0];
    this.toUnit   = this.selectedCategory.units[1] ?? this.selectedCategory.units[0];
    this.result   = null;
    this.formulaText = '';
  }

  convert(): void {
    if (this.inputValue === null || this.inputValue === undefined) {
      this.result = null;
      this.formulaText = '';
      return;
    }

    const cat = this.selectedCategory.value;

    if (cat === 'temperature') {
      this.result = this.convertTemperature(this.inputValue, this.fromUnit.value, this.toUnit.value);
      this.formulaText = this.temperatureFormula(this.fromUnit.value, this.toUnit.value);
      return;
    }

    const factors = this.toBase[cat];
    if (!factors) return;

    const fromFactor = factors[this.fromUnit.value];
    const toFactor   = factors[this.toUnit.value];

    if (fromFactor === undefined || toFactor === undefined) return;

    // Convert: value × fromFactor → base unit → ÷ toFactor
    const baseValue = this.inputValue * fromFactor;
    this.result = baseValue / toFactor;

    const multiplier = fromFactor / toFactor;
    this.formulaText = this.buildLinearFormula(
      this.fromUnit.label,
      this.toUnit.label,
      multiplier
    );
  }

  // ── Temperature (non-linear) ─────────────────────────────────────────────────

  private convertTemperature(value: number, from: string, to: string): number {
    if (from === to) return value;

    // Convert to Kelvin first
    let kelvin: number;
    switch (from) {
      case 'C': kelvin = value + 273.15; break;
      case 'F': kelvin = (value - 32) * 5 / 9 + 273.15; break;
      case 'K': kelvin = value; break;
      default:  kelvin = value;
    }

    // Convert Kelvin to target
    switch (to) {
      case 'C': return kelvin - 273.15;
      case 'F': return (kelvin - 273.15) * 9 / 5 + 32;
      case 'K': return kelvin;
      default:  return kelvin;
    }
  }

  private temperatureFormula(from: string, to: string): string {
    if (from === to) return 'No conversion needed';
    const formulas: Record<string, string> = {
      'C→F': '(°C × 9/5) + 32',
      'F→C': '(°F − 32) × 5/9',
      'C→K': '°C + 273.15',
      'K→C': 'K − 273.15',
      'F→K': '(°F − 32) × 5/9 + 273.15',
      'K→F': '(K − 273.15) × 9/5 + 32',
    };
    return formulas[`${from}→${to}`] ?? '';
  }

  // ── Linear formula display ───────────────────────────────────────────────────

  private buildLinearFormula(fromLabel: string, toLabel: string, multiplier: number): string {
    let factor: string;
    if (multiplier === 1) {
      return `${fromLabel} = ${toLabel} (same unit)`;
    } else if (multiplier >= 0.001 && multiplier < 10_000) {
      factor = this.formatNumber(multiplier);
    } else {
      factor = multiplier.toExponential(6).replace(/\.?0+e/, 'e');
    }
    return `${fromLabel} × ${factor} = ${toLabel}`;
  }

  private formatNumber(n: number): string {
    // Show up to 8 significant figures, trim trailing zeros
    return parseFloat(n.toPrecision(8)).toString();
  }
}
