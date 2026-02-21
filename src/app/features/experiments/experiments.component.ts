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
import { AuthService } from '../../auth/auth.service';
import { PHYSICS_EXPERIMENTS, Experiment } from '../../data/experiments';

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
  
  categories = [
    { label: 'All Categories', value: '' },
    { label: 'Mechanics', value: 'Mechanics' },
    { label: 'Thermodynamics', value: 'Thermodynamics' },
    { label: 'Electromagnetism', value: 'Electromagnetism' },
    { label: 'Waves and Optics', value: 'Waves and Optics' },
    { label: 'Modern Physics', value: 'Modern Physics' }
  ];
  
  difficulties = [
    { label: 'All Difficulties', value: '' },
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.filterExperiments();
  }

  filterExperiments(): void {
    this.filteredExperiments = this.experiments.filter(experiment => {
      const matchesSearch = experiment.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           experiment.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || experiment.category === this.selectedCategory;
      const matchesDifficulty = !this.selectedDifficulty || experiment.difficulty === this.selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  startExperiment(experimentId: string): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    
    console.log('Starting experiment:', experimentId);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'info';
    }
  }
}