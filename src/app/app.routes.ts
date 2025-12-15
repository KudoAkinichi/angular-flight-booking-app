import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    component: SearchFlightsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
