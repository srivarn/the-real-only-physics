import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PHYSICS_TOPICS, PHYSICS_FORMULAS, PhysicsFormula } from '../../data/physics-formulas';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, BadgeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() formulas: any[] = [];
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;
  physicsTopics = PHYSICS_TOPICS;
  physicsFormulas = PHYSICS_FORMULAS;

  constructor(private router: Router) {
    this.checkAuth();
  }

  expandedTopics: Set<string> = new Set();
  expandedSubtopics: Set<string> = new Set();

  toggleTopic(topic: string): void {
    if (this.expandedTopics.has(topic)) {
      this.expandedTopics.delete(topic);
    } else {
      this.expandedTopics.add(topic);
    }
  }

  toggleSubtopic(path: string): void {
    if (this.expandedSubtopics.has(path)) {
      this.expandedSubtopics.delete(path);
    } else {
      this.expandedSubtopics.add(path);
    }
  }

  navigateToFormula(formulaId: string): void {
    this.router.navigate(['/formula', formulaId]);
  }

  getFormulasBySubtopic(topic: string, subtopic: string): PhysicsFormula[] {
    return this.physicsFormulas.filter(formula => 
      formula.topic === topic && formula.subtopic === subtopic
    );
  }

  isTopicExpanded(topic: string): boolean {
    return this.expandedTopics.has(topic);
  }

  isSubtopicExpanded(path: string): boolean {
    return this.expandedSubtopics.has(path);
  }

  checkAuth() {
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }
}
