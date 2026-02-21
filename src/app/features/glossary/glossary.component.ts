import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { GLOSSARY_TERMS } from '../../data/glossary';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ChipModule, CardModule],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent {
  terms = GLOSSARY_TERMS;
  search = '';
  activeLetter = '';
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  get filtered() {
    return this.terms.filter((t) => {
      const matchesLetter = !this.activeLetter || t.term.startsWith(this.activeLetter);
      const q = this.search.trim().toLowerCase();
      const matchesSearch = !q || `${t.term} ${t.definition} ${t.tags.join(' ')}`.toLowerCase().includes(q);
      return matchesLetter && matchesSearch;
    });
  }
}
