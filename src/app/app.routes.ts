import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';
import { SignUpComponent } from './auth/sign-up.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { PhysicsSimulatorComponent } from './components/physics-simulator/physics-simulator.component';
import { FormulaPageComponent } from './formula-page/formula-page.component';
import { SimulatorComponent } from './features/simulator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'simulator', component: PhysicsSimulatorComponent },
  { path: 'formula/:id', component: FormulaPageComponent },
  { path: 'physics-simulator', component: SimulatorComponent },
  { path: '**', redirectTo: '' } // Wildcard route for unknown paths
];