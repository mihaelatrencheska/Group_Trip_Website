export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: BookingStatus;
  price: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  location?: string;
  paymentStatus: PaymentStatus;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_PAID = 'partially_paid'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  category: string;
  availableSlots: TimeSlot[];
  maxCapacity?: number;
  requiresConfirmation?: boolean;
}

export interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  capacity: number;
  bookedCount: number;
}

export interface CreateBookingDTO {
  serviceId: string;
  date: Date;
  startTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  paymentMethod?: string;
}

export interface UpdateBookingDTO {
  date?: Date;
  startTime?: string;
  status?: BookingStatus;
  notes?: string;
  paymentStatus?: PaymentStatus;
}

export interface BookingFilter {
  userId?: string;
  serviceId?: string;
  status?: BookingStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}