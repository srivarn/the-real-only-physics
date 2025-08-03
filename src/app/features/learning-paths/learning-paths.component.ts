import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LEARNING_PATHS, LearningPath } from '../../data/learning-paths';

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, ProgressBarModule, DropdownModule, InputTextModule, FormsModule],
  templateUrl: './learning-paths.component.html',
  styleUrls: ['./learning-paths.component.css']
})
export class LearningPathsComponent implements OnInit {
  learningPaths = LEARNING_PATHS;
  filteredPaths = LEARNING_PATHS;
  searchTerm = '';
  selectedCategory = '';
  selectedDifficulty = '';
  
  categories = [
    { label: 'All Categories', value: '' },
    { label: 'General Physics', value: 'General Physics' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Medical Physics', value: 'Medical Physics' },
    { label: 'Astrophysics', value: 'Astrophysics' },
    { label: 'Modern Physics', value: 'Modern Physics' }
  ];
  
  difficulties = [
    { label: 'All Levels', value: '' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.filterPaths();
  }

  filterPaths(): void {
    this.filteredPaths = this.learningPaths.filter(path => {
      const matchesSearch = path.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           path.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || path.category === this.selectedCategory;
      const matchesDifficulty = !this.selectedDifficulty || path.difficulty === this.selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  startLearningPath(pathId: string): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    
    console.log('Starting learning path:', pathId);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'info';
    }
  }
}