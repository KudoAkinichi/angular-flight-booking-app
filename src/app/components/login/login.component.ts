import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Get return url from route parameters or default to '/search'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/search';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login successful:', response);

        // Navigate to return URL or default to search
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);

        // Handle different error scenarios
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found. Please register first.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      },
    });
  }
}
