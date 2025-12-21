import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css',
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  error = '';

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.flightService.getMyBookings().subscribe({
      next: (res) => (this.bookings = res),
      error: () => (this.error = 'Failed to load bookings'),
    });
  }

  cancelBooking(bookingId: number) {
    if (!confirm('Are you sure you want to cancel this ticket?')) return;

    this.flightService.cancelBooking(bookingId).subscribe({
      next: () => {
        alert('Booking cancelled');
        this.loadBookings();
      },
      error: () => alert('Cancellation failed'),
    });
  }
}
