import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight, FlightSearchCriteria } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl = 'http://localhost:8765/api/flights';

  constructor(private http: HttpClient) {}

  // Search flights from backend
  searchFlights(criteria: FlightSearchCriteria): Observable<Flight[]> {
    return this.http.post<Flight[]>(`${this.baseUrl}/search`, criteria);
  }

  // Get all flights
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}`);
  }

  // Get flight by ID
  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/${id}`);
  }

  bookFlight(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/v1.0/flight/booking/${payload.flightId}`,
      payload
    );
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8765/api/bookings/my');
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8765/api/bookings/${bookingId}`
    );
  }

  createFlight(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, payload);
  }
}
