import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
})
export class SearchFlightsComponent implements OnInit {
  searchForm: FormGroup;
  flights: Flight[] = [];
  searched = false;
  loading = false;
  errorMessage = '';

  cities = [
    { code: 'DEL', name: 'New Delhi' },
    { code: 'BOM', name: 'Mumbai' },
    { code: 'BLR', name: 'Bangalore' },
    { code: 'HYD', name: 'Hyderabad' },
    { code: 'CCU', name: 'Kolkata' },
    { code: 'MAA', name: 'Chennai' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService
  ) {
    this.searchForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required],
      passengers: [1, Validators.required],
    });
  }

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.searchForm.patchValue({ date: today });
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    this.searched = true;
    this.errorMessage = '';

    this.flightService.searchFlights(this.searchForm.value).subscribe({
      next: (results) => {
        this.flights = results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loading = false;
        this.errorMessage = 'Failed to search flights. Please try again.';
        this.flights = [];
      },
    });
  }

  bookFlight(flight: Flight) {
    // For now, just show an alert
    // In real implementation, navigate to booking page
    alert(
      `Flight booked successfully!\n\n` +
        `${flight.airline}\n` +
        `${flight.fromName} → ${flight.toName}\n` +
        `Departure: ${flight.departTime}\n` +
        `Price: ₹${flight.price}\n\n` +
        `Thank you for booking with SkyBooker!`
    );

    // Optionally call backend booking API
    // this.flightService.bookFlight(flight.id, passengerData).subscribe(...)
  }
}
