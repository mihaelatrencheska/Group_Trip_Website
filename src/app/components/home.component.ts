import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  destinations = [
    {
      id: 'asia',
      name: 'Asia',
      image: 'https://images.unsplash.com/photo-1596879857570-7b6b9018bcb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Discover ancient cultures, modern cities, and stunning landscapes across Asia.',
      flights: 120,
      hotels: 450
    },
    {
      id: 'america',
      name: 'America',
      image: 'https://plus.unsplash.com/premium_photo-1673266633864-4cfdcf42eb9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'From New York skyscrapers to California beaches, explore the American dream.',
      flights: 200,
      hotels: 600
    },
    {
      id: 'europe',
      name: 'Europe',
      image: 'https://plus.unsplash.com/premium_photo-1664304213690-fe9146e3e36e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Experience history, art, and cuisine across European capitals and countryside.',
      flights: 180,
      hotels: 550
    }
  ];
  
  deals = [
    {
      id: '1',
      title: 'Bali Paradise Getaway',
      discount: 40,
      image: 'https://plus.unsplash.com/premium_photo-1738099065828-eb8363a6b654?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '7-day luxury resort stay with flights included',
      oldPrice: 2999,
      newPrice: 1799
    },
    {
      id: '2',
      title: 'Spanish Party Gateway',
      discount: 35,
      image: 'https://images.unsplash.com/photo-1578990628400-94f031afbe3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '12-day Spanish party extravaganza in Barcelona and Ibiza',
      oldPrice: 4299,
      newPrice: 2794
    },
    {
      id: '3',
      title: 'Caribbean Cruise',
      discount: 30,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      description: 'All-inclusive 10-day Caribbean cruise',
      oldPrice: 3599,
      newPrice: 2519
    }
  ];

  email = '';
  subscriptionMessage = '';
  isSuccess = false;
  isSubmitting = false;

  getDestinationId(dealId: string): string {
    const mapping: { [key: string]: string } = {
      '1': 'bali',
      '2': 'spain-party',
      '3': 'caribbean'
    };
    return mapping[dealId] || 'asia'; // default to asia if not found
  }

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

    // Simulate API call
    setTimeout(() => {
      // In a real application, you would make an HTTP request here
      const success = Math.random() > 0.1; // 90% success rate for demo

      if (success) {
        this.showMessage(`You've subscribed successfully!`, true);
        this.email = '';

        // Store subscription in localStorage (optional)
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        subscriptions.push({
          email: this.email,
          date: new Date().toISOString()
        });
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
      } else {
        this.showMessage('Something went wrong. Please try again later.', false);
      }

      this.isSubmitting = false;
    }, 1500);
  }

  private showMessage(message: string, success: boolean) {
    this.subscriptionMessage = message;
    this.isSuccess = success;

    // Clear message after 5 seconds
    setTimeout(() => {
      this.subscriptionMessage = '';
    }, 5000);
  }
}