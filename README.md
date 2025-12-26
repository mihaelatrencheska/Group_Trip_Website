# Group Trip Website

A modern, responsive Angular web application for booking and managing group travel experiences. This platform allows users to explore destinations, book tours, flights, and accommodations for group trips around the world.

## 🎯 Project Goal

The Group Trip Website aims to provide a comprehensive platform where users can:

- **Discover Destinations**: Browse detailed information about various travel destinations with photos, itineraries, and pricing
- **Book Group Tours**: Reserve spots for organized group tours with different package options (Basic, Premium, Luxury)
- **Find Flights**: Search and book flights with real-time availability and pricing
- **Manage Bookings**: Handle reservations through an intuitive booking system
- **User Authentication**: Sign in to manage personal bookings and preferences

The application features a modern, mobile-responsive design with immersive hero images, smooth animations, and an intuitive user experience.

## 🏗️ Project Structure

```
group-trip-website/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── booking/         # Booking form component
│   │   │   ├── footer/          # Site footer
│   │   │   ├── home/            # Homepage hero section
│   │   │   └── navigation/      # Main navigation bar
│   │   ├── models/              # TypeScript interfaces/models
│   │   │   └── booking.model.ts # Booking data structure
│   │   ├── pages/               # Main application pages
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page
│   │   │   ├── deals/           # Special offers page
│   │   │   ├── destination-details/ # Individual destination view
│   │   │   ├── destinations/    # Destinations listing
│   │   │   ├── flights/         # Flight search and booking
│   │   │   ├── signin/          # User authentication
│   │   │   └── tours/           # Tours page
│   │   ├── services/            # Angular services
│   │   │   ├── auth.service.ts  # Authentication service
│   │   │   └── booking.service.ts # Booking management
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.routes.ts        # Route definitions
│   │   └── environment.ts       # Environment variables
│   ├── assets/                  # Static assets
│   ├── index.html               # Main HTML file
│   └── styles.scss              # Global styles
├── public/                      # Public assets
├── angular.json                 # Angular CLI configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Destination Exploration**: Detailed destination pages with galleries, itineraries, and pricing
- **Flight Booking**: Search flights by route, date, and passenger count
- **Tour Packages**: Multiple pricing tiers (Basic, Premium, Luxury) for each destination
- **User Authentication**: Sign-in functionality with local storage persistence
- **Booking System**: Comprehensive booking flow with confirmation

### Technical Features
- **Angular 17+**: Modern Angular with standalone components
- **TypeScript**: Full type safety throughout the application
- **SCSS**: Component-scoped styling with global design system
- **Reactive Forms**: Form handling with validation
- **Router Integration**: Client-side routing with lazy loading
- **Service Architecture**: Clean separation of concerns with services

## 🛠️ Technology Stack

- **Framework**: Angular 17+
- **Language**: TypeScript
- **Styling**: SCSS/CSS with responsive design
- **Forms**: Angular Reactive Forms
- **Routing**: Angular Router
- **HTTP Client**: Angular HttpClient
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd group-trip-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/`

## 🔧 Development

### Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng generate component <name>` - Generate new component

### Code Style
- Follows Angular style guide
- Uses Prettier for code formatting
- ESLint for code quality
- Component-scoped SCSS

## 🌟 Key Components

### Pages
- **Home**: Hero section with featured destinations
- **Destinations**: Grid layout of available destinations
- **Destination Details**: Comprehensive destination information with booking options
- **Flights**: Flight search and booking interface
- **About/Contact**: Informational pages
- **Sign In**: User authentication

### Services
- **AuthService**: Handles user authentication and session management
- **BookingService**: Manages booking data and state

### Models
- **Booking**: TypeScript interface for booking data structure

## 🎨 Design System

- **Colors**: Blue gradient primary (#2563eb to #3b82f6), neutral grays
- **Typography**: Poppins font family
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable button, form, and card components
- **Responsive**: Mobile-first with breakpoints at 768px and 1200px

## 🚀 Deployment

Build for production:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


