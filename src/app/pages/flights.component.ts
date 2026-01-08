import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../services/booking.service';
import { environment } from '../environment';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <div class="page-header hero-image">
 <div class="hero-overlay"></div>
 <div class="container hero-content">
   <h1>Flights</h1>
   <p>Book your next journey with our exclusive deals</p>
 </div>
</div>


    <section class="section">
      <div class="container">
        <div class="flight-search">
          <div class="search-card">
            <h2>Search Flights</h2>
            <div class="search-form">
              <div class="form-group">
                <label>From</label>
                <select [(ngModel)]="searchFrom" name="searchFrom">
                  <option value="">Select City</option>
                  <option *ngFor="let city of cities" [value]="city">{{city}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>To</label>
                <select [(ngModel)]="searchTo" name="searchTo">
                  <option value="">Select City</option>
                  <option *ngFor="let city of cities" [value]="city">{{city}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Departure</label>
                <input type="date" [(ngModel)]="departureDate" [min]="today" name="departureDate">
              </div>
              <div class="form-group">
                <label>Return</label>
                <input type="date" [(ngModel)]="returnDate" [min]="departureDate || today" name="returnDate">
              </div>
              <div class="form-group">
                <label>Passengers</label>
                <select [(ngModel)]="passengers" name="passengers">
                  <option *ngFor="let option of passengerOptions" [value]="option">{{option}}</option>
                </select>
              </div>
              <button class="btn btn-primary" (click)="searchFlights()">Search Flights</button>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div class="search-results" *ngIf="showResults && filteredFlights.length > 0">
          <h2>Available Flights ({{filteredFlights.length}})</h2>
          <div class="flights-list">
            <div class="flight-card" *ngFor="let flight of filteredFlights">
              <div class="flight-header">
                <div class="flight-airline">{{flight.airline}}</div>
                <div class="flight-number">{{flight.flightNumber}}</div>
                <div class="flight-status" [class]="flight.status">{{flight.status}}</div>
              </div>
              
              <div class="flight-route">
                <div class="route-from">
                  <div class="city">{{flight.from}}</div>
                  <div class="time">{{flight.departureTime}}</div>
                  <div class="date">{{flight.departureDate}}</div>
                </div>
                
                <div class="route-info">
                  <div class="duration">⏱️ {{flight.duration}}</div>
                  <div class="stops" *ngIf="flight.stops > 0">✈️ {{flight.stops}} stop(s)</div>
                  <div class="stops" *ngIf="flight.stops === 0">✈️ Direct</div>
                </div>
                
                <div class="route-to">
                  <div class="city">{{flight.to}}</div>
                  <div class="time">{{flight.arrivalTime}}</div>
                  <div class="date">{{flight.arrivalDate}}</div>
                </div>
              </div>
              
              <div class="flight-details">
                <div class="detail">
                  <span class="label">Aircraft:</span>
                  <span class="value">{{flight.aircraft}}</span>
                </div>
                <div class="detail">
                  <span class="label">Seats Left:</span>
                  <span class="value" [class.low]="flight.seatsLeft < 10">{{flight.seatsLeft}}</span>
                </div>
                <div class="detail">
                  <span class="label">Baggage:</span>
                  <span class="value">{{flight.baggage}}</span>
                </div>
              </div>
              
              <div class="flight-price">
                <div class="price-section">
                  <div class="price">{{ flight.price | currency }}</div>
                  <div class="price-note">per passenger</div>
                  <div class="total-price">Total: {{ calculateTotal(flight.price) | currency }}</div>
                </div>
                <button class="btn btn-primary" (click)="bookFlight(flight)" [disabled]="flight.seatsLeft === 0">
                  {{ flight.seatsLeft === 0 ? 'Sold Out' : 'Book Now' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div class="no-results" *ngIf="showResults && filteredFlights.length === 0">
          <div class="no-results-icon">✈️</div>
          <h3>No flights found</h3>
          <p>Try adjusting your search criteria or dates</p>
          <button class="btn btn-secondary" (click)="resetSearch()">Clear Search</button>
        </div>

        <div class="flight-deals">
          <h2>Special Flight Deals</h2>
          <div class="deals-grid">
            <div class="flight-deal" *ngFor="let deal of flightDeals">
              <div class="deal-header">
                <span class="airline">{{deal.airline}}</span>
                <span class="discount">-{{deal.discount}}%</span>
              </div>
              <div class="route">
                <span class="from">{{deal.from}}</span>
                <span class="arrow">→</span>
                <span class="to">{{deal.to}}</span>
              </div>
              <div class="deal-info">
                <div class="duration">⏱️ {{deal.duration}}</div>
                <div class="stops">✈️ {{deal.stops}}</div>
                <div class="class">💺 {{deal.class}}</div>
              </div>
              <div class="price-info">
                <span class="old-price">{{ deal.oldPrice | currency }}</span>
                <span class="new-price">{{ deal.newPrice | currency }}</span>
              </div>
              <div class="savings">Save {{ deal.oldPrice - deal.newPrice | currency }}!</div>
              <button class="btn btn-primary" (click)="bookDeal(deal)">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                  url('https://images.unsplash.com/photo-1568696331348-b166dcf47057?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
    
    .flight-search {
      background: #f8fafc;
      padding: 40px;
      border-radius: 20px;
      margin-bottom: 60px;
    }
    
    .search-card {
      h2 {
        font-size: 2rem;
        margin-bottom: 30px;
        color: #1e293b;
      }
    }
    
    .search-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      align-items: end;
    }
    
    .form-group {
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #475569;
      }
      
      input, select {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: #2563eb;
        }
      }
      
      select {
        cursor: pointer;
        background: white;
      }
    }
    
    .search-results {
      margin-bottom: 60px;
      
      h2 {
        font-size: 2rem;
        margin-bottom: 30px;
        color: #1e293b;
      }
    }
    
    .flights-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .flight-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        border-color: #2563eb;
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);
      }
    }
    
    .flight-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .flight-airline {
      font-weight: 700;
      color: #2563eb;
      font-size: 1.125rem;
    }
    
    .flight-number {
      color: #64748b;
      font-size: 0.875rem;
    }
    
    .flight-status {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      
      &.available {
        background: #d1fae5;
        color: #065f46;
      }
      
      &.limited {
        background: #fef3c7;
        color: #92400e;
      }
      
      &.soldout {
        background: #fee2e2;
        color: #991b1b;
      }
    }
    
    .flight-route {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 10px;
    }
    
    .route-from, .route-to {
      text-align: center;
      flex: 1;
      
      .city {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 5px;
      }
      
      .time {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 5px;
      }
      
      .date {
        color: #64748b;
        font-size: 0.875rem;
      }
    }
    
    .route-info {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      
      .duration {
        color: #1e293b;
        font-weight: 600;
      }
      
      .stops {
        background: #e2e8f0;
        color: #475569;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
    
    .flight-details {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 10px;
    }
    
    .detail {
      text-align: center;
      
      .label {
        display: block;
        color: #64748b;
        font-size: 0.875rem;
        margin-bottom: 5px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .value {
        color: #1e293b;
        font-weight: 600;
        font-size: 1rem;
      }
      
      .value.low {
        color: #ef4444;
      }
    }
    
    .flight-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
    
    .price-section {
      text-align: right;
      
      .price {
        color: #10b981;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
      }
      
      .price-note {
        color: #64748b;
        font-size: 0.875rem;
        margin: 5px 0;
      }
      
      .total-price {
        color: #1e293b;
        font-weight: 600;
        font-size: 1.125rem;
      }
    }
    
    .no-results {
      text-align: center;
      padding: 60px 20px;
      margin-bottom: 60px;
      background: #f8fafc;
      border-radius: 20px;
      
      .no-results-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: #1e293b;
      }
      
      p {
        color: #64748b;
        margin-bottom: 30px;
        font-size: 1.125rem;
      }
    }
    
    .flight-deals {
      h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 40px;
        color: #1e293b;
      }
    }
    
    .deals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .flight-deal {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      
      &:hover {
        transform: translateY(-5px);
        border-color: #2563eb;
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.1);
      }
    }
    
    .deal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      .airline {
        font-weight: 700;
        color: #2563eb;
        font-size: 1.125rem;
      }
      
      .discount {
        background: #fef3c7;
        color: #92400e;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
    
    .route {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-bottom: 20px;
      font-size: 1.125rem;
      font-weight: 600;
      
      .arrow {
        color: #2563eb;
        font-size: 1.5rem;
      }
    }
    
    .deal-info {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 10px;
      font-size: 0.875rem;
      color: #475569;
    }
    
    .price-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-bottom: 10px;
      
      .old-price {
        color: #94a3b8;
        text-decoration: line-through;
        font-size: 1.25rem;
      }
      
      .new-price {
        color: #1e293b;
        font-size: 2.5rem;
        font-weight: 700;
      }
    }
    
    .savings {
      text-align: center;
      color: #10b981;
      font-weight: 600;
      margin-bottom: 20px;
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
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
      
      &:hover {
        background: #e2e8f0;
      }
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;

        h1 {
          font-size: 2.5rem;
        }
      }

      .search-form {
        grid-template-columns: 1fr;
      }

      .flight-route {
        flex-direction: column;
        gap: 20px;
      }

      .flight-details {
        flex-direction: column;
        gap: 15px;
      }

      .flight-price {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }

      .price-section {
        text-align: center;
      }

      .deals-grid {
        grid-template-columns: 1fr;
      }

      .deal-info {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }

      .btn {
        width: 100%;
        padding: 14px 20px;
        font-size: 1rem;
        margin-bottom: 8px;
      }

      .flight-card {
        padding: 20px;
      }
    }
  `]
})
export class FlightsComponent implements OnInit {
  // Search parameters
  searchFrom = '';
  searchTo = '';
  departureDate = '';
  returnDate = '';
  passengers = '1 Passenger';
  
  // Options
  cities = [
    'New York (JFK)', 
    'Los Angeles (LAX)', 
    'Chicago (ORD)', 
    'Miami (MIA)',
    'London (LHR)', 
    'Paris (CDG)', 
    'Tokyo (NRT)', 
    'Dubai (DXB)',
    'Singapore (SIN)', 
    'Sydney (SYD)', 
    'Toronto (YYZ)', 
    'Mexico City (MEX)'
  ];
  
  passengerOptions = ['1 Passenger', '2 Passengers', '3 Passengers', '4 Passengers', '5 Passengers', '6 Passengers'];
  
  // State
  showResults = false;
  today = new Date().toISOString().split('T')[0];
  
  // All available flights
  flights = [
    {
      id: 'FL001',
      airline: 'SkyWings',
      flightNumber: 'SW202',
      from: 'New York (JFK)',
      to: 'London (LHR)',
      departureTime: '10:00',
      arrivalTime: '22:30',
      departureDate: '2024-03-15',
      arrivalDate: '2024-03-15',
      duration: '7h 30m',
      stops: 0,
      price: 600,
      aircraft: 'Boeing 777',
      seatsLeft: 8,
      baggage: '1 x 23kg',
      status: 'available'
    },
    {
      id: 'FL002',
      airline: 'OceanAir',
      flightNumber: 'OA317',
      from: 'Los Angeles (LAX)',
      to: 'Paris (CDG)',
      departureTime: '14:30',
      arrivalTime: '10:45',
      departureDate: '2024-03-18',
      arrivalDate: '2024-03-19',
      duration: '11h 15m',
      stops: 0,
      price: 770,
      aircraft: 'Airbus A350',
      seatsLeft: 15,
      baggage: '2 x 23kg',
      status: 'available'
    },
    {
      id: 'FL003',
      airline: 'GlobalJet',
      flightNumber: 'GJ739',
      from: 'Chicago (ORD)',
      to: 'Tokyo (NRT)',
      departureTime: '21:45',
      arrivalTime: '02:05',
      departureDate: '2024-03-20',
      arrivalDate: '2024-03-21',
      duration: '13h 20m',
      stops: 1,
      price: 1080,
      aircraft: 'Boeing 787',
      seatsLeft: 3,
      baggage: '2 x 23kg',
      status: 'limited'
    },
    {
      id: 'FL004',
      airline: 'Continental',
      flightNumber: 'CT178',
      from: 'Miami (MIA)',
      to: 'Rome (FCO)',
      departureTime: '19:15',
      arrivalTime: '09:45',
      departureDate: '2024-03-22',
      arrivalDate: '2024-03-23',
      duration: '10h 30m',
      stops: 0,
      price: 715,
      aircraft: 'Airbus A330',
      seatsLeft: 0,
      baggage: '1 x 23kg',
      status: 'soldout'
    }
  ];
  
  filteredFlights = [...this.flights];
  
  // Special deals
  flightDeals = [
    {
      id: 'DEAL001',
      airline: 'SkyWings',
      from: 'NYC',
      to: 'LON',
      discount: 50,
      oldPrice: 1200,
      newPrice: 600,
      duration: '7h 30m',
      stops: 'Direct',
      class: 'Economy'
    },
    {
      id: 'DEAL002',
      airline: 'OceanAir',
      from: 'LAX',
      to: 'PAR',
      discount: 45,
      oldPrice: 1400,
      newPrice: 770,
      duration: '11h 15m',
      stops: 'Direct',
      class: 'Premium Economy'
    },
    {
      id: 'DEAL003',
      airline: 'GlobalJet',
      from: 'CHI',
      to: 'TOK',
      discount: 40,
      oldPrice: 1800,
      newPrice: 1080,
      duration: '13h 20m',
      stops: '1 Stop',
      class: 'Business'
    },
    {
      id: 'DEAL004',
      airline: 'Continental',
      from: 'MIA',
      to: 'ROM',
      discount: 35,
      oldPrice: 1100,
      newPrice: 715,
      duration: '10h 30m',
      stops: 'Direct',
      class: 'Economy'
    },
    {
      id: 'DEAL005',
      airline: 'AeroLink',
      from: 'LON',
      to: 'NYC',
      discount: 48,
      oldPrice: 1250,
      newPrice: 650,
      duration: '8h 15m',
      stops: 'Direct',
      class: 'Economy'
    },
    {
      id: 'DEAL006',
      airline: 'Pacific Wings',
      from: 'TOK',
      to: 'LAX',
      discount: 42,
      oldPrice: 1600,
      newPrice: 928,
      duration: '10h 45m',
      stops: 'Direct',
      class: 'Premium Economy'
    }
  ];

  private apiUrl = `${environment.apiUrl}/flights`;

  constructor(private bookingService: BookingService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Initialize with some default search values
    this.searchFrom = 'New York (JFK)';
    this.searchTo = 'London (LHR)';

    // Set default dates (tomorrow and 7 days later)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.departureDate = tomorrow.toISOString().split('T')[0];

    const nextWeek = new Date(tomorrow);
    nextWeek.setDate(nextWeek.getDate() + 7);
    this.returnDate = nextWeek.toISOString().split('T')[0];

    // Load flights from API
    this.loadFlights();
  }

  loadFlights() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (flights) => {
        this.flights = flights;
        this.filteredFlights = [...this.flights];
      },
      error: (error) => {
        console.error('Error loading flights:', error);
        // Fallback to empty array if API fails
        this.flights = [];
        this.filteredFlights = [];
      }
    });
  }

  searchFlights() {
    this.showResults = true;

    // Filter flights based on search criteria
    this.filteredFlights = this.flights.filter(flight => {
      // Match origin and destination
      const matchesFrom = !this.searchFrom || flight.from.includes(this.searchFrom.split(' ')[0]);
      const matchesTo = !this.searchTo || flight.to.includes(this.searchTo.split(' ')[0]);

      // For demo, ignore date filter to show results
      return matchesFrom && matchesTo;
    });

    // If no matches, just show empty results
    // No mock data generation

    // Sort by price (lowest first)
    this.filteredFlights.sort((a, b) => a.price - b.price);

    console.log('Search results:', this.filteredFlights.length, 'flights found');
  }

  calculateTotal(price: number): number {
    // Extract number of passengers from string (e.g., "2 Passengers" -> 2)
    const passengerCount = parseInt(this.passengers) || 1;
    return price * passengerCount;
  }

  resetSearch() {
    this.searchFrom = '';
    this.searchTo = '';
    this.departureDate = '';
    this.returnDate = '';
    this.passengers = '1 Passenger';
    this.showResults = false;
    this.filteredFlights = [...this.flights];
  }

  bookFlight(flight: any) {
    if (flight.seatsLeft === 0) {
      alert('Sorry, this flight is sold out!');
      return;
    }

    // Prepare booking details
    const bookingDetails = {
      ...flight,
      passengers: this.passengers,
      totalPrice: this.calculateTotal(flight.price),
      type: 'flight',
      title: `${flight.airline} Flight ${flight.flightNumber}`
    };

    // Navigate to booking page with flight details
    this.router.navigate(['/booking'], {
      state: { bookingData: bookingDetails }
    });
  }

  bookDeal(deal: any) {
    // Create flight-like object from deal
    const flightDetails = {
      airline: deal.airline,
      flightNumber: 'DEAL-' + deal.id,
      from: deal.from,
      to: deal.to,
      departureTime: '10:00', // Default time for deals
      arrivalTime: '22:30', // Default time for deals
      duration: deal.duration,
      stops: deal.stops === 'Direct' ? 0 : parseInt(deal.stops) || 1,
      price: deal.newPrice,
      class: deal.class,
      passengers: this.passengers,
      totalPrice: this.calculateTotal(deal.newPrice),
      type: 'flight',
      title: `${deal.airline} Deal: ${deal.from} to ${deal.to}`
    };

    // Navigate to booking page with deal details
    this.router.navigate(['/booking'], {
      state: { bookingData: flightDetails }
    });
  }
}
