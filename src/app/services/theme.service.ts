import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark$: BehaviorSubject<boolean>;

  constructor() {
    const stored = localStorage.getItem('theme');
    // Default is dark; 'light' in storage means light theme is active
    const isDark = stored !== 'light';
    this.isDark$ = new BehaviorSubject<boolean>(isDark);
    this.applyTheme(isDark);
  }

  toggle(): void {
    const next = !this.isDark$.value;
    this.isDark$.next(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }
}
