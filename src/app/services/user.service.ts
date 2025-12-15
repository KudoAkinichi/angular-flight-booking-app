import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): boolean {
    const users = this.getUsers();

    // Check if user already exists
    if (users.find((u) => u.email === user.email)) {
      return false;
    }

    user.id = Date.now();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
}
