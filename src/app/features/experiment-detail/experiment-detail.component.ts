import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PHYSICS_EXPERIMENTS, Experiment } from '../../data/experiments';

@Component({
  selector: 'app-experiment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule, CheckboxModule, FormsModule],
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  experiment: Experiment | undefined;
  currentStep = 0;
  checkedMaterials: string[] = [];
  progress = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.experiment = PHYSICS_EXPERIMENTS.find((e) => e.id === id);
    const materialKey = `exp_materials_${id}`;
    const progressKey = `exp_step_${id}`;
    this.checkedMaterials = JSON.parse(localStorage.getItem(materialKey) || '[]');
    this.currentStep = Number(localStorage.getItem(progressKey) || 0);
    this.recomputeProgress();
  }

  toggleMaterial(material: string, checked: boolean): void {
    if (!this.experiment) return;
    this.checkedMaterials = checked ? [...this.checkedMaterials, material] : this.checkedMaterials.filter((m) => m !== material);
    localStorage.setItem(`exp_materials_${this.experiment.id}`, JSON.stringify(this.checkedMaterials));
  }

  nextStep(): void {
    if (!this.experiment) return;
    this.currentStep = Math.min(this.currentStep + 1, this.experiment.procedure.length - 1);
    localStorage.setItem(`exp_step_${this.experiment.id}`, String(this.currentStep));
    this.recomputeProgress();
  }

  prevStep(): void {
    if (!this.experiment) return;
    this.currentStep = Math.max(this.currentStep - 1, 0);
    localStorage.setItem(`exp_step_${this.experiment.id}`, String(this.currentStep));
    this.recomputeProgress();
  }

  private recomputeProgress(): void {
    if (!this.experiment || this.experiment.procedure.length === 0) {
      this.progress = 0;
      return;
    }
    this.progress = Math.round(((this.currentStep + 1) / this.experiment.procedure.length) * 100);
  }
}
