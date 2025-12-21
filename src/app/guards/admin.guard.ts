import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user?.role === 'ADMIN') return true;

    alert('Access denied');
    return false;
  }
}
