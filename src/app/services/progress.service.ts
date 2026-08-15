import { Injectable } from '@angular/core';

const SIDEREAL_DAY_MS = 86164000;

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  // ── Formula visits ──────────────────────────────────────────────────────────

  trackFormulaVisit(id: string): void {
    const visited = this.getVisitedFormulas();
    visited.add(id);
    localStorage.setItem('visited_formulas', JSON.stringify([...visited]));
  }

  getVisitedFormulas(): Set<string> {
    try {
      const raw = localStorage.getItem('visited_formulas');
      if (!raw) return new Set();
      return new Set<string>(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }

  // ── Experiments ─────────────────────────────────────────────────────────────

  getCompletedExperiments(): Record<string, number> {
    try {
      const raw = localStorage.getItem('experimentProgress');
      if (!raw) return {};
      return JSON.parse(raw) as Record<string, number>;
    } catch {
      return {};
    }
  }

  getCompletedExperimentsCount(): number {
    const experiments = this.getCompletedExperiments();
    return Object.values(experiments).filter(progress => progress >= 100).length;
  }

  // ── Streak ───────────────────────────────────────────────────────────────────

  /**
   * Returns the number of consecutive sidereal days the user has visited,
   * counting backwards from today.
   */
  getStreak(): number {
    const dates = this.getVisitDates();
    if (dates.size === 0) return 0;

    const todayIndex = this.getSiderealDayIndex();
    let streak = 0;
    let current = todayIndex;

    while (dates.has(current)) {
      streak++;
      current--;
    }
    return streak;
  }

  recordTodayVisit(): void {
    const dates = this.getVisitDates();
    const todayIndex = this.getSiderealDayIndex();
    if (!dates.has(todayIndex)) {
      dates.add(todayIndex);
      localStorage.setItem('visit_dates', JSON.stringify([...dates]));
    }
  }

  private getVisitDates(): Set<number> {
    try {
      const raw = localStorage.getItem('visit_dates');
      if (!raw) return new Set();
      return new Set<number>(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }

  private getSiderealDayIndex(): number {
    return Math.floor(Date.now() / SIDEREAL_DAY_MS);
  }

  // ── Pinned quotes ────────────────────────────────────────────────────────────

  getPinnedQuotesCount(): number {
    try {
      const raw = localStorage.getItem('pinnedQuotes');
      if (!raw) return 0;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.length : 0;
    } catch {
      return 0;
    }
  }
}
