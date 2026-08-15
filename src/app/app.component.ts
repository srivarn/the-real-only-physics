import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarService } from './services/sidebar.service';
import { ThemeService } from './services/theme.service';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, ButtonModule, RippleModule, TooltipModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent implements OnInit {
  showTop = false;
  mobileMenuOpen = false;
  sidebarCollapsed = false;
  isDark = true;

  constructor(
    private sidebarService: SidebarService,
    public themeService: ThemeService,
    private progressService: ProgressService
  ) {
    this.sidebarService.collapsed$.subscribe(c => this.sidebarCollapsed = c);
    this.themeService.isDark$.subscribe(d => this.isDark = d);
  }

  ngOnInit(): void {
    this.progressService.recordTodayVisit();
  }

  @HostListener('window:scroll')
  onScroll(): void { this.showTop = window.scrollY > 300; }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 767) this.mobileMenuOpen = false;
  }

  toTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  toggleTheme(): void { this.themeService.toggle(); }
}
