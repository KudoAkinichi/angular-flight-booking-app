import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  booking = {
    flightId: 1,
    userName: '',
    userEmail: '',
    numberOfSeats: 1,
    passengers: [
      {
        name: '',
        age: 0,
        gender: 'MALE',
        seatNumber: '',
        mealType: 'VEG',
      },
    ],
  };

  error = '';

  constructor(private flightService: FlightService, private router: Router) {}

  bookFlight() {
    if (!this.booking.userName || !this.booking.userEmail) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.flightService.bookFlight(this.booking).subscribe({
      next: (res) => {
        console.log('Booking success', res);
        alert('Booking Confirmed!');
        this.router.navigate(['/search-flights']);
      },
      error: () => {
        this.error = 'Booking failed. Please try again.';
      },
    });
  }
}
