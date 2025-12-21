import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SearchFlightsComponent } from './components/search-flights/search-flights.component';
import { AuthGuard } from './guards/auth.guard';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { AdminAddFlightComponent } from './components/admin-add-flight/admin-add-flight.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    component: SearchFlightsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/add-flight',
    component: AdminAddFlightComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/login' },
];
