import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Curated Tours</h1>
        <p>Experience the world with expert-guided adventures</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="tour-filters">
          <div class="filter-group">
            <label>Tour Type</label>
            <select [(ngModel)]="selectedType" (change)="filterTours()">
              <option value="">All Types</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="food">Food & Wine</option>
              <option value="wellness">Wellness</option>
              <option value="family">Family</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Duration</label>
            <select [(ngModel)]="selectedDuration" (change)="filterTours()">
              <option value="">Any Duration</option>
              <option value="1-3">1-3 days</option>
              <option value="4-7">4-7 days</option>
              <option value="8-14">8-14 days</option>
              <option value="15+">15+ days</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Price Range</label>
            <select [(ngModel)]="selectedPrice" (change)="filterTours()">
              <option value="">Any Price</option>
              <option value="0-1000">Under $1,000</option>
              <option value="1001-3000">$1,000 - $3,000</option>
              <option value="3001-5000">$3,000 - $5,000</option>
              <option value="5001+">$5,000+</option>
            </select>
          </div>
          
          <button class="btn btn-secondary" (click)="clearFilters()">Clear Filters</button>
        </div>

        <div class="tours-grid">
          <div class="tour-card" *ngFor="let tour of filteredTours">
            <div class="tour-image">
              <img [src]="tour.image" [alt]="tour.title">
              <div class="tour-badge" [class]="tour.type">{{tour.type}}</div>
              <div class="duration">{{tour.duration}} days</div>
            </div>
            
            <div class="tour-content">
              <h3>{{tour.title}}</h3>
              <p class="location">📍 {{tour.location}}</p>
              <p class="description">{{tour.description}}</p>
              
              <div class="tour-details">
                <div class="detail">
                  <span class="icon">👥</span>
                  <span>Max {{tour.groupSize}}</span>
                </div>
                <div class="detail">
                  <span class="icon">⭐</span>
                  <span>{{tour.rating}}</span>
                </div>
                <div class="detail">
                  <span class="icon">🛏️</span>
                  <span>{{tour.accommodation}}</span>
                </div>
              </div>
              
              <div class="tour-footer">
                <div class="price">
                  <span class="from">From</span>
                  <span class="amount">$ {{tour.price}}</span>
                  <span class="per-person">per person</span>
                </div>
                <button class="btn"
                        [class.btn-primary]="!tour.isPremium && !tour.isComingSoon"
                        [class.btn-danger]="tour.isPremium"
                        [class.btn-secondary]="tour.isComingSoon"
                        (click)="handleButtonClick(tour)">
                  {{tour.id === 3 || tour.id === 6 ? 'Coming Soon' : tour.isPremium ? 'Premium Users' : 'Book Tour'}}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="no-results" *ngIf="filteredTours.length === 0">
          <p>No tours found matching your criteria. Try different filters.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                   url('https://images.unsplash.com/photo-1606820854416-439b3305ff39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
    
    .tour-filters {
      background: #f8fafc;
      padding: 30px;
      border-radius: 20px;
      margin-bottom: 50px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: flex-end;
    }
    
    .filter-group {
      flex: 1;
      min-width: 200px;
      
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #475569;
      }
      
      select {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        background: white;
        cursor: pointer;
        transition: border-color 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: #8b5cf6;
        }
      }
    }
    
    .tours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .tour-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      min-height: 500px;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }
    }
    
    .tour-image {
      height: 250px;
      position: relative;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .tour-badge {
        position: absolute;
        top: 20px;
        left: 20px;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
        color: white;
        
        &.adventure { background: #10b981; }
        &.cultural { background: #8b5cf6; }
        &.food { background: #f59e0b; }
        &.wellness { background: #3b82f6; }
        &.family { background: #ec4899; }
      }
      
      .duration {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: 600;
      }
    }
    
    .tour-content {
      padding: 25px;
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 8px;
        color: #1e293b;
      }
      
      .location {
        color: #64748b;
        margin-bottom: 15px;
        font-size: 0.875rem;
      }
      
      .description {
        color: #475569;
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 0.9375rem;
      }
    }
    
    .tour-details {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
      padding: 20px 0;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      
      .detail {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.875rem;
        color: #64748b;
        
        .icon {
          font-size: 1rem;
        }
      }
    }
    
    .tour-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .price {
        .from {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
        }
        
        .amount {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
        }
        
        .per-person {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
        }
      }
    }
    
    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
      font-size: 1.125rem;
    }

    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      font-size: 1rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
      }
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
      }
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;
        
        h1 {
          font-size: 2.5rem;
        }
      }
      
      .tour-filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .tours-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ToursComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/tours`;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (tours) => {
        this.tours = tours;
        this.filteredTours = [...this.tours];
      },
      error: (error) => {
        console.error('Error loading tours:', error);
        // Fallback to empty array if API fails
        this.tours = [];
        this.filteredTours = [];
      }
    });
  }

  tours: any[] = [];
  
  filteredTours = [...this.tours];
  selectedType = '';
  selectedDuration = '';
  selectedPrice = '';
  
  filterTours(): void {
    this.filteredTours = this.tours.filter(tour => {
      // Type filter
      if (this.selectedType && tour.type !== this.selectedType) return false;
      
      // Duration filter
      if (this.selectedDuration) {
        const [min, max] = this.selectedDuration.split('-').map(Number);
        if (this.selectedDuration.endsWith('+')) {
          if (tour.duration < 15) return false;
        } else if (tour.duration < min || tour.duration > max) {
          return false;
        }
      }
      
      // Price filter
      if (this.selectedPrice) {
        const [min, max] = this.selectedPrice.split('-').map(Number);
        if (this.selectedPrice.endsWith('+')) {
          if (tour.price < 5001) return false;
        } else if (tour.price < min || tour.price > max) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  clearFilters(): void {
    this.selectedType = '';
    this.selectedDuration = '';
    this.selectedPrice = '';
    this.filterTours();
  }

  getButtonText(tour: any): string {
    if (tour.isPremium) return 'Premium Users';
    if (tour.isComingSoon) return 'Coming Soon';
    return 'Book Tour';
  }

  handleButtonClick(tour: any): void {
    if (tour.isPremium) {
      this.showPremiumMessage();
    } else if (tour.isComingSoon) {
      this.showComingSoonMessage();
    } else {
      this.bookTour(tour);
    }
  }

  showPremiumMessage(): void {
    alert("You're not a premium user");
  }

  showComingSoonMessage(): void {
    alert("We are currently in the process of making the tour");
  }

  bookTour(tour: any): void {
    if (tour.id === 'morocco' || tour.id === 'himalayan') {
      this.router.navigate(['/destinations', tour.id]);
    } else {
      const bookingDetails = {
        ...tour,
        type: 'tour',
        title: tour.title
      };

      this.router.navigate(['/booking'], {
        state: { bookingData: bookingDetails }
      });
    }
  }
}