import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, ButtonModule, RippleModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  showTop = false;
  mobileMenuOpen = false;
  sidebarCollapsed = false;

  constructor(private sidebarService: SidebarService) {
    // Subscribe to sidebar collapse state
    this.sidebarService.collapsed$.subscribe(collapsed => {
      this.sidebarCollapsed = collapsed;
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop = window.scrollY > 300;
  }

  @HostListener('window:resize')
  onResize(): void {
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 767) {
      this.mobileMenuOpen = false;
    }
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
