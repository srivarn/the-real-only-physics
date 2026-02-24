import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { PHYSICS_QUOTES } from '../data/quotes';
import { PHYSICS_EXPERIMENTS } from '../data/experiments';
import { PHYSICS_FORMULAS } from '../data/physics-formulas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, AnimateOnScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Sidereal day: 23 hours, 56 minutes, 4 seconds = 86164 seconds
  private readonly SIDEREAL_DAY_MS = 86164000; // milliseconds
  private daySeed = Math.floor(Date.now() / this.SIDEREAL_DAY_MS);

  readonly quoteOfDay = PHYSICS_QUOTES[this.daySeed % PHYSICS_QUOTES.length];
  experimentOfDay = PHYSICS_EXPERIMENTS[this.daySeed % PHYSICS_EXPERIMENTS.length];

  formulaCount = PHYSICS_FORMULAS.length;
  quoteCount = PHYSICS_QUOTES.length;
  experimentCount = PHYSICS_EXPERIMENTS.length;

  shuffleExperiment(): void {
    const randomIndex = Math.floor(Math.random() * PHYSICS_EXPERIMENTS.length);
    this.experimentOfDay = PHYSICS_EXPERIMENTS[randomIndex];
  }
}
