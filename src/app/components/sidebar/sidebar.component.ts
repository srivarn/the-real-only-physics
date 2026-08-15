import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { PHYSICS_TOPICS, PHYSICS_FORMULAS, PhysicsFormula } from '../../data/physics-formulas';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RippleModule, ButtonModule, TooltipModule, InputTextModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collapsed = false;
  formulasExpanded = false;
  expandedTopics: Set<string> = new Set();
  expandedSubtopics: Set<string> = new Set();
  physicsTopics = PHYSICS_TOPICS;

  // Formula search
  formulaSearch = '';
  get searchResults(): PhysicsFormula[] {
    const q = this.formulaSearch.trim().toLowerCase();
    if (!q) return [];
    return PHYSICS_FORMULAS.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.formula.toLowerCase().includes(q) ||
      f.topic.toLowerCase().includes(q)
    ).slice(0, 12);
  }
  get isSearching(): boolean { return this.formulaSearch.trim().length > 0; }

  constructor(private router: Router, private sidebarService: SidebarService) {}

  toggleCollapse(): void { 
    this.collapsed = !this.collapsed;
    this.sidebarService.setCollapsed(this.collapsed);
  }
  
  toggleFormulas(): void { 
    this.formulasExpanded = !this.formulasExpanded; 
  }
  
  toggleTopic(topic: string): void {
    this.expandedTopics.has(topic) ? this.expandedTopics.delete(topic) : this.expandedTopics.add(topic);
  }
  
  toggleSubtopic(key: string): void {
    this.expandedSubtopics.has(key) ? this.expandedSubtopics.delete(key) : this.expandedSubtopics.add(key);
  }

  topicOpen(topic: string): boolean { 
    return this.expandedTopics.has(topic); 
  }
  
  subtopicOpen(key: string): boolean { 
    return this.expandedSubtopics.has(key); 
  }

  formulasBy(topic: string, subtopic: string): PhysicsFormula[] {
    return PHYSICS_FORMULAS.filter((f) => f.topic === topic && f.subtopic === subtopic);
  }

  navFormula(formulaId: string): void {
    this.router.navigate(['/formula', formulaId]);
  }
}
