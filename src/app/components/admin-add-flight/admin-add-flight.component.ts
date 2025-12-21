import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-add-flight',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add-flight.component.html',
})
export class AdminAddFlightComponent {
  flight = {
    flightNumber: '',
    source: '',
    destination: '',
    price: 0,
    seats: 0,
  };

  constructor(private flightService: FlightService) {}

  addFlight() {
    this.flightService.createFlight(this.flight).subscribe({
      next: () => alert('Flight created'),
      error: () => alert('Only admin can add flight'),
    });
  }
}
