import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PHYSICS_QUOTES, Quote } from '../../data/quotes';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  blacklist = ['damn', 'hell'];
  quotes = PHYSICS_QUOTES.filter((q) => !this.blacklist.some((w) => q.text.toLowerCase().includes(w)));

  isPinned(id: number): boolean {
    const ids = JSON.parse(localStorage.getItem('pinnedQuotes') || '[]') as number[];
    return ids.includes(id);
  }

  togglePin(quote: Quote): void {
    const ids = JSON.parse(localStorage.getItem('pinnedQuotes') || '[]') as number[];
    const next = ids.includes(quote.id) ? ids.filter((id) => id !== quote.id) : [...ids, quote.id];
    localStorage.setItem('pinnedQuotes', JSON.stringify(next));
  }
}
