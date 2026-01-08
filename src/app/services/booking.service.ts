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

  constructor(private http: HttpClient) {}

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

    return this.http.post<Booking>(this.apiUrl, bookingData).pipe(
      tap(newBooking => {
        // Update local state
        const currentBookings = this.bookingsSignal();
        this.bookingsSignal.set([...currentBookings, newBooking]);
        this.loadingSignal.set(false);
      }),
      catchError(error => {
        this.errorSignal.set('Failed to create booking');
        this.loadingSignal.set(false);
        console.error('Error creating booking:', error);
        return throwError(() => error);
      })
    );
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

    return this.http.get<Service[]>(this.servicesUrl).pipe(
      tap(services => {
        this.servicesSignal.set(services);
        this.loadingSignal.set(false);
      }),
      catchError(error => {
        this.errorSignal.set('Failed to load services');
        this.loadingSignal.set(false);
        console.error('Error loading services:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get available time slots for a service on a specific date
   */
  getAvailableSlots(serviceId: string, date: Date): Observable<TimeSlot[]> {
    const dateString = date.toISOString().split('T')[0];
    return this.http.get<any[]>(`${this.apiUrl}/../timeSlots`).pipe(
      map(slots => slots
        .filter(slot => slot.serviceId === serviceId && slot.date === dateString && slot.isAvailable)
        .map(slot => ({ ...slot, date }))
      ),
      catchError(error => {
        console.error('Error loading time slots:', error);
        return throwError(() => error);
      })
    );
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

}