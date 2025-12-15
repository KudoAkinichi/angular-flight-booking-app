import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, RouterModule],
  standalone: true,
})
export class AppComponent {
  isLoggedIn: any;
  logout() {
    throw new Error('Method not implemented.');
  }
  title = 'flight-booking-app';
}
