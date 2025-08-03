import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { COMMUNITY_QUESTIONS, STUDY_GROUPS, Question, StudyGroup } from '../../data/community';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, AvatarModule, TabViewModule, DropdownModule, InputTextModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  questions = COMMUNITY_QUESTIONS;
  studyGroups = STUDY_GROUPS;
  filteredQuestions = COMMUNITY_QUESTIONS;
  filteredGroups = STUDY_GROUPS;
  
  searchTerm = '';
  selectedCategory = '';
  selectedDifficulty = '';
  
  categories = [
    { label: 'All Categories', value: '' },
    { label: 'Mechanics', value: 'Mechanics' },
    { label: 'Thermodynamics', value: 'Thermodynamics' },
    { label: 'Electromagnetism', value: 'Electromagnetism' },
    { label: 'Quantum Physics', value: 'Quantum Physics' },
    { label: 'Relativity', value: 'Relativity' },
    { label: 'Waves and Optics', value: 'Waves and Optics' }
  ];
  
  difficulties = [
    { label: 'All Levels', value: '' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.filterQuestions();
    this.filterGroups();
  }

  filterQuestions(): void {
    this.filteredQuestions = this.questions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           question.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || question.category === this.selectedCategory;
      const matchesDifficulty = !this.selectedDifficulty || question.difficulty === this.selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  filterGroups(): void {
    this.filteredGroups = this.studyGroups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           group.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || group.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  askQuestion(): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    
    console.log('Opening ask question modal');
  }

  joinGroup(groupId: string): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    
    console.log('Joining study group:', groupId);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'info';
    }
  }

  getTimeSince(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
}