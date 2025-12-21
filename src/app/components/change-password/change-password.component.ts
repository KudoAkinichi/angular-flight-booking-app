import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-change-password',
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';

  constructor(private authService: AuthService) {}

  changePassword() {
    this.authService
      .changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
      .subscribe(() => alert('Password updated'));
  }
}
