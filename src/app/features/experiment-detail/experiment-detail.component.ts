import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { PHYSICS_EXPERIMENTS, Experiment } from '../../data/experiments';

export type Phase = 'overview' | 'safety' | 'materials' | 'steps' | 'results';

@Component({
  selector: 'app-experiment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule, CheckboxModule, TooltipModule, FormsModule],
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  experiment: Experiment | undefined;
  phase: Phase = 'overview';
  currentStep = 0;
  checkedMaterials: string[] = [];
  progress = 0;

  readonly phases: Phase[] = ['overview', 'safety', 'materials', 'steps', 'results'];
  readonly phaseLabels: Record<Phase, string> = {
    overview:  'Overview',
    safety:    'Safety',
    materials: 'Materials',
    steps:     'Experiment',
    results:   'Results'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.experiment = PHYSICS_EXPERIMENTS.find((e) => e.id === id);
    if (!this.experiment) return;
    this.checkedMaterials = JSON.parse(localStorage.getItem(`exp_materials_${id}`) || '[]');
    this.currentStep      = Number(localStorage.getItem(`exp_step_${id}`)       || 0);
    // If already in progress, skip to steps
    const saved = localStorage.getItem(`exp_phase_${id}`);
    if (saved) this.phase = saved as Phase;
    this.recomputeProgress();
  }

  get allMaterialsChecked(): boolean {
    return !!this.experiment && this.checkedMaterials.length >= this.experiment.materials.length;
  }

  get phaseIndex(): number { return this.phases.indexOf(this.phase); }

  goPhase(p: Phase): void {
    this.phase = p;
    if (this.experiment) localStorage.setItem(`exp_phase_${this.experiment.id}`, p);
  }

  nextPhase(): void {
    const next = this.phases[this.phaseIndex + 1];
    if (next) this.goPhase(next);
  }

  prevPhase(): void {
    const prev = this.phases[this.phaseIndex - 1];
    if (prev) this.goPhase(prev);
  }

  toggleMaterial(material: string, checked: boolean): void {
    if (!this.experiment) return;
    this.checkedMaterials = checked
      ? [...this.checkedMaterials, material]
      : this.checkedMaterials.filter((m) => m !== material);
    localStorage.setItem(`exp_materials_${this.experiment.id}`, JSON.stringify(this.checkedMaterials));
  }

  nextStep(): void {
    if (!this.experiment) return;
    if (this.currentStep < this.experiment.procedure.length - 1) {
      this.currentStep++;
      localStorage.setItem(`exp_step_${this.experiment.id}`, String(this.currentStep));
      this.recomputeProgress();
    } else {
      // All steps done — go to results
      this.goPhase('results');
    }
  }

  prevStep(): void {
    if (!this.experiment) return;
    this.currentStep = Math.max(this.currentStep - 1, 0);
    localStorage.setItem(`exp_step_${this.experiment.id}`, String(this.currentStep));
    this.recomputeProgress();
  }

  resetExperiment(): void {
    if (!this.experiment) return;
    this.currentStep = 0;
    this.checkedMaterials = [];
    this.phase = 'overview';
    localStorage.removeItem(`exp_step_${this.experiment.id}`);
    localStorage.removeItem(`exp_materials_${this.experiment.id}`);
    localStorage.removeItem(`exp_phase_${this.experiment.id}`);
    this.recomputeProgress();
  }

  recomputeProgress(): void {
    if (!this.experiment || this.experiment.procedure.length === 0) { this.progress = 0; return; }
    this.progress = Math.round(((this.currentStep + 1) / this.experiment.procedure.length) * 100);
  }
}
