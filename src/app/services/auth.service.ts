import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8765/auth';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      responseType: 'text',
    });
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((response) => {
        // Store JWT token
        localStorage.setItem('jwt_token', response.token);

        // Store user info
        const user: User = {
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Update subject
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    // Clear all stored data
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('currentUser');

    // Update subject
    this.currentUserSubject.next(null);

    // Navigate to login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  changePassword(payload: any) {
    return this.http.post(`${this.baseUrl}/change-password`, payload);
  }
}
