import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PHYSICS_FORMULAS, PHYSICS_TOPICS } from './data/physics-formulas';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, ButtonModule, PanelModule, MenubarModule, AvatarModule, AvatarGroupModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  title = 'TheOnlyPhysics';
  formulas = PHYSICS_FORMULAS;
  topics = PHYSICS_TOPICS;

  constructor(public authService: AuthService) {}
}