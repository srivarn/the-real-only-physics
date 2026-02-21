import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { PHYSICS_COURSES, Course } from '../../data/courses';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, RatingModule, DropdownModule, InputTextModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = PHYSICS_COURSES;
  filteredCourses = PHYSICS_COURSES;
  searchTerm = '';
  selectedCategory = '';
  selectedLevel = '';
  
  categories = [
    { label: 'All Categories', value: '' },
    { label: 'Mechanics', value: 'Mechanics' },
    { label: 'Thermodynamics', value: 'Thermodynamics' },
    { label: 'Electromagnetism', value: 'Electromagnetism' },
    { label: 'Modern Physics', value: 'Modern Physics' },
    { label: 'Waves and Optics', value: 'Waves and Optics' }
  ];
  
  levels = [
    { label: 'All Levels', value: '' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.filterCourses();
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  enrollInCourse(courseId: string): void {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login
      return;
    }
    
    // Handle course enrollment
    console.log('Enrolling in course:', courseId);
  }

  getDifficultyColor(level: string): string {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'info';
    }
  }
}