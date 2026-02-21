import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PHYSICS_EXPERIMENTS } from '../../data/experiments';

@Component({
  selector: 'app-experiments',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, AccordionModule, DropdownModule, InputTextModule, FormsModule],
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  experiments = PHYSICS_EXPERIMENTS;
  filteredExperiments = PHYSICS_EXPERIMENTS;
  searchTerm = '';
  selectedCategory = '';
  selectedDifficulty = '';
  progress: Record<string, number> = JSON.parse(localStorage.getItem('experimentProgress') || '{}');

  categories = [{ label: 'All Categories', value: '' }, ...Array.from(new Set(PHYSICS_EXPERIMENTS.map((e) => e.category))).map((c) => ({ label: c, value: c }))];
  difficulties = [{ label: 'All Difficulties', value: '' }, { label: 'Easy', value: 'Easy' }, { label: 'Medium', value: 'Medium' }, { label: 'Hard', value: 'Hard' }];

  totalCompleted = 0;
  avgRating = '0.0';
  easyCount = 0;

  ngOnInit(): void {
    this.filterExperiments();
    this.totalCompleted = this.experiments.reduce((sum, e) => sum + e.completedBy, 0);
    this.avgRating = (this.experiments.reduce((sum, e) => sum + e.rating, 0) / this.experiments.length).toFixed(1);
    this.easyCount = this.experiments.filter((e) => e.difficulty === 'Easy').length;
  }

  filterExperiments(): void {
    this.filteredExperiments = this.experiments.filter((experiment) => {
      const q = this.searchTerm.toLowerCase();
      const matchesSearch = experiment.title.toLowerCase().includes(q) || experiment.description.toLowerCase().includes(q);
      const matchesCategory = !this.selectedCategory || experiment.category === this.selectedCategory;
      const matchesDifficulty = !this.selectedDifficulty || experiment.difficulty === this.selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  startExperiment(experimentId: string): void {
    const current = this.progress[experimentId] || 0;
    this.progress[experimentId] = Math.min(current + 1, 100);
    localStorage.setItem('experimentProgress', JSON.stringify(this.progress));
  }

  getDifficultyColor(difficulty: string): 'success' | 'warning' | 'danger' | 'info' {
    if (difficulty === 'Easy') return 'success';
    if (difficulty === 'Medium') return 'warning';
    if (difficulty === 'Hard') return 'danger';
    return 'info';
  }
}
