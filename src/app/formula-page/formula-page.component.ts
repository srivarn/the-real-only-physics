import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FORMULAS } from '../formulas';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../components/calculator/calculator.component';

@Component({
  selector: 'app-formula-page',
  standalone: true,
  imports: [CommonModule, CalculatorComponent],
  templateUrl: './formula-page.component.html',
  styleUrls: ['./formula-page.component.css']
})
export class FormulaPageComponent implements OnInit {
  formula: any;
  explanationExpanded: boolean = false;
  realLifeApplicationExpanded: boolean = false;
  calculatorKey: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const path = params['path'];
      this.formula = this.findFormulaByPath(path);
      this.explanationExpanded = false;
      this.realLifeApplicationExpanded = false;
      this.calculatorKey = path;
    });
  }

  findFormulaByPath(path: string): any {
    for (const topic of FORMULAS) {
      for (const subtopic of topic.subtopics) {
        if (subtopic.path === path) {
          return subtopic;
        }
      }
    }
    return null;
  }

  toggleExplanation(): void {
    this.explanationExpanded = !this.explanationExpanded;
  }

  toggleRealLifeApplication(): void {
    this.realLifeApplicationExpanded = !this.realLifeApplicationExpanded;
  }
}
