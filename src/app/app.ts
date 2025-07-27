import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ corrected from styleUrl to styleUrls
})
export class App {
  protected title = 'the-only-physics';
}