import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, ButtonModule, PanelModule, MenubarModule, AvatarModule, AvatarGroupModule],
  templateUrl: './app.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  title = 'KnowPhysics';
  formulas: any[] = [
    { name: 'Formula 1', path: 'formula1' },
    { name: 'Formula 2', path: 'formula2' }
  ];
}