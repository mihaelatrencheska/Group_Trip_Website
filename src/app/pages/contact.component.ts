import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>We're here to help plan your next adventure</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <div class="info-card">
              <div class="info-icon">📧</div>
              <h3>Email Us</h3>
              <p>contact@sourceexpeditions.com</p>
              <p>Response within 24 hours</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri: 9AM-6PM EST</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Madison Avenue</p>
              <p>New York</p>
            </div>
            
            <div class="info-card">
              <div class="info-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Available 24/7 on our website</p>
              <p>Instant support for bookings</p>
            </div>
          </div>

          <div class="contact-form-container">
            <div class="contact-form">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              
              <form (submit)="submitForm($event)">
                <div class="form-group">
                  <input type="text" placeholder="Your Name" [(ngModel)]="formData.name" name="name" required>
                </div>
                
                <div class="form-group">
                  <input type="email" placeholder="Email Address" [(ngModel)]="formData.email" name="email" required>
                </div>
                
                <div class="form-group">
                  <input type="text" placeholder="Phone Number" [(ngModel)]="formData.phone" name="phone">
                </div>
                
                <div class="form-group">
                  <select [(ngModel)]="formData.subject" name="subject" required>
                    <option value="" disabled selected>Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <textarea placeholder="Your Message" rows="6" [(ngModel)]="formData.message" name="message" required></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary" [disabled]="isSubmitting">
                  {{isSubmitting ? 'Sending...' : 'Send Message'}}
                </button>
                
                <div class="form-success" *ngIf="submitSuccess">
                  ✅ Thank you! Your message has been sent. We'll respond within 24 hours.
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item" *ngFor="let faq of faqs; let i = index" 
                 (click)="toggleFaq(i)" [class.active]="activeFaq === i">
              <div class="faq-question">
                {{faq.question}}
                <span class="faq-toggle">{{activeFaq === i ? '−' : '+'}}</span>
              </div>
              <div class="faq-answer" *ngIf="activeFaq === i">
                <p>{{faq.answer}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="map-section">
          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-icon">📍</div>
              <h3>Our Headquarters</h3>
              <p>Madison Avenue, New York</p>
              <p>Open Monday to Friday, 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                  url('https://plus.unsplash.com/premium_photo-1669658981513-03fec264c28e?q=80&w=1464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      color: white;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      background-repeat: no-repeat;
      min-width: 100%;

      .container {
        max-width: 800px;
        margin: 0 auto;
        animation: fadeInUp 1s ease;
      }

      h1 {
        font-size: 3.5rem;
        margin-bottom: 15px;
      }

      p {
        font-size: 1.25rem;
        opacity: 0.9;
      }
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-bottom: 80px;
    }
    
    .contact-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .info-card {
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      .info-icon {
        font-size: 2.5rem;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 1.25rem;
        margin-bottom: 10px;
        color: #1e293b;
      }
      
      p {
        color: #64748b;
        margin: 5px 0;
        font-size: 0.9375rem;
        
        &:first-of-type {
          color: #8b5cf6;
          font-weight: 600;
        }
      }
    }
    
    .contact-form-container {
      .contact-form {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        
        h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #1e293b;
        }
        
        > p {
          color: #64748b;
          margin-bottom: 30px;
        }
      }
    }
    
    .form-group {
      margin-bottom: 20px;
      
      input, select, textarea {
        width: 100%;
        padding: 15px 20px;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        transition: border-color 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: #8b5cf6;
        }
        
        &::placeholder {
          color: #94a3b8;
        }
      }
      
      textarea {
        resize: vertical;
      }
    }
    
    .form-success {
      background: #d1fae5;
      color: #065f46;
      padding: 15px 20px;
      border-radius: 10px;
      margin-top: 20px;
      font-weight: 500;
    }
    
    .faq-section {
      margin-bottom: 80px;
      
      h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 50px;
        color: #1e293b;
      }
    }
    
    .faq-grid {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      background: white;
      border-radius: 15px;
      margin-bottom: 15px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
    }
    
    .faq-question {
      padding: 25px 30px;
      font-weight: 600;
      color: #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.125rem;
      
      .faq-toggle {
        color: #8b5cf6;
        font-size: 1.5rem;
        font-weight: 300;
      }
    }
    
    .faq-answer {
      padding: 0 30px 30px;
      color: #475569;
      line-height: 1.6;
      border-top: 1px solid #e2e8f0;
      animation: slideDown 0.3s ease;
    }
    
    .map-section {
      .map-container {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 20px;
        padding: 60px;
        text-align: center;
      }
      
      .map-placeholder {
        .map-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        
        h3 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #1e293b;
        }
        
        p {
          color: #64748b;
          margin: 5px 0;
        }
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;
        
        h1 {
          font-size: 2.5rem;
        }
      }
      
      .contact-form {
        padding: 30px 20px;
      }
      
      .map-container {
        padding: 40px 20px;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  submitSuccess = false;
  activeFaq: number | null = null;
  
  faqs = [
    {
      question: 'How do I book a trip?',
      answer: 'You can book directly through our website, call our booking line, or visit one of our offices. Online booking is available 24/7.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation policies that vary by package. Most bookings can be cancelled up to 30 days before departure for a full refund.'
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance through our partners. It can be added during booking or purchased separately.'
    },
    {
      question: 'Can I customize my travel package?',
      answer: 'Absolutely! We specialize in customized travel experiences. Contact our travel consultants to create your perfect itinerary.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, bank transfers, and offer payment plans for larger packages.'
    }
  ];
  
  submitForm(event: Event): void {
    event.preventDefault();
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.formData = { name: '', email: '', phone: '', subject: '', message: '' };
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1500);
  }
  
  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}