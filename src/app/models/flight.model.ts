export interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  fromName: string;
  toName: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  price: number;
}

export interface FlightSearchCriteria {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface BookingRequest {
  flightId: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  numberOfPassengers: number;
}
