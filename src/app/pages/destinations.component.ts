import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Destinations</h1>
        <p>Explore the world's most beautiful places</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="cities-grid">
          <div class="city-card" *ngFor="let city of cities">
            <img [src]="city.image" [alt]="city.name">
            <div class="city-info">
              <h3>{{city.name}}</h3>
              <button class="btn btn-primary" [routerLink]="['/destinations', city.id]">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                   url('https://images.unsplash.com/photo-1752884991178-c767ae83fb6b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
    
    .continents {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 80px;
    }
    
    .continent-card {
      height: 400px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      background-size: cover;
      background-position: center;
      transition: transform 0.5s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
    
    .continent-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
      padding: 40px;
      
      h2 {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }
      
      p {
        margin-bottom: 20px;
        opacity: 0.9;
      }
    }
    
    .popular-destinations {
      h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 50px;
        color: #1e293b;
      }
    }
    
    .cities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .city-card {
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-10px);
      }
      
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
    
    .city-info {
      padding: 20px;
      
      h3 {
        font-size: 1.25rem;
        margin-bottom: 5px;
        color: #1e293b;
      }
      
      p {
        color: #64748b;
        margin-bottom: 10px;
      }
      
      .price {
        color: #10b981;
        font-weight: 700;
        font-size: 1.125rem;
      }
    }
    
    @media (max-width: 768px) {
      .continents {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DestinationsComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/destinations`;

  cities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (destinations) => {
        this.cities = destinations;
      },
      error: (error) => {
        console.error('Error loading destinations:', error);
        // Fallback to empty array if API fails
        this.cities = [];
      }
    });
  }
}