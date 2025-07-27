import { Component, Input } from '@angular/core';
import { CalculatorComponent } from "../components/calculator/calculator.component";

@Component({
  selector: 'app-physics-card',
  templateUrl: './physics-card.component.html',
  styleUrls: ['./physics-card.component.css'],
  imports: [CalculatorComponent]
})
export class PhysicsCardComponent {
  @Input() title: string = '';
  @Input() formula: string = '';
  @Input() explanation: string = '';
  @Input() example: string = '';
}
