import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showQuotes: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.showQuotes = params['showQuotes'] === 'true';
    });
  }
}
