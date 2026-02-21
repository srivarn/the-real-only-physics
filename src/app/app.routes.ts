import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormulaPageComponent } from './formula-page/formula-page.component';
import { ExperimentsComponent } from './features/experiments/experiments.component';
import { GlossaryComponent } from './features/glossary/glossary.component';
import { QuotesComponent } from './features/quotes/quotes.component';
import { ExperimentDetailComponent } from './features/experiment-detail/experiment-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'glossary', component: GlossaryComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'experiments/:id', component: ExperimentDetailComponent },
  { path: 'formulas', redirectTo: '/formula/kinetic-energy', pathMatch: 'full' },
  { path: 'formula/:id', component: FormulaPageComponent },
  { path: '**', redirectTo: '' }
];
