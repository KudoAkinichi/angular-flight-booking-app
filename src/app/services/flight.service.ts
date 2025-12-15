import { Injectable } from '@angular/core';
import { Flight, FlightSearchCriteria } from '../models/flight.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private mockFlights: Flight[] = [
    {
      id: 1,
      airline: 'Air India',
      from: 'DEL',
      to: 'BOM',
      fromName: 'New Delhi',
      toName: 'Mumbai',
      departTime: '06:00',
      arriveTime: '08:30',
      duration: '2h 30m',
      price: 4500,
    },
    {
      id: 2,
      airline: 'IndiGo',
      from: 'DEL',
      to: 'BOM',
      fromName: 'New Delhi',
      toName: 'Mumbai',
      departTime: '09:15',
      arriveTime: '11:45',
      duration: '2h 30m',
      price: 3800,
    },
    {
      id: 3,
      airline: 'Vistara',
      from: 'DEL',
      to: 'BOM',
      fromName: 'New Delhi',
      toName: 'Mumbai',
      departTime: '14:30',
      arriveTime: '17:00',
      duration: '2h 30m',
      price: 5200,
    },
    {
      id: 4,
      airline: 'SpiceJet',
      from: 'BOM',
      to: 'BLR',
      fromName: 'Mumbai',
      toName: 'Bangalore',
      departTime: '07:00',
      arriveTime: '09:15',
      duration: '2h 15m',
      price: 3200,
    },
    {
      id: 5,
      airline: 'Air India',
      from: 'BOM',
      to: 'BLR',
      fromName: 'Mumbai',
      toName: 'Bangalore',
      departTime: '11:30',
      arriveTime: '13:45',
      duration: '2h 15m',
      price: 4100,
    },
    {
      id: 6,
      airline: 'IndiGo',
      from: 'BLR',
      to: 'HYD',
      fromName: 'Bangalore',
      toName: 'Hyderabad',
      departTime: '08:00',
      arriveTime: '09:15',
      duration: '1h 15m',
      price: 2800,
    },
    {
      id: 7,
      airline: 'Vistara',
      from: 'DEL',
      to: 'BLR',
      fromName: 'New Delhi',
      toName: 'Bangalore',
      departTime: '10:00',
      arriveTime: '13:00',
      duration: '3h',
      price: 5500,
    },
    {
      id: 8,
      airline: 'SpiceJet',
      from: 'HYD',
      to: 'CCU',
      fromName: 'Hyderabad',
      toName: 'Kolkata',
      departTime: '06:30',
      arriveTime: '09:00',
      duration: '2h 30m',
      price: 4200,
    },
    {
      id: 9,
      airline: 'Air India',
      from: 'CCU',
      to: 'DEL',
      fromName: 'Kolkata',
      toName: 'New Delhi',
      departTime: '10:00',
      arriveTime: '12:45',
      duration: '2h 45m',
      price: 4800,
    },
    {
      id: 10,
      airline: 'IndiGo',
      from: 'MAA',
      to: 'BOM',
      fromName: 'Chennai',
      toName: 'Mumbai',
      departTime: '15:00',
      arriveTime: '17:30',
      duration: '2h 30m',
      price: 3900,
    },
  ];

  searchFlights(criteria: FlightSearchCriteria): Observable<Flight[]> {
    const results = this.mockFlights.filter(
      (flight) => flight.from === criteria.from && flight.to === criteria.to
    );
    return of(results);
  }

  getFlightById(id: number): Flight | undefined {
    return this.mockFlights.find((f) => f.id === id);
  }
}
