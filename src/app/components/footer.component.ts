import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          
          <!-- Logo and Description -->
          <div class="footer-section about">
            <div class="footer-logo">
              <span class="logo-icon">✈️</span>
              <h3>Source Expeditions</h3>
            </div>
            <p class="description">
              Making group travel seamless, affordable, and unforgettable since 2025.
              Explore the world with friends and family through our curated experiences.
            </p>

          

            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>Madison Avenue, New York</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>contact@sourceexpeditions.com</span>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section links">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a routerLink="/" class="footer-link">🏠 Home</a></li>
              <li><a routerLink="/flights" class="footer-link">✈️ Flights</a></li>
              <li><a routerLink="/destinations" class="footer-link">🗺️ Destinations</a></li>
              <li><a routerLink="/tours" class="footer-link">🎯 Tours</a></li>
              <li><a routerLink="/deals" class="footer-link">🔥 Hot Deals</a></li>
              <li><a routerLink="/about" class="footer-link">ℹ️ About Us</a></li>
              <li><a routerLink="/contact" class="footer-link">📞 Contact</a></li>
            </ul>
          </div>

          <!-- Popular Destinations -->
          <div class="footer-section destinations">
            <h4>Popular Destinations</h4>
            <ul class="destination-links">
              <li><a [routerLink]="['/destinations', 'asia']" class="destination-link">🇯🇵 Asia Tour</a></li>
              <li><a [routerLink]="['/destinations', 'europe']" class="destination-link">🇪🇺 Europe Grand Tour</a></li>
              <li><a [routerLink]="['/destinations', 'america']" class="destination-link">🇺🇸 America Adventure</a></li>
              <li><a [routerLink]="['/destinations', 'spain-party']" class="destination-link">🇪🇸 Spain Party Gateway</a></li>
              <li><a [routerLink]="['/destinations', 'bali']" class="destination-link">🌴 Bali Retreat</a></li>
              <li><a [routerLink]="['/destinations', 'caribbean']" class="destination-link">🏝️ Caribbean Cruise</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer-section newsletter">
            <h4>Stay Updated</h4>
            <p class="newsletter-text">
              Subscribe to our newsletter for exclusive deals, travel tips, and destination inspiration.
            </p>
            
            <form class="newsletter-form" (ngSubmit)="subscribe()" #newsletterForm="ngForm">
              <div class="form-group">
                <input 
                  type="email" 
                  [(ngModel)]="email" 
                  name="email"
                  placeholder="Enter your email address"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  class="newsletter-input"
                  #emailInput="ngModel"
                >
                <div *ngIf="emailInput.invalid && emailInput.touched && !subscriptionMessage" class="error-message">
                  Please enter a valid email address
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-newsletter"
                [disabled]="!emailInput.valid || isSubmitting"
              >
                <span *ngIf="!isSubmitting">Subscribe</span>
                <span *ngIf="isSubmitting" class="loading">Subscribing...</span>
              </button>
            </form>

            <div class="subscription-message" *ngIf="subscriptionMessage" [class.success]="isSuccess" [class.error]="!isSuccess">
              {{subscriptionMessage}}
            </div>
          </div>

        </div>


        <!-- Back to Top -->
        <div class="back-to-top" (click)="scrollToTop()">
          <span class="arrow-icon">↑</span>
          <span class="back-text">Back to Top</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #cbd5e1;
      padding: 60px 0 30px;
      margin-top: auto;
      position: relative;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b, #ef4444);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 30px;
    }

    .footer-section h4 {
      color: #f8fafc;
      font-size: 1.125rem;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
    }

    .footer-section h4::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #10b981);
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .logo-icon {
      font-size: 2rem;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .footer-logo h3 {
      color: #f8fafc;
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .description {
      line-height: 1.6;
      margin-bottom: 25px;
      color: #94a3b8;
    }

    .stats-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      margin-bottom: 25px;
      flex-wrap: wrap;
    }

    .stats-row span {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #cbd5e1;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #cbd5e1;
    }

    .contact-icon {
      font-size: 1.125rem;
      width: 20px;
      text-align: center;
    }

    .footer-links,
    .destination-links {
      list-style: none;
      padding: 0;
    }

    .footer-links li,
    .destination-links li {
      margin-bottom: 12px;
    }

    .destination-links {
      text-align: left;
    }

    .footer-link,
    .destination-link {
      color: #cbd5e1;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      padding: 5px 0;
    }

    .footer-link:hover,
    .destination-link:hover {
      color: #3b82f6;
      transform: translateX(5px);
    }

    .newsletter-text {
      color: #94a3b8;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .newsletter-form {
      margin-bottom: 25px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .newsletter-input {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #475569;
      border-radius: 8px;
      color: #f8fafc;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .newsletter-input:focus {
      outline: none;
      border-color: #3b82f6;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .newsletter-input::placeholder {
      color: #64748b;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 5px;
    }

    .btn-newsletter {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-newsletter:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
    }

    .btn-newsletter:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .subscription-message {
      padding: 10px;
      border-radius: 8px;
      font-size: 0.875rem;
      margin-top: 10px;
      animation: fadeIn 0.3s ease;
    }

    .subscription-message.success {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .subscription-message.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }



    .back-to-top {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .back-to-top:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: translateY(-2px);
    }

    .arrow-icon {
      font-size: 1rem;
    }

    .current-year {
      color: #3b82f6;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .back-to-top {
        position: relative;
        right: auto;
        bottom: auto;
        margin-top: 20px;
        align-self: center;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 40px 0 20px;
      }

      .social-icons {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  email = '';
  subscriptionMessage = '';
  isSuccess = false;
  isSubmitting = false;
  currentYear = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  subscribe() {
    if (!this.email) {
      this.showMessage('Please enter your email address', false);
      return;
    }

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.showMessage('Please enter a valid email address', false);
      return;
    }

    this.isSubmitting = true;

    const subscriptionData = {
      email: this.email,
      date: new Date().toISOString()
    };

    this.http.post(this.apiUrl, subscriptionData).subscribe({
      next: () => {
        this.showMessage(`You've subscribed successfully!`, true);
        this.email = '';
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Subscription error:', error);
        this.showMessage('Something went wrong. Please try again later.', false);
        this.isSubmitting = false;
      }
    });
  }

  private showMessage(message: string, success: boolean) {
    this.subscriptionMessage = message;
    this.isSuccess = success;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      this.subscriptionMessage = '';
    }, 5000);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}