import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  Booking,
  BookingStatus,
  PaymentStatus,
  Service,
  TimeSlot,
  CreateBookingDTO,
  UpdateBookingDTO,
  BookingFilter
} from '../models/booking.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;
  private servicesUrl = `${environment.apiUrl}/services`;

  // Using signals for reactive state management
  private bookingsSignal = signal<Booking[]>([]);
  private servicesSignal = signal<Service[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Public signals for components to use
  readonly bookings = this.bookingsSignal.asReadonly();
  readonly services = this.servicesSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Local storage for demo purposes (remove for production)
  private localStorageKey = 'booking_demo_data';

  constructor(private http: HttpClient) {
    // For demo: Initialize with mock data if no API available
    this.initializeDemoData();
  }

  /**
   * Get all bookings with optional filters
   */
  getBookings(filters?: BookingFilter): Observable<Booking[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    let params = new HttpParams();
    
    if (filters?.userId) params = params.set('userId', filters.userId);
    if (filters?.serviceId) params = params.set('serviceId', filters.serviceId);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.dateFrom) params = params.set('dateFrom', filters.dateFrom.toISOString());
    if (filters?.dateTo) params = params.set('dateTo', filters.dateTo.toISOString());
    if (filters?.search) params = params.set('search', filters.search);

    return this.http.get<Booking[]>(this.apiUrl, { params }).pipe(
      tap(bookings => {
        this.bookingsSignal.set(bookings);
        this.loadingSignal.set(false);
      }),
      catchError(error => {
        this.errorSignal.set('Failed to load bookings');
        this.loadingSignal.set(false);
        console.error('Error loading bookings:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: string): Observable<Booking> {
    this.loadingSignal.set(true);
    
    return this.http.get<Booking>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadingSignal.set(false)),
      catchError(error => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Failed to load booking details');
        console.error('Error loading booking:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Create a new booking
   */
  createBooking(bookingData: CreateBookingDTO): Observable<Booking> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // For demo, generate an ID
    const newBooking: Booking = {
      ...this.mapToBooking(bookingData),
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // For demo: Skip HTTP call and directly update local state
    const currentBookings = this.bookingsSignal();
    this.bookingsSignal.set([...currentBookings, newBooking]);
    this.loadingSignal.set(false);

    // For demo: Save to localStorage
    this.saveToLocalStorage();

    // Return the created booking
    return of(newBooking);
  }

  /**
   * Update existing booking
   */
  updateBooking(id: string, updateData: UpdateBookingDTO): Observable<Booking> {
    this.loadingSignal.set(true);
    
    return this.http.patch<Booking>(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(updatedBooking => {
        // Update local state
        const currentBookings = this.bookingsSignal();
        const updatedBookings = currentBookings.map(booking => 
          booking.id === id ? { ...booking, ...updatedBooking, updatedAt: new Date() } : booking
        );
        this.bookingsSignal.set(updatedBookings);
        this.loadingSignal.set(false);
        
        // For demo: Save to localStorage
        this.saveToLocalStorage();
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Failed to update booking');
        console.error('Error updating booking:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Cancel a booking
   */
  cancelBooking(id: string, reason?: string): Observable<Booking> {
    return this.updateBooking(id, { 
      status: BookingStatus.CANCELLED,
      notes: reason ? `Cancelled: ${reason}` : undefined 
    });
  }

  /**
   * Confirm a booking
   */
  confirmBooking(id: string): Observable<Booking> {
    return this.updateBooking(id, { status: BookingStatus.CONFIRMED });
  }

  /**
   * Complete a booking
   */
  completeBooking(id: string): Observable<Booking> {
    return this.updateBooking(id, { status: BookingStatus.COMPLETED });
  }

  /**
   * Delete a booking (admin only)
   */
  deleteBooking(id: string): Observable<void> {
    this.loadingSignal.set(true);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Update local state
        const currentBookings = this.bookingsSignal();
        const filteredBookings = currentBookings.filter(booking => booking.id !== id);
        this.bookingsSignal.set(filteredBookings);
        this.loadingSignal.set(false);
        
        // For demo: Save to localStorage
        this.saveToLocalStorage();
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Failed to delete booking');
        console.error('Error deleting booking:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get all available services
   */
  getServices(): Observable<Service[]> {
    this.loadingSignal.set(true);

    // For demo: Skip HTTP call and use demo data directly
    const demoServices = this.getDemoServices();
    this.servicesSignal.set(demoServices);
    this.loadingSignal.set(false);

    return of(demoServices);
  }

  /**
   * Get available time slots for a service on a specific date
   */
  getAvailableSlots(serviceId: string, date: Date): Observable<TimeSlot[]> {
    // For demo: Generate mock time slots
    const timeSlots: TimeSlot[] = [
      { date, startTime: '09:00', endTime: '10:00', isAvailable: true, capacity: 1, bookedCount: 0 },
      { date, startTime: '10:00', endTime: '11:00', isAvailable: true, capacity: 1, bookedCount: 0 },
      { date, startTime: '11:00', endTime: '12:00', isAvailable: false, capacity: 1, bookedCount: 1 },
      { date, startTime: '14:00', endTime: '15:00', isAvailable: true, capacity: 1, bookedCount: 0 },
      { date, startTime: '15:00', endTime: '16:00', isAvailable: true, capacity: 1, bookedCount: 0 },
      { date, startTime: '16:00', endTime: '17:00', isAvailable: true, capacity: 1, bookedCount: 0 }
    ];

    return of(timeSlots);
  }

  /**
   * Check availability for a specific time slot
   */
  checkAvailability(serviceId: string, date: Date, startTime: string): Observable<boolean> {
    return this.http.get<{ available: boolean }>(
      `${this.servicesUrl}/${serviceId}/availability`,
      { params: { date: date.toISOString().split('T')[0], startTime } }
    ).pipe(
      map(response => response.available),
      catchError(error => {
        console.error('Error checking availability:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get bookings for a specific user
   */
  getUserBookings(userId: string): Observable<Booking[]> {
    return this.getBookings({ userId });
  }

  /**
   * Get upcoming bookings
   */
  getUpcomingBookings(userId?: string): Observable<Booking[]> {
    const now = new Date();
    return this.getBookings({ 
      ...(userId && { userId }),
      dateFrom: now,
      status: BookingStatus.CONFIRMED 
    });
  }

  /**
   * Get booking statistics
   */
  getBookingStats(): Observable<{
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    completed: number;
    revenue: number;
  }> {
    return this.http.get<{
      total: number;
      confirmed: number;
      pending: number;
      cancelled: number;
      completed: number;
      revenue: number;
    }>(`${this.apiUrl}/stats`).pipe(
      catchError(error => {
        console.error('Error loading stats:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Send booking confirmation email
   */
  sendConfirmationEmail(bookingId: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.apiUrl}/${bookingId}/send-confirmation`,
      {}
    );
  }

  /**
   * Send reminder email for upcoming booking
   */
  sendReminderEmail(bookingId: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.apiUrl}/${bookingId}/send-reminder`,
      {}
    );
  }

  /**
   * Process payment for a booking
   */
  processPayment(bookingId: string, paymentData: any): Observable<{ success: boolean; transactionId?: string }> {
    return this.http.post<{ success: boolean; transactionId?: string }>(
      `${this.apiUrl}/${bookingId}/process-payment`,
      paymentData
    );
  }

  // Helper methods for demo
  private mapToBooking(dto: CreateBookingDTO): Booking {
    // In a real app, you would fetch the service details from your database
    const service = this.servicesSignal().find(s => s.id === dto.serviceId) || {
      id: dto.serviceId,
      name: 'Unknown Service',
      price: 0,
      currency: 'USD',
      duration: 60
    };

    return {
      id: this.generateId(),
      userId: 'demo-user-id', // Replace with actual user ID
      serviceId: dto.serviceId,
      serviceName: service.name,
      date: dto.date,
      startTime: dto.startTime,
      endTime: this.calculateEndTime(dto.startTime, service.duration),
      duration: service.duration,
      status: BookingStatus.PENDING,
      price: service.price,
      currency: service.currency,
      notes: dto.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone,
      paymentStatus: PaymentStatus.PENDING
    };
  }

  private calculateEndTime(startTime: string, duration: number): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initializeDemoData(): void {
    // Check if we have demo data in localStorage
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.bookingsSignal.set(data.bookings || []);
        this.servicesSignal.set(data.services || this.getDemoServices());
      } catch (error) {
        console.error('Error loading demo data:', error);
        this.setupDemoData();
      }
    } else {
      this.setupDemoData();
    }
  }

  private setupDemoData(): void {
    const demoServices = this.getDemoServices();
    const demoBookings = this.getDemoBookings(demoServices);
    
    this.servicesSignal.set(demoServices);
    this.bookingsSignal.set(demoBookings);
    this.saveToLocalStorage();
  }

  private getDemoServices(): Service[] {
    return [
      {
        id: 'service-1',
        name: 'Haircut',
        description: 'Professional haircut and styling',
        duration: 30,
        price: 25,
        currency: 'USD',
        category: 'Hair',
        availableSlots: [],
        maxCapacity: 1
      },
      {
        id: 'service-2',
        name: 'Massage Therapy',
        description: 'Full body massage therapy session',
        duration: 60,
        price: 80,
        currency: 'USD',
        category: 'Wellness',
        availableSlots: [],
        maxCapacity: 1
      },
      {
        id: 'service-3',
        name: 'Personal Training',
        description: 'One-on-one personal training session',
        duration: 60,
        price: 50,
        currency: 'USD',
        category: 'Fitness',
        availableSlots: [],
        maxCapacity: 1
      }
    ];
  }

  private getDemoBookings(services: Service[]): Booking[] {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return [
      {
        id: 'booking-1',
        userId: 'user-1',
        serviceId: services[0].id,
        serviceName: services[0].name,
        date: today,
        startTime: '10:00',
        endTime: '10:30',
        duration: services[0].duration,
        status: BookingStatus.CONFIRMED,
        price: services[0].price,
        currency: services[0].currency,
        notes: 'First haircut',
        createdAt: new Date(today.getTime() - 86400000), // Yesterday
        updatedAt: new Date(today.getTime() - 86400000),
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '555-0101',
        paymentStatus: PaymentStatus.PAID
      },
      {
        id: 'booking-2',
        userId: 'user-1',
        serviceId: services[1].id,
        serviceName: services[1].name,
        date: tomorrow,
        startTime: '14:00',
        endTime: '15:00',
        duration: services[1].duration,
        status: BookingStatus.PENDING,
        price: services[1].price,
        currency: services[1].currency,
        createdAt: new Date(),
        updatedAt: new Date(),
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        customerPhone: '555-0102',
        paymentStatus: PaymentStatus.PENDING
      }
    ];
  }

  private saveToLocalStorage(): void {
    const data = {
      bookings: this.bookingsSignal(),
      services: this.servicesSignal()
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  /**
   * Book a destination package
   */
  bookDestination(destinationId: string, destinationName: string, packageType: string, price: number): void {
    // Create a booking for the destination
    const bookingData: CreateBookingDTO = {
      serviceId: destinationId,
      date: new Date(),
      startTime: '10:00',
      customerName: 'Anonymous',
      customerEmail: 'anonymous@example.com',
      notes: `Destination: ${destinationName}, Package: ${packageType}, Price: ${price}`
    };

    this.createBooking(bookingData).subscribe({
      next: (booking) => console.log('Destination booking created:', booking),
      error: (error) => console.error('Error creating destination booking:', error)
    });
  }

  /**
   * Book a flight
   */
  bookFlight(bookingDetails: any): void {
    // Create a booking for the flight
    const bookingData: CreateBookingDTO = {
      serviceId: bookingDetails.id || 'flight-' + bookingDetails.flightNumber,
      date: new Date(),
      startTime: '10:00',
      customerName: 'Anonymous',
      customerEmail: 'anonymous@example.com',
      notes: `Flight: ${bookingDetails.title}, Price: ${bookingDetails.totalPrice}`
    };

    this.createBooking(bookingData).subscribe({
      next: (booking) => console.log('Flight booking created:', booking),
      error: (error) => console.error('Error creating flight booking:', error)
    });
  }

  // Clear error
  clearError(): void {
    this.errorSignal.set(null);
  }

  // Clear all bookings (for testing)
  clearBookings(): void {
    this.bookingsSignal.set([]);
    localStorage.removeItem(this.localStorageKey);
  }
}