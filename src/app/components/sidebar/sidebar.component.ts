import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() formulas: any[] = [];
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;

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

  navigateToFormula(path: string): void {
    this.router.navigate(['/formula', path]);
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
