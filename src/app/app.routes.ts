// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'flights', 
    loadComponent: () => import('./pages/flights.component').then(m => m.FlightsComponent) 
  },
  { 
    path: 'destinations', 
    loadComponent: () => import('./pages/destinations.component').then(m => m.DestinationsComponent) 
  },
  {
    path: 'destinations/:id',  // ADD THIS ROUTE
    loadComponent: () => import('./pages/destination-details.component').then(m => m.DestinationDetailsComponent)
  },
  { 
    path: 'tours', 
    loadComponent: () => import('./pages/tours.component').then(m => m.ToursComponent) 
  },
  { 
    path: 'deals', 
    loadComponent: () => import('./pages/deals.component').then(m => m.DealsComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent) 
  },
  {
    path: 'booking',
    loadComponent: () => import('./components/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin.component').then(m => m.SigninComponent)
  }
];