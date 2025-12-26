import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ADD THIS IMPORT

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, RouterModule], // ADD RouterModule HERE
  template: `
    <section class="section">
      <div class="container">

        <div class="exclusive-deals">
          <h2>Exclusive Add-On Deals</h2>
          <p>Limited time offers for smart travelers</p>
          <div class="deals-grid">
            <div class="deal-card featured" *ngFor="let deal of exclusiveDeals">
              <div class="deal-image">
                <img [src]="deal.image" [alt]="deal.title">
              </div>
              <div class="deal-content">
                <h3>{{deal.title}}</h3>
                <p class="location">📍 {{deal.location}}</p>
                <p class="description">{{deal.description}}</p>
                <button [routerLink]="['/destinations', deal.id]" class="btn btn-primary">{{deal.buttonText}}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="featured-deals">
          <h2>Featured Deals</h2>
          <div class="deals-grid">
            <div class="deal-card featured" *ngFor="let deal of mainPageDeals">
              <div class="deal-header">
                <span class="discount-badge">-{{deal.discount}}%</span>
                <span class="deal-tag">{{deal.tag}}</span>
              </div>
              <div class="deal-image">
                <img [src]="deal.image" [alt]="deal.title">
              </div>
              <div class="deal-content">
                <h3>{{deal.title}}</h3>
                <p class="location">📍 {{deal.location}}</p>
                <p class="description">{{deal.description}}</p>

                <div class="deal-details">
                  <div class="detail">
                    <span class="icon">⏱️</span>
                    <span>{{deal.duration}} days</span>
                  </div>
                  <div class="detail">
                    <span class="icon">👥</span>
                    <span>{{deal.groupSize}} people</span>
                  </div>
                </div>

                <div class="price-section">
                  <div class="old-price">$ {{deal.originalPrice}}</div>
                  <div class="new-price">$ {{deal.discountedPrice}}</div>
                  <div class="savings">Save $ {{deal.savings}}</div>
                </div>
                <button [routerLink]="['/destinations', deal.id]" class="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .page-header h1 {
      font-size: 3.5rem;
      margin-bottom: 15px;
    }

    .page-header p {
      font-size: 1.25rem;
      opacity: 0.9;
    }
    
    .deals-banner {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: white;
      padding: 60px;
      border-radius: 30px;
      margin-bottom: 80px;
      text-align: center;
    }

    .banner-badge {
      display: inline-block;
      background: #fbbf24;
      color: #92400e;
      padding: 8px 24px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.875rem;
      margin-bottom: 20px;
    }

    .banner-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .banner-content h2 {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .banner-content p {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .countdown {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .countdown-item {
      text-align: center;
    }

    .countdown-item .number {
      display: block;
      font-size: 3rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 15px;
      min-width: 100px;
      margin-bottom: 10px;
    }

    .countdown-item .label {
      font-size: 0.875rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .deals-categories {
      margin-bottom: 80px;
    }

    .deals-categories h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 50px;
      color: #1e293b;
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .category-card {
      background: #3b82f6;
      color: white;
      padding: 40px 30px;
      border-radius: 20px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-10px);
    }
    
    .category-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    
    .category-card h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    
    .category-card p {
      opacity: 0.9;
      margin-bottom: 25px;
    }
    
    .exclusive-deals {
      margin-bottom: 80px;
    }

    .exclusive-deals h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 10px;
      color: #1e293b;
    }

    .exclusive-deals p {
      font-size: 1.25rem;
      text-align: center;
      margin-bottom: 50px;
      color: #64748b;
    }

    .featured-deals {
      margin-bottom: 80px;
    }

    .featured-deals h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 50px;
      color: #1e293b;
    }
    
    .deals-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    
    .deal-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      position: relative;
      min-height: 400px;
      display: flex;
      flex-direction: column;
    }

    .deal-card.featured {
      border: 3px solid #fbbf24;
    }
    
    .deal-header {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      z-index: 1;
    }
    
    .discount-badge {
      background: #ef4444;
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 1.125rem;
    }
    
    .deal-tag {
      background: rgba(255, 255, 255, 0.9);
      color: #1e293b;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .deal-image {
      height: 200px;
      overflow: hidden;
    }

    .deal-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .deal-content {
      padding: 30px;
    }

    .deal-content h3 {
      font-size: 1.5rem;
      margin-bottom: 8px;
      color: #1e293b;
    }

    .deal-content .location {
      color: #64748b;
      margin-bottom: 15px;
      font-size: 0.875rem;
    }

    .deal-content .description {
      color: #475569;
      line-height: 1.6;
      margin-bottom: 25px;
    }
    
    .deal-details {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
      padding: 20px 0;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }

    .deal-details .detail {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      font-size: 0.875rem;
    }

    .deal-details .detail .icon {
      font-size: 1rem;
    }
    
    .price-section {
      margin-bottom: 25px;
    }

    .price-section .old-price {
      color: #94a3b8;
      text-decoration: line-through;
      font-size: 1.125rem;
    }

    .price-section .new-price {
      color: #1e293b;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1;
    }

    .price-section .savings {
      color: #ef4444;
      font-weight: 600;
    }
    
    .newsletter-section {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 80px 40px;
      border-radius: 30px;
      text-align: center;
    }
    
    .newsletter-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .newsletter-content h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .newsletter-content p {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .newsletter-form {
      display: flex;
      gap: 10px;
      max-width: 500px;
      margin: 0 auto;
    }

    .newsletter-form input {
      flex: 1;
      padding: 18px 24px;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
    }

    .newsletter-form input:focus {
      outline: none;
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;
      }

      .page-header h1 {
        font-size: 2.5rem;
      }

      .deals-banner {
        padding: 40px 20px;
      }

      .banner-content h2 {
        font-size: 2.5rem;
      }

      .countdown {
        gap: 15px;
      }

      .countdown-item .number {
        font-size: 2rem;
        min-width: 80px;
        padding: 15px;
      }

      .categories-grid,
      .deals-grid {
        grid-template-columns: 1fr;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        padding: 14px 20px;
        font-size: 1rem;
        margin-bottom: 8px;
      }

      .deal-content {
        padding: 20px;
      }

      .category-card {
        padding: 30px 20px;
      }
    }
  `]
})
export class DealsComponent {
  hours = '48';
  minutes = '15';
  seconds = '30';
  
  categories = [
    { 
      icon: '✈️', 
      title: 'Flight Deals', 
      count: 45, 
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      route: 'flights'  // ADD THIS
    },
    { 
      icon: '🏨', 
      title: 'Hotel Packages', 
      count: 32, 
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      route: 'destinations'  // ADD THIS
    },
    { 
      icon: '🚗', 
      title: 'Car Rentals', 
      count: 18, 
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      route: 'tours'  // ADD THIS
    },
    { 
      icon: '🏝️', 
      title: 'All-Inclusive', 
      count: 27, 
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      route: 'deals'  // ADD THIS
    }
  ];
  
  exclusiveDeals = [
    {
      id: 'malaga',
      title: 'Barcelona Grand Prix Plus',
      location: 'Malaga, Spain',
      image: 'https://images.unsplash.com/photo-1519589863-f02030e7127e?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Get 30% off Grand Prix tickets when you book the Malaga trip. Experience the thrill of Formula 1 racing!',
      buttonText: 'Book Malaga Trip'
    },
    {
      id: 'sydney',
      title: 'Sydney Adventure Package',
      location: 'Sydney, Australia',
      image: 'https://plus.unsplash.com/premium_photo-1720568151853-64f14825daac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Free bungee jumping included when you book the Sydney trip. Conquer your fears with this ultimate adrenaline rush!',
      buttonText: 'Book Sydney Trip'
    },
    {
      id: 'nice',
      title: 'Nice Culinary Experience',
      location: 'Nice, France',
      image: 'https://images.unsplash.com/photo-1669722115140-d314341ab05d?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '20% off Michelin dinner at a famous restaurant when you book the Nice trip. Indulge in world-class French cuisine!',
      buttonText: 'Book Nice Trip'
    }
  ];

  mainPageDeals = [
    {
      id: 'bali',
      discount: 55,
      tag: 'Early Bird',
      title: 'Bali Paradise Getaway',
      location: 'Bali, Indonesia',
      duration: 7,
      groupSize: 2,
      originalPrice: 3599,
      discountedPrice: 1619,
      savings: 1980,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      description: 'Luxury resort stay with flights included. Experience tropical paradise with world-class amenities.'
    },
    {
      id: 'spain-party',
      discount: 45,
      tag: 'Party Deal',
      title: 'Spanish Party Gateway',
      location: 'Barcelona & Madrid, Spain',
      duration: 6,
      groupSize: 18,
      originalPrice: 3299,
      discountedPrice: 1814,
      savings: 1485,
      image: 'https://images.unsplash.com/photo-1571984405176-5958bd9ac31d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '6-day Spanish party extravaganza from Barcelona to Madrid with premium nightlife experiences.'
    },
    {
      id: 'caribbean',
      discount: 50,
      tag: 'Cruise Deal',
      title: 'Caribbean Cruise Adventure',
      location: 'Multiple Caribbean Islands',
      duration: 10,
      groupSize: 2,
      originalPrice: 1999,
      discountedPrice: 999,
      savings: 1000,
      image: 'https://plus.unsplash.com/premium_photo-1697730545957-fbfe258301a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Luxury cruise through Bahamas, Jamaica & Grand Cayman with all-inclusive amenities.'
    }
  ];
}