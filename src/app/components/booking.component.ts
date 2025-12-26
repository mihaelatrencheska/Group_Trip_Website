import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Booking, CreateBookingDTO, BookingStatus, Service, TimeSlot } from '../models/booking.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  services: any;
  isLoading: any;
  error: any;
  today: Date = new Date();

  selectedService: Service | null = null;
  availableSlots: TimeSlot[] = [];

  // Trip booking data
  bookingData: any = null;
  isTripBooking = false;

  constructor(private bookingService: BookingService) {
    this.services = this.bookingService.services;
    this.isLoading = this.bookingService.isLoading;
    this.error = this.bookingService.error;
    this.bookingForm = new FormGroup({
      serviceId: new FormControl(''),
      date: new FormControl(''),
      startTime: new FormControl(''),
      customerName: new FormControl('', Validators.required),
      customerEmail: new FormControl('', [Validators.required, Validators.email]),
      customerPhone: new FormControl(''),
      notes: new FormControl('')
    });

    // Set validators based on booking type
    this.bookingForm.get('serviceId')?.setValidators(this.isTripBooking ? [] : [Validators.required]);
    this.bookingForm.get('date')?.setValidators(this.isTripBooking ? [] : [Validators.required]);
    this.bookingForm.get('startTime')?.setValidators(this.isTripBooking ? [] : [Validators.required]);
  }

  ngOnInit(): void {
    // Check if we have booking data from navigation
    const navigation = window.history.state;
    if (navigation && navigation.bookingData) {
      this.bookingData = navigation.bookingData;
      this.isTripBooking = true;

      // Update validators for trip booking
      this.bookingForm.get('serviceId')?.clearValidators();
      this.bookingForm.get('date')?.clearValidators();
      this.bookingForm.get('startTime')?.clearValidators();
      this.bookingForm.get('serviceId')?.updateValueAndValidity();
      this.bookingForm.get('date')?.updateValueAndValidity();
      this.bookingForm.get('startTime')?.updateValueAndValidity();

      // Pre-fill form with booking data
      this.bookingForm.patchValue({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: `Booking: ${this.bookingData.title}`
      });
    } else {
      // Only load services for regular bookings
      this.loadServices();
    }
  }

  clearError(): void {
    this.bookingService.clearError();
  }

  loadServices(): void {
    this.bookingService.getServices().subscribe();
  }

  onServiceSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const serviceId = target.value;
    this.selectedService = this.services().find((s: Service) => s.id === serviceId) || null;

    if (this.selectedService) {
      // Load available slots for selected service
      const selectedDate = this.bookingForm.get('date')?.value;
      if (selectedDate) {
        this.loadAvailableSlots(serviceId, new Date(selectedDate));
      }
    }
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const serviceId = this.bookingForm.get('serviceId')?.value;
    const date = new Date(target.value);

    if (serviceId && date) {
      this.loadAvailableSlots(serviceId, date);
    }
  }

  loadAvailableSlots(serviceId: string, date: Date): void {
    this.bookingService.getAvailableSlots(serviceId, date).subscribe({
      next: (slots: TimeSlot[]) => {
        this.availableSlots = slots;
      },
      error: (error: any) => {
        console.error('Error loading slots:', error);
        this.availableSlots = [];
      }
    });
  }

  onSubmit(): void {
    // Check for specific validation errors
    const emailControl = this.bookingForm.get('customerEmail');
    const nameControl = this.bookingForm.get('customerName');

    if (!nameControl?.value || nameControl.value.trim() === '') {
      alert('Failed to book: Customer name is required.');
      nameControl?.markAsTouched();
      return;
    }

    if (!emailControl?.value || emailControl.value.trim() === '') {
      alert('Failed to book: Email address is required.');
      emailControl?.markAsTouched();
      return;
    }

    if (emailControl?.invalid) {
      alert('Failed to book: Please enter a valid email address.');
      emailControl?.markAsTouched();
      return;
    }

    if (this.bookingForm.valid) {
      if (this.isTripBooking && this.bookingData) {
        // Handle trip booking
        const tripBooking = {
          ...this.bookingData,
          customerName: this.bookingForm.get('customerName')?.value,
          customerEmail: this.bookingForm.get('customerEmail')?.value,
          customerPhone: this.bookingForm.get('customerPhone')?.value,
          notes: this.bookingForm.get('notes')?.value
        };

        // Create the booking
        this.bookingService.createBooking({
          serviceId: this.bookingData.type === 'flight' ? 'flight-service' : 'destination-service',
          date: new Date(),
          startTime: '10:00',
          customerName: tripBooking.customerName,
          customerEmail: tripBooking.customerEmail,
          customerPhone: tripBooking.customerPhone,
          notes: `Trip: ${tripBooking.title}, Price: $${tripBooking.price}`
        }).subscribe({
          next: (booking: Booking) => {
            console.log('Trip booking created successfully:', booking);
            alert('Trip booked successfully! Your booking confirmation has been sent to your email.');
            this.bookingForm.reset();
            this.bookingData = null;
            this.isTripBooking = false;
          },
          error: (error: any) => {
            console.error('Error creating trip booking:', error);
            alert('Failed to book trip. Please try again.');
          }
        });
      } else {
        // Handle regular service booking
        const bookingData: CreateBookingDTO = {
          ...this.bookingForm.value,
          date: new Date(this.bookingForm.get('date')?.value)
        };

        this.bookingService.createBooking(bookingData).subscribe({
          next: (booking: Booking) => {
            console.log('Booking created successfully:', booking);
            this.bookingForm.reset();
            this.selectedService = null;
            this.availableSlots = [];
            alert('Booking created successfully!');
          },
          error: (error: any) => {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.bookingForm);
    }
  }



  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}