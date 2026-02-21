import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, MenubarModule, ButtonModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  showTop = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop = window.scrollY > 300;
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
