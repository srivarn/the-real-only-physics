import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { PHYSICS_QUOTES } from '../data/quotes';
import { PHYSICS_EXPERIMENTS } from '../data/experiments';
import { PHYSICS_FORMULAS } from '../data/physics-formulas';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, AnimateOnScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly SIDEREAL_DAY_MS = 86164000;
  private daySeed = Math.floor(Date.now() / this.SIDEREAL_DAY_MS);

  readonly quoteOfDay = PHYSICS_QUOTES[this.daySeed % PHYSICS_QUOTES.length];
  experimentOfDay = PHYSICS_EXPERIMENTS[this.daySeed % PHYSICS_EXPERIMENTS.length];

  formulaCount    = PHYSICS_FORMULAS.length;
  quoteCount      = PHYSICS_QUOTES.length;
  experimentCount = PHYSICS_EXPERIMENTS.length;
  glossaryCount   = 101;

  // Progress dashboard
  visitedFormulasCount = 0;
  completedExperimentsCount = 0;
  streak = 0;
  pinnedQuotesCount = 0;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.visitedFormulasCount      = this.progressService.getVisitedFormulas().size;
    this.completedExperimentsCount = this.progressService.getCompletedExperimentsCount();
    this.streak                    = this.progressService.getStreak();
    this.pinnedQuotesCount         = this.progressService.getPinnedQuotesCount();
  }

  shuffleExperiment(): void {
    const i = Math.floor(Math.random() * PHYSICS_EXPERIMENTS.length);
    this.experimentOfDay = PHYSICS_EXPERIMENTS[i];
  }
}
