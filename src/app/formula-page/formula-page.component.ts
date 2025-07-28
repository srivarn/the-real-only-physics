import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PHYSICS_FORMULAS, PhysicsFormula } from '../data/physics-formulas';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../components/calculator/calculator.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-formula-page',
  standalone: true,
  imports: [CommonModule, CalculatorComponent, CardModule, ButtonModule, PanelModule, TagModule, DividerModule],
  templateUrl: './formula-page.component.html',
  styleUrls: ['./formula-page.component.css']
})
export class FormulaPageComponent implements OnInit {
  formula: PhysicsFormula | null = null;
  explanationExpanded: boolean = false;
  realLifeApplicationExpanded: boolean = false;
  calculatorKey: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const formulaId = params['id'];
      this.formula = this.findFormulaById(formulaId);
      this.explanationExpanded = false;
      this.realLifeApplicationExpanded = false;
      this.calculatorKey = formulaId;
    });
  }

  findFormulaById(id: string): PhysicsFormula | null {
    return PHYSICS_FORMULAS.find(formula => formula.id === id) || null;
  }

  toggleExplanation(): void {
    this.explanationExpanded = !this.explanationExpanded;
  }

  toggleRealLifeApplication(): void {
    this.realLifeApplicationExpanded = !this.realLifeApplicationExpanded;
  }

  getVariableEntries(): { key: string; value: string }[] {
    if (!this.formula) return [];
    return Object.entries(this.formula.variables).map(([key, value]) => ({
      key,
      value: value as string
    }));
  }
}
