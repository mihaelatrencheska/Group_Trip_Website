import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Sign In</h1>
        <p>Welcome back! Please sign in to your account</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="signin-container">
          <div class="signin-form">
            <h2>Sign In</h2>
            <form (submit)="onSubmit($event)">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" [(ngModel)]="formData.name" name="name" required>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" [(ngModel)]="formData.email" name="email" required>
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="isSubmitting">
                {{isSubmitting ? 'Signing In...' : 'Sign In'}}
              </button>
            </form>

            <div class="signin-success" *ngIf="submitSuccess">
              ✅ Welcome back! You have successfully signed in.
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                  url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      color: white;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      min-width: 100%;

      h1 {
        font-size: 3.5rem;
        margin-bottom: 15px;
      }

      p {
        font-size: 1.25rem;
        opacity: 0.9;
      }
    }

    .signin-container {
      max-width: 500px;
      margin: 0 auto;
    }

    .signin-form {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 2rem;
        margin-bottom: 30px;
        color: #1e293b;
        text-align: center;
      }
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #475569;
      }

      input {
        width: 100%;
        padding: 15px 20px;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #3b82f6;
        }
      }
    }

    .signin-success {
      background: #d1fae5;
      color: #065f46;
      padding: 15px 20px;
      border-radius: 10px;
      margin-top: 20px;
      font-weight: 500;
      text-align: center;
    }

    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;

        h1 {
          font-size: 2.5rem;
        }
      }

      .signin-form {
        padding: 30px 20px;
      }
    }
  `]
})
export class SigninComponent {
  formData = {
    name: '',
    email: ''
  };

  isSubmitting = false;
  submitSuccess = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitting = true;

    this.authService.signIn(this.formData).subscribe({
      next: (user) => {
        this.isSubmitting = false;
        this.submitSuccess = true;

        // Redirect to home after successful sign in
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Sign in error:', error);
        // Handle error, perhaps show message
      }
    });
  }
}