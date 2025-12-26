import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destination-details.component.html',
  styles: [`
    .destination-details-page {
      min-height: 100vh;
      background: #f8fafc;
    }

    .destination-header {
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      color: white;
      position: relative;
      display: flex;
      align-items: center;
      width: 100vw;
      background-repeat: no-repeat;
      min-width: 100%;
    }

    .destination-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
    }

    .header-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }

    .header-content h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
    }

    .header-content p {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 30px;
    }

    .destination-stats {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .destination-stats span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.125rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 16px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }

    .gallery-section {
      background: white;
    }

    .gallery-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #1e293b;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .gallery-item {
      border-radius: 15px;
      overflow: hidden;
      height: 200px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover {
      transform: scale(1.05);
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gallery-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }

    .modal-content img {
      max-width: 100%;
      max-height: 90vh;
      border-radius: 10px;
    }

    .close {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.5);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .itinerary-section {
      background: white;
    }

    .itinerary-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: #1e293b;
    }

    .itinerary-timeline {
      max-width: 1000px;
      margin: 0 auto;
      position: relative;
    }

    .itinerary-timeline::before {
      content: '';
      position: absolute;
      left: 35px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #3b82f6;
    }

    .timeline-item {
      display: flex;
      gap: 30px;
      margin-bottom: 40px;
      position: relative;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .day-number {
      width: 70px;
      height: 70px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      font-weight: 700;
      z-index: 1;
      flex-shrink: 0;
    }

    .timeline-content {
      flex: 1;
      background: #f8fafc;
      padding: 25px;
      border-radius: 15px;
      border-left: 5px solid #3b82f6;
    }

    .timeline-content h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .timeline-content h3 .day-icon {
      font-size: 1.25rem;
    }

    .timeline-content p {
      color: #64748b;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .day-activities .activity {
      display: flex;
      gap: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .day-activities .activity:last-child {
      border-bottom: none;
    }

    .activity-time {
      font-weight: 600;
      color: #3b82f6;
      min-width: 100px;
      background: #dbeafe;
      padding: 5px 10px;
      border-radius: 5px;
      text-align: center;
    }

    .activity-name {
      color: #475569;
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .activity-icon {
      color: #3b82f6;
    }

    .highlight-box {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }

    .highlight-box h4 {
      font-size: 1.25rem;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .highlight-box p {
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }

    .pricing-section {
      background: #f8fafc;
    }

    .pricing-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: #1e293b;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .price-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
      transition: transform 0.3s ease;
      border: 2px solid transparent;
    }

    .price-card:hover {
      transform: translateY(-10px);
      border-color: #3b82f6;
    }

    .price-card.featured {
      transform: scale(1.05);
      border: 2px solid #3b82f6;
    }

    .price-card.featured:hover {
      transform: scale(1.05) translateY(-10px);
    }

    .popular-badge {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .price-card h3 {
      font-size: 1.5rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    .price {
      font-size: 3rem;
      font-weight: 700;
      color: #10b981;
      margin-bottom: 20px;
    }

    .price-period {
      font-size: 1rem;
      color: #64748b;
      margin-bottom: 30px;
    }

    .features {
      list-style: none;
      padding: 0;
      margin-bottom: 30px;
      text-align: left;
    }

    .features li {
      padding: 10px 0;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .features li.included {
      color: #10b981;
    }

    .features li.excluded {
      color: #94a3b8;
      text-decoration: line-through;
    }

    .cta-section {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 100px 20px;
      text-align: center;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    .cta-section p {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 40px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section {
      padding: 80px 0;
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
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }

    .btn-secondary {
      background: #f1f5f9;
      color: #475569;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
    }

    .btn-large {
      padding: 18px 48px;
      font-size: 1.125rem;
      font-weight: 700;
    }

    .btn-discount {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .btn-discount:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
    }

    @media (max-width: 768px) {
      .destination-header {
        height: 100vh;
      }

      .header-content h1 {
        font-size: 2.5rem;
      }

      .destination-stats {
        flex-direction: column;
        gap: 15px;
      }

      .destination-stats span {
        justify-content: center;
      }

      .pricing-grid {
        grid-template-columns: 1fr;
      }

      .price-card.featured {
        transform: none;
      }

      .timeline-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .itinerary-timeline::before {
        left: 35px;
      }

      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .gallery-grid {
        grid-template-columns: 1fr;
      }

      .cta-section h2 {
        font-size: 2rem;
      }

      .activity {
        flex-direction: column;
        gap: 5px;
      }

      .activity-time {
        min-width: auto;
        width: 100px;
      }

      .btn {
        width: 100%;
        padding: 16px 24px;
        font-size: 1.1rem;
        margin-bottom: 10px;
      }

      .price-card {
        padding: 20px;
      }

      .price-card h3 {
        font-size: 1.25rem;
      }

      .price {
        font-size: 2.5rem;
      }
    }
  `]
})
export class DestinationDetailsComponent implements OnInit {
  destination: any = null;
  selectedImage: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}
  
  ngOnInit() {
    const destinationId = this.route.snapshot.paramMap.get('id');
    this.loadDestination(destinationId);
  }
  
  loadDestination(id: string | null) {
    const destinations = {
      'asia': {
        name: 'Asian Explorer',
        tagline: '14-day cultural journey through Japan, Thailand & Bali',
        duration: 14,
        rating: 4.8,
        groupSize: 20,
        headerImage: 'https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 2999,
          premium: 4299,
          luxury: 5999
        },
        gallery: [
          'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1661878434394-7f7e3d032b2a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1650259874515-2cd3af8b8980?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1586820672103-2272d8490ade?q=80&w=1047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: '✈️ Tokyo Arrival & Welcome',
            description: 'Arrive in Tokyo, transfer to hotel, welcome dinner at authentic Japanese restaurant.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Pickup at Narita/Haneda' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in at Tokyo Station Hotel' },
              { time: '07:00 PM', name: '🍣 Welcome Dinner at Michelin-starred Sushi Restaurant' },
              { time: '09:00 PM', name: '🌃 Orientation & Safety Briefing' }
            ]
          },
          {
            title: '⛩️ Tokyo Cultural Immersion',
            description: 'Explore Tokyo\'s iconic temples, markets, and modern districts.',
            activities: [
              { time: '09:00 AM', name: '⛩️ Asakusa Temple & Senso-ji Visit' },
              { time: '12:00 PM', name: '🍱 Traditional Bento Lunch at Tsukiji Market' },
              { time: '02:00 PM', name: '🗼 Tokyo Tower Observatory Visit' },
              { time: '04:00 PM', name: '🏙️ Shinjuku Skyscraper District Tour' },
              { time: '07:00 PM', name: '🎌 Japanese Cultural Show with Geisha Performance' }
            ]
          },
          {
            title: 'Mount Fuji & Hakone Day Trip',
            description: 'Scenic journey to see Japan\'s iconic mountain and hot springs.',
            activities: [
              { time: '07:00 AM', name: '🚌 Depart for Hakone' },
              { time: '10:00 AM', name: '🗻 Mount Fuji 5th Station Visit' },
              { time: '12:30 PM', name: '🍜 Local Noodle Lunch with Fuji View' },
              { time: '02:00 PM', name: '🚠 Hakone Ropeway & Hot Springs' },
              { time: '05:00 PM', name: '⛴️ Lake Ashi Pirate Ship Cruise' }
            ]
          },
          {
            title: 'Kyoto Bullet Train & Temple Tour',
            description: 'Travel to Kyoto via Shinkansen and explore ancient temples.',
            activities: [
              { time: '08:00 AM', name: '🚅 Shinkansen to Kyoto' },
              { time: '10:30 AM', name: '🎎 Fushimi Inari Shrine & Thousand Gates' },
              { time: '01:00 PM', name: '🍵 Matcha Tea Ceremony Experience' },
              { time: '03:00 PM', name: '🏯 Kinkaku-ji Golden Pavilion' },
              { time: '07:00 PM', name: '🍶 Traditional Kaiseki Dinner' }
            ]
          },
          {
            title: 'Kyoto Bamboo Forest & Gion District',
            description: 'Visit the magical bamboo groves and historic geisha district.',
            activities: [
              { time: '09:00 AM', name: '🎋 Arashiyama Bamboo Grove Walk' },
              { time: '11:00 AM', name: '🐒 Monkey Park Iwatayama' },
              { time: '01:00 PM', name: '🚤 Scenic Boat Ride on Hozu River' },
              { time: '04:00 PM', name: '🎭 Gion District Geisha Culture Tour' },
              { time: '07:00 PM', name: '🍱 Izakaya Dinner Experience' }
            ]
          },
          {
            title: 'Travel to Bangkok',
            description: 'Flight to Thailand and introduction to Bangkok\'s vibrant culture.',
            activities: [
              { time: '09:00 AM', name: '✈️ Flight from Osaka to Bangkok' },
              { time: '02:00 PM', name: '🏨 Hotel Check-in Riverside' },
              { time: '04:00 PM', name: '🚤 Chao Phraya River Dinner Cruise' },
              { time: '08:00 PM', name: '🎪 Traditional Thai Dance Show' }
            ]
          },
          {
            title: 'Bangkok Grand Palace & Markets',
            description: 'Visit Thailand\'s most sacred temple and vibrant markets.',
            activities: [
              { time: '08:00 AM', name: '👑 Grand Palace & Emerald Buddha Temple' },
              { time: '12:00 PM', name: '🍛 Authentic Thai Street Food Lunch' },
              { time: '02:00 PM', name: '🛶 Floating Market Tour' },
              { time: '05:00 PM', name: '💆 Traditional Thai Massage Experience' },
              { time: '08:00 PM', name: '🌃 Rooftop Bar Dinner with City Views' }
            ]
          },
          {
            title: 'Ayutthaya Historical Park',
            description: 'Day trip to ancient Siamese capital and UNESCO World Heritage site.',
            activities: [
              { time: '07:30 AM', name: '🚌 Depart for Ayutthaya' },
              { time: '09:30 AM', name: '🏛️ Wat Mahathat & Buddha Head in Tree Roots' },
              { time: '12:00 PM', name: '🍲 Local Riverside Restaurant Lunch' },
              { time: '02:00 PM', name: '🐘 Elephant Palace Visit' },
              { time: '05:00 PM', name: '🌅 Sunset at Ancient Ruins' }
            ]
          },
          {
            title: 'Flight to Bali & Ubud Arrival',
            description: 'Travel to Indonesia and settle into Bali\'s cultural heart.',
            activities: [
              { time: '10:00 AM', name: '✈️ Flight from Bangkok to Denpasar' },
              { time: '03:00 PM', name: '🏨 Check-in at Ubud Jungle Resort' },
              { time: '05:00 PM', name: '🌿 Resort Orientation & Yoga Session' },
              { time: '07:30 PM', name: '🥥 Balinese Welcome Dinner' }
            ]
          },
          {
            title: '🌾 Bali Rice Terraces & Waterfalls',
            description: 'Explore Bali\'s famous landscapes and natural wonders.',
            activities: [
              { time: '07:00 AM', name: '🌅 Sunrise at Tegallalang Rice Terraces' },
              { time: '09:00 AM', name: '💧 Tegenungan Waterfall Visit' },
              { time: '12:00 PM', name: '🍍 Organic Farm-to-Table Lunch' },
              { time: '02:00 PM', name: '🐒 Sacred Monkey Forest Sanctuary' },
              { time: '05:00 PM', name: '🎨 Balinese Art & Craft Workshop' }
            ]
          },
          {
            title: 'Bali Temple Tour & Beach Day',
            description: 'Visit sacred temples and enjoy Bali\'s famous beaches.',
            activities: [
              { time: '08:00 AM', name: '🛕 Tanah Lot Temple Visit' },
              { time: '11:00 AM', name: '🏖️ Seminyak Beach & Boutique Shopping' },
              { time: '01:00 PM', name: '🍹 Beach Club Lunch' },
              { time: '03:00 PM', name: '🌊 Surf Lesson or Beach Relaxation' },
              { time: '07:00 PM', name: '🔥 Beachfront Seafood BBQ Dinner' }
            ]
          },
          {
            title: 'Ubud Cooking Class & Spa Day',
            description: 'Learn authentic Balinese cooking and enjoy luxury spa treatments.',
            activities: [
              { time: '08:00 AM', name: '🛒 Traditional Market Tour for Ingredients' },
              { time: '10:00 AM', name: '👨‍🍳 Balinese Cooking Class' },
              { time: '01:00 PM', name: '🍽️ Enjoy Your Own Cooked Lunch' },
              { time: '03:00 PM', name: '💆‍♀️ Luxury Spa & Flower Bath Experience' },
              { time: '07:00 PM', name: '🎶 Traditional Kecak Fire Dance Show' }
            ]
          },
          {
            title: 'Free Day & Optional Excursions',
            description: 'Choose your own adventure or relax at the resort.',
            activities: [
              { time: '09:00 AM', name: '🏝️ Optional: Nusa Penida Island Day Trip' },
              { time: '09:00 AM', name: '🧘 Optional: Sunrise Yoga & Meditation' },
              { time: '09:00 AM', name: '🤿 Optional: Snorkeling at Blue Lagoon' },
              { time: '07:00 PM', name: '🎉 Farewell Gala Dinner' }
            ]
          },
          {
            title: 'Departure from Bali',
            description: 'Final breakfast and transfers to the airport.',
            activities: [
              { time: '08:00 AM', name: '🍳 Farewell Breakfast Buffet' },
              { time: '10:00 AM', name: '🛍️ Last-minute Souvenir Shopping' },
              { time: '12:00 PM', name: '🏨 Hotel Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfers' }
            ]
          }
        ]
      },
      'america': {
        name: 'American Dream Tour',
        tagline: '10-day coast-to-coast adventure from NYC to California',
        duration: 10,
        rating: 4.7,
        groupSize: 15,
        headerImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&q=80',
        price: {
          basic: 2499,
          premium: 3499,
          luxury: 4999
        },
        gallery: [
          'https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1543158266-0066955047b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1697730215093-baeae8060bfe?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1501103777042-0aeb4df8ff8f?q=80&w=1185&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1459604541061-650c347b06bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1682702750537-e8226568fcae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1725408106567-a77bd9beff7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'New York City Arrival',
            description: 'Welcome to the Big Apple! Times Square and Broadway introduction.',
            activities: [
              { time: '03:00 PM', name: '✈️ Airport Transfer to Midtown Hotel' },
              { time: '05:00 PM', name: '🏨 Check-in at Times Square Hotel' },
              { time: '07:00 PM', name: '🌆 Times Square Orientation Walk' },
              { time: '08:30 PM', name: '🎭 Broadway Show Tickets (Hamilton/Lion King)' }
            ]
          },
          {
            title: 'NYC Iconic Landmarks',
            description: 'Statue of Liberty, Empire State Building, and Central Park exploration.',
            activities: [
              { time: '09:00 AM', name: '🗽 Statue of Liberty & Ellis Island Ferry' },
              { time: '01:00 PM', name: '🌭 NYC Street Food Lunch in Battery Park' },
              { time: '03:00 PM', name: '🏙️ Empire State Building Observatory' },
              { time: '05:00 PM', name: '🌳 Central Park Horse Carriage Ride' },
              { time: '08:00 PM', name: '🍕 Famous New York Pizza Dinner' }
            ]
          },
          {
            title: 'Museum Day & Flight to Chicago',
            description: 'Metropolitan Museum and flight to the Windy City.',
            activities: [
              { time: '09:00 AM', name: '🖼️ Metropolitan Museum of Art Tour' },
              { time: '01:00 PM', name: '✈️ Flight to Chicago O\'Hare' },
              { time: '04:00 PM', name: '🏨 Chicago Downtown Hotel Check-in' },
              { time: '07:00 PM', name: '🍖 Deep Dish Pizza & Blues Music Club' }
            ]
          },
          {
            title: 'Chicago Architecture & Lake Michigan',
            description: 'Architecture river cruise and Millennium Park.',
            activities: [
              { time: '09:00 AM', name: '🏗️ Chicago Architecture River Cruise' },
              { time: '12:30 PM', name: '🌭 Chicago-style Hot Dog Lunch' },
              { time: '02:30 PM', name: '⚽ Millennium Park & "The Bean"' },
              { time: '05:00 PM', name: '🌅 Lake Michigan Sunset Walk' },
              { time: '08:00 PM', name: '🎷 Jazz Club Dinner Experience' }
            ]
          },
          {
            title: 'Flight to Las Vegas',
            description: 'Travel to the entertainment capital of the world.',
            activities: [
              { time: '10:00 AM', name: '✈️ Flight to Las Vegas' },
              { time: '01:00 PM', name: '🏨 Check-in at Strip Hotel & Casino' },
              { time: '04:00 PM', name: '🎰 Casino Orientation & Free Time' },
              { time: '08:00 PM', name: '🎪 Cirque du Soleil Show' },
              { time: '11:00 PM', name: '🌃 Las Vegas Strip Night Tour' }
            ]
          },
          {
            title: 'Grand Canyon Day Trip',
            description: 'Helicopter tour to one of the Seven Natural Wonders.',
            activities: [
              { time: '07:00 AM', name: '🚁 Helicopter to Grand Canyon' },
              { time: '10:00 AM', name: '🏜️ Grand Canyon South Rim Exploration' },
              { time: '01:00 PM', name: '🥪 Picnic Lunch with Canyon Views' },
              { time: '04:00 PM', name: '🚁 Return Flight to Vegas' },
              { time: '08:00 PM', name: '🍽️ Celebrity Chef Restaurant Dinner' }
            ]
          },
          {
            title: 'Drive to Los Angeles via Route 66',
            description: 'Scenic drive along historic Route 66 to California.',
            activities: [
              { time: '08:00 AM', name: '🚗 Luxury Coach along Route 66' },
              { time: '12:00 PM', name: '🍔 Classic American Diner Lunch' },
              { time: '05:00 PM', name: '🏨 Check-in at Beverly Hills Hotel' },
              { time: '08:00 PM', name: '🌟 Hollywood Celebrity Homes Tour' }
            ]
          },
          {
            title: 'Los Angeles & Hollywood',
            description: 'Walk of Fame, Universal Studios, and Beverly Hills.',
            activities: [
              { time: '09:00 AM', name: '🎬 Universal Studios Hollywood' },
              { time: '01:00 PM', name: '🍣 Celebrity Hotspot Lunch' },
              { time: '03:00 PM', name: '⭐ Hollywood Walk of Fame & Chinese Theater' },
              { time: '06:00 PM', name: '🛍️ Rodeo Drive Shopping' },
              { time: '08:30 PM', name: '🌊 Santa Monica Pier & Dinner' }
            ]
          },
          {
            title: 'Malibu Beach & Free Day',
            description: 'Pacific Coast Highway drive and optional activities.',
            activities: [
              { time: '09:00 AM', name: '🚗 Pacific Coast Highway to Malibu' },
              { time: '11:00 AM', name: '🏄‍♂️ Beach Activities & Surf Lessons' },
              { time: '02:00 PM', name: '🦞 Malibu Seafood Shack Lunch' },
              { time: '04:00 PM', name: '🎨 Optional: Getty Museum or Beach Relaxation' },
              { time: '08:00 PM', name: '🎉 Farewell Dinner with Pacific Views' }
            ]
          },
          {
            title: 'Departure from LAX',
            description: 'Final California breakfast and airport transfers.',
            activities: [
              { time: '09:00 AM', name: '🥞 California-style Brunch' },
              { time: '11:00 AM', name: '🏨 Hotel Check-out' },
              { time: '12:00 PM', name: '🛍️ Last-minute Souvenir Shopping' },
              { time: '02:00 PM', name: '✈️ LAX Airport Transfers' }
            ]
          }
        ]
      },
      'europe': {
        name: 'European Grand Tour',
        tagline: '12-day historical journey through London, Paris, Rome & Barcelona',
        duration: 12,
        rating: 4.9,
        groupSize: 18,
        headerImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 3299,
          premium: 4599,
          luxury: 6299
        },
        gallery: [
          'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1476786516785-c3ff2dac9bbf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'London Arrival & Royal Welcome',
            description: 'Arrive in London and begin with iconic royal landmarks.',
            activities: [
              { time: '02:00 PM', name: '✈️ Heathrow Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Check-in at Central London Hotel' },
              { time: '06:00 PM', name: '👑 Buckingham Palace Changing of the Guard' },
              { time: '08:00 PM', name: '🍺 Traditional Pub Dinner & Welcome' }
            ]
          },
          {
            title: 'London Historical Tour',
            description: 'Tower of London, Westminster Abbey, and Thames cruise.',
            activities: [
              { time: '09:00 AM', name: '🏰 Tower of London & Crown Jewels' },
              { time: '01:00 PM', name: '🍽️ Afternoon Tea at Fortnum & Mason' },
              { time: '03:00 PM', name: '⛪ Westminster Abbey Guided Tour' },
              { time: '05:00 PM', name: '🚤 Thames River Cruise to Greenwich' },
              { time: '08:00 PM', name: '🎭 West End Theater Show' }
            ]
          },
          {
            title: 'Eurostar to Paris',
            description: 'High-speed train journey under the English Channel.',
            activities: [
              { time: '09:00 AM', name: '🚄 Eurostar to Paris Gare du Nord' },
              { time: '01:00 PM', name: '🏨 Check-in at Parisian Boutique Hotel' },
              { time: '03:00 PM', name: '🗼 Eiffel Tower Level 2 Access' },
              { time: '07:00 PM', name: '🍷 Seine River Dinner Cruise' }
            ]
          },
          {
            title: 'Paris Art & Culture',
            description: 'Louvre Museum, Montmartre, and French cuisine.',
            activities: [
              { time: '09:00 AM', name: '🖼️ Louvre Museum (Mona Lisa & Venus)' },
              { time: '01:00 PM', name: '🥐 French Bistro Lunch in Le Marais' },
              { time: '03:00 PM', name: '🎨 Montmartre & Sacré-Cœur Basilica' },
              { time: '06:00 PM', name: '🧀 French Cheese & Wine Tasting' },
              { time: '09:00 PM', name: '💃 Moulin Rouge Cabaret Show' }
            ]
          },
          {
            title: 'Versailles Palace Day Trip',
            description: 'Explore the opulent palace and gardens of French royalty.',
            activities: [
              { time: '08:30 AM', name: '🚌 Depart for Versailles' },
              { time: '10:00 AM', name: '🏰 Palace of Versailles Guided Tour' },
              { time: '01:00 PM', name: '🍽️ Lunch at Marie Antoinette\'s Hamlet' },
              { time: '03:00 PM', name: '🌳 Gardens & Fountain Show' },
              { time: '07:00 PM', name: '🍴 Michelin-starred Dinner in Paris' }
            ]
          },
          {
            title: 'Flight to Rome',
            description: 'Travel to the Eternal City, capital of ancient empire.',
            activities: [
              { time: '10:00 AM', name: '✈️ Flight to Rome Fiumicino' },
              { time: '02:00 PM', name: '🏨 Check-in near Spanish Steps' },
              { time: '04:00 PM', name: '🏛️ Trevi Fountain & Pantheon' },
              { time: '08:00 PM', name: '🍝 Authentic Roman Trattoria Dinner' }
            ]
          },
          {
            title: 'Ancient Rome & Vatican City',
            description: 'Colosseum, Roman Forum, and Vatican Museums.',
            activities: [
              { time: '08:30 AM', name: '🏟️ Colosseum & Gladiator Arena' },
              { time: '11:30 AM', name: '🏛️ Roman Forum & Palatine Hill' },
              { time: '02:00 PM', name: '🍕 Pizza Lunch in Trastevere' },
              { time: '04:00 PM', name: '⛪ Vatican Museums & Sistine Chapel' },
              { time: '08:00 PM', name: '🍝 Cooking Class & Dinner' }
            ]
          },
          {
            title: 'Florence Day Trip',
            description: 'Renaissance art and architecture in Tuscany.',
            activities: [
              { time: '07:30 AM', name: '🚅 High-speed train to Florence' },
              { time: '09:30 AM', name: '🎨 Uffizi Gallery (Birth of Venus)' },
              { time: '01:00 PM', name: '🥩 Tuscan Steak Lunch' },
              { time: '03:00 PM', name: '⛪ Duomo & Michelangelo\'s David' },
              { time: '07:00 PM', name: '🚅 Return to Rome' }
            ]
          },
          {
            title: 'Flight to Barcelona',
            description: 'Travel to Catalonia and experience Gaudí architecture.',
            activities: [
              { time: '11:00 AM', name: '✈️ Flight to Barcelona' },
              { time: '02:00 PM', name: '🏨 Check-in at Gothic Quarter Hotel' },
              { time: '04:00 PM', name: '🏰 Park Güell & Gaudí Architecture' },
              { time: '08:00 PM', name: '🥘 Tapas Crawl in El Born' }
            ]
          },
          {
            title: 'Barcelona Highlights',
            description: 'Sagrada Familia, Gothic Quarter, and flamenco show.',
            activities: [
              { time: '09:00 AM', name: '⛪ Sagrada Familia Guided Tour' },
              { time: '12:30 PM', name: '🍤 Paella Lunch by the Beach' },
              { time: '03:00 PM', name: '🏰 Gothic Quarter & Picasso Museum' },
              { time: '07:00 PM', name: '💃 Flamenco Show with Dinner' }
            ]
          },
          {
            title: 'Montserrat & Catalan Countryside',
            description: 'Day trip to mystical mountain monastery.',
            activities: [
              { time: '08:30 AM', name: '🚌 Depart for Montserrat' },
              { time: '10:00 AM', name: '⛰️ Cable Car to Monastery' },
              { time: '01:00 PM', name: '🍷 Catalan Winery Visit & Lunch' },
              { time: '04:00 PM', name: '🎶 Boys\' Choir Performance (if available)' },
              { time: '08:00 PM', name: '🎉 Farewell Gala Dinner' }
            ]
          },
          {
            title: 'Departure from Barcelona',
            description: 'Final Spanish breakfast and airport transfers.',
            activities: [
              { time: '09:00 AM', name: '🥐 Breakfast at Local Market' },
              { time: '11:00 AM', name: '🏨 Hotel Check-out' },
              { time: '12:00 PM', name: '🛍️ Last-minute Shopping on Las Ramblas' },
              { time: '02:00 PM', name: '✈️ Barcelona Airport Transfers' }
            ]
          }
        ]
      },
      'spain-party': {
        name: 'Spanish Party Gateway',
        tagline: '6-day Spanish party extravaganza from Barcelona to Madrid',
        duration: 6,
        rating: 4.9,
        groupSize: 18,
        headerImage: 'https://images.unsplash.com/photo-1571984405176-5958bd9ac31d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 3299,
          premium: 4599,
          luxury: 6299
        },
        gallery: [
          'https://images.unsplash.com/photo-1578143571332-8e104b00dc5a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1708589336791-e51bc6324105?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1602867612779-3aaf54b425c2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1631901589746-219fcffbdd29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1749724460541-93ac76687b18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1560359614-870d1a7ea91d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1631012202313-32a77a595004?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1594312287151-de91ec515ce2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Barcelona Party Arrival',
            description: 'Arrive in Barcelona and kick off the party extravaganza.',
            activities: [
              { time: '02:00 PM', name: '✈️ Barcelona Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Check-in at Beachfront Party Hotel' },
              { time: '06:00 PM', name: '🍹 Welcome Cocktails at Rooftop Bar' },
              { time: '09:00 PM', name: '🎶 Opium Barcelona Club Opening Night' }
            ]
          },
          {
            title: 'Valencia Beach & Nightlife',
            description: 'Travel to Valencia for beach parties and vibrant nightlife.',
            activities: [
              { time: '10:00 AM', name: '🚄 High-speed Train to Valencia' },
              { time: '12:00 PM', name: '🏨 Check-in at Beach Resort' },
              { time: '02:00 PM', name: '🏖️ Malvarrosa Beach Party' },
              { time: '06:00 PM', name: '🍸 Beach Club Cocktails' },
              { time: '10:00 PM', name: '🎵 Mya Beach Club Night' }
            ]
          },
          {
            title: 'Malaga Coastal Parties',
            description: 'Head to Malaga for coastal vibes and party scenes.',
            activities: [
              { time: '09:00 AM', name: '✈️ Flight to Malaga' },
              { time: '11:00 AM', name: '🏨 Check-in at Marina Hotel' },
              { time: '01:00 PM', name: '🚤 Yacht Party Excursion' },
              { time: '05:00 PM', name: '🏖️ Playa de la Malagueta Beach' },
              { time: '09:00 PM', name: '🎶 Elviria Beach Club' }
            ]
          },
          {
            title: 'Ibiza Island Paradise',
            description: 'Ferry to Ibiza for legendary beach and boat parties.',
            activities: [
              { time: '08:00 AM', name: '⛴️ Ferry to Ibiza' },
              { time: '10:00 AM', name: '🏨 Check-in at Beach Club Resort' },
              { time: '12:00 PM', name: '🏖️ Playa d\'en Bossa Beach Party' },
              { time: '04:00 PM', name: '🚢 Yacht Party with DJs' },
              { time: '10:00 PM', name: '🎪 Pacha Ibiza Main Event' }
            ]
          },
          {
            title: 'Madrid Nightlife Capital',
            description: 'Return to Madrid for the ultimate city party experience.',
            activities: [
              { time: '09:00 AM', name: '✈️ Flight back to Madrid' },
              { time: '11:00 AM', name: '🏨 Check-in at Central Hotel' },
              { time: '01:00 PM', name: '🛍️ Shopping in Gran Via' },
              { time: '05:00 PM', name: '🍾 Rooftop Bar Cocktails' },
              { time: '09:00 PM', name: '🎶 Kapital Club Multi-floor Party' }
            ]
          },
          {
            title: 'Madrid Farewell & Departure',
            description: 'Final party night and airport transfer.',
            activities: [
              { time: '11:00 AM', name: '🍳 Brunch Recovery' },
              { time: '01:00 PM', name: '🏨 Hotel Check-out' },
              { time: '02:00 PM', name: '🛍️ Last-minute Souvenirs' },
              { time: '04:00 PM', name: '✈️ Madrid Airport Transfer' }
            ]
          }
        ]
      },
      'caribbean': {
        name: 'Caribbean Cruise Adventure',
        tagline: '10-day luxury cruise through Bahamas, Jamaica & Grand Cayman',
        duration: 10,
        rating: 4.9,
        groupSize: 2,
        headerImage: 'https://plus.unsplash.com/premium_photo-1697730545957-fbfe258301a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 1999,
          premium: 2899,
          luxury: 4299
        },
        gallery: [
          'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1691961828337-26c27528d5a7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1580503056870-5b465315ba34?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1559956144-83a135c9872e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1662460873952-78a8211ccecc?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1523659945955-fe95eb9bc70b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1667679815544-b35d58ab5545?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Miami Embarkation',
            description: 'Board your luxury cruise ship at Port of Miami.',
            activities: [
              { time: '12:00 PM', name: '⚓ Boarding & Cabin Assignment' },
              { time: '02:00 PM', name: '🛳️ Ship Orientation & Safety Drill' },
              { time: '05:00 PM', name: '🍹 Welcome Cocktail Party' },
              { time: '08:00 PM', name: '🎭 Captain\'s Welcome Dinner & Show' }
            ]
          },
          {
            title: 'At Sea - Luxury Amenities',
            description: 'Enjoy ship facilities: spa, pools, entertainment.',
            activities: [
              { time: '09:00 AM', name: '🧘 Sunrise Yoga on Deck' },
              { time: '11:00 AM', name: '💆‍♀️ Spa Treatment & Thermal Suite' },
              { time: '01:00 PM', name: '🍽️ Gourmet Lunch at Pool Grill' },
              { time: '03:00 PM', name: '🏊 Infinity Pool & Water Slide' },
              { time: '08:00 PM', name: '🎤 Broadway-style Production Show' }
            ]
          },
          {
            title: 'Nassau, Bahamas',
            description: 'Explore Bahamian capital and Atlantis Resort.',
            activities: [
              { time: '08:00 AM', name: '🏝️ Disembark at Nassau Harbor' },
              { time: '10:00 AM', name: '🐬 Atlantis Aquaventure Water Park' },
              { time: '01:00 PM', name: '🍤 Bahamian Conch Salad Lunch' },
              { time: '03:00 PM', name: '🏰 Queen\'s Staircase & Fort Fincastle' },
              { time: '06:00 PM', name: '⚓ All Aboard & Sail Away Party' }
            ]
          },
          {
            title: 'At Sea - Culinary Experiences',
            description: 'Cooking classes, wine tasting, and fine dining.',
            activities: [
              { time: '10:00 AM', name: '👨‍🍳 Caribbean Cooking Class' },
              { time: '12:30 PM', name: '🍷 Wine Tasting & Food Pairing' },
              { time: '03:00 PM', name: '🎯 Onboard Activities & Games' },
              { time: '07:00 PM', name: '👗 Formal Night & Gala Dinner' },
              { time: '10:00 PM', name: '🎰 Casino Night & Live Music' }
            ]
          },
          {
            title: 'Ocho Rios, Jamaica',
            description: 'Dunn\'s River Falls and Jamaican culture.',
            activities: [
              { time: '08:00 AM', name: '🏝️ Arrival in Ocho Rios' },
              { time: '09:30 AM', name: '💧 Dunn\'s River Falls Climbing' },
              { time: '01:00 PM', name: '🍍 Jerk Chicken Lunch with Live Reggae' },
              { time: '03:00 PM', name: '🏖️ Mystic Mountain & Bobsled Ride' },
              { time: '06:00 PM', name: '⚓ Departure & Sunset Sail' }
            ]
          },
          {
            title: 'George Town, Grand Cayman',
            description: 'Stingray City and Seven Mile Beach.',
            activities: [
              { time: '08:00 AM', name: '🚤 Tender to Grand Cayman' },
              { time: '10:00 AM', name: '🐬 Stingray City Sandbar & Snorkeling' },
              { time: '01:00 PM', name: '🦞 Seafood Lunch on Seven Mile Beach' },
              { time: '03:00 PM', name: '🛍️ Duty-free Shopping & Rum Tasting' },
              { time: '05:00 PM', name: '⚓ Return to Ship' }
            ]
          },
          {
            title: 'At Sea - Relaxation Day',
            description: 'Ultimate relaxation: reading, sunbathing, treatments.',
            activities: [
              { time: '09:00 AM', name: '📚 Library & Coffee Lounge' },
              { time: '11:00 AM', name: '☀️ Poolside Relaxation & Cocktails' },
              { time: '02:00 PM', name: '🍔 Poolside BBQ Lunch' },
              { time: '04:00 PM', name: '🎬 Movies Under the Stars' },
              { time: '08:00 PM', name: '🎪 Crew Talent Show & Dinner' }
            ]
          },
          {
            title: 'Cozumel, Mexico',
            description: 'Mayan ruins and Mexican fiesta.',
            activities: [
              { time: '09:00 AM', name: '🏝️ Arrival in Cozumel' },
              { time: '10:30 AM', name: '🏰 Tulum Mayan Ruins Tour' },
              { time: '01:30 PM', name: '🌮 Authentic Mexican Fiesta Lunch' },
              { time: '03:30 PM', name: '🤿 Snorkeling at Palancar Reef' },
              { time: '07:00 PM', name: '⚓ Sail Away Mariachi Party' }
            ]
          },
          {
            title: 'At Sea - Farewell Celebrations',
            description: 'Final day of luxury and farewell events.',
            activities: [
              { time: '10:00 AM', name: '🛍️ Last-minute Shopping Onboard' },
              { time: '12:30 PM', name: '🍽️ Special Chef\'s Table Lunch' },
              { time: '03:00 PM', name: '🎪 Farewell Pool Party & Games' },
              { time: '07:00 PM', name: '👔 Farewell Captain\'s Dinner' },
              { time: '10:00 PM', name: '🎆 Final Night Show & Fireworks' }
            ]
          },
          {
            title: 'Miami Disembarkation',
            description: 'Final breakfast and departure.',
            activities: [
              { time: '07:00 AM', name: '🍳 Final Breakfast Onboard' },
              { time: '09:00 AM', name: '🛄 Disembarkation Process' },
              { time: '10:30 AM', name: '🚗 Transfers to Miami Airport' },
              { time: '12:00 PM', name: '✈️ Optional: Miami Day Tour or Flight Home' }
            ]
          }
        ]
      },
      'bali': {
        name: 'Bali Paradise Getaway',
        tagline: '7-day luxury resort stay with flights included',
        duration: 7,
        rating: 4.9,
        groupSize: 2,
        headerImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80',
        price: {
          basic: 1599,
          premium: 2399,
          luxury: 3599
        },
        gallery: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
          'https://images.unsplash.com/photo-1559293831-8a81f3bfc36c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1664300305129-acdb83818f9e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'Arrival at Luxury Resort',
            description: 'Private flight transfer to our exclusive luxury resort with welcome amenities.',
            activities: [
              { time: '10:00 AM', name: '✈️ Private Jet Flight to Bali' },
              { time: '12:00 PM', name: '🚗 Luxury Car Transfer to Resort' },
              { time: '02:00 PM', name: '🏨 Check-in with Butler Service' },
              { time: '04:00 PM', name: '🍹 Welcome Champagne & Resort Tour' },
              { time: '07:00 PM', name: '🍽️ Gourmet Welcome Dinner' }
            ]
          },
          {
            title: 'Resort Relaxation & Spa Day',
            description: 'Indulge in world-class spa treatments and resort amenities.',
            activities: [
              { time: '08:00 AM', name: '🧘 Sunrise Yoga on the Beach' },
              { time: '10:00 AM', name: '💆‍♀️ Signature Spa Treatment' },
              { time: '12:30 PM', name: '🍽️ Healthy Lunch at Poolside Restaurant' },
              { time: '03:00 PM', name: '🏊 Infinity Pool Relaxation' },
              { time: '07:00 PM', name: '🍷 Wine Tasting & Sunset Viewing' }
            ]
          },
          {
            title: 'Private Beach & Water Activities',
            description: 'Exclusive beach access and water sports at the resort.',
            activities: [
              { time: '09:00 AM', name: '🏖️ Private Beach Morning' },
              { time: '11:00 AM', name: '🚤 Resort Yacht Cruise' },
              { time: '01:00 PM', name: '🍲 Seafood Lunch on the Beach' },
              { time: '03:00 PM', name: '🤿 Snorkeling or Diving Excursion' },
              { time: '06:00 PM', name: '🌅 Beachfront Massage' }
            ]
          },
          {
            title: 'Culinary Experiences & Fine Dining',
            description: 'Explore the resort\'s award-winning restaurants and culinary offerings.',
            activities: [
              { time: '08:00 AM', name: '🍳 Private Chef Breakfast' },
              { time: '10:00 AM', name: '👨‍🍳 Cooking Class with Resort Chef' },
              { time: '01:00 PM', name: '🍽️ Tasting Menu at Michelin-inspired Restaurant' },
              { time: '04:00 PM', name: '🍷 Wine Cellar Tour' },
              { time: '08:00 PM', name: '🎶 Live Music Dinner' }
            ]
          },
          {
            title: 'Adventure & Exploration',
            description: 'Guided excursions from the resort to nearby attractions.',
            activities: [
              { time: '07:00 AM', name: '🚁 Helicopter Tour of Bali' },
              { time: '10:00 AM', name: '🏞️ Rice Terrace & Temple Visit' },
              { time: '01:00 PM', name: '🍛 Picnic Lunch in the Countryside' },
              { time: '04:00 PM', name: '🛍️ Boutique Shopping Experience' },
              { time: '07:00 PM', name: '🎭 Cultural Performance' }
            ]
          },
          {
            title: 'Ultimate Luxury & Wellness',
            description: 'Complete relaxation with premium wellness services.',
            activities: [
              { time: '09:00 AM', name: '🧘 Private Meditation Session' },
              { time: '11:00 AM', name: '💆‍♂️ Couples Spa Treatment' },
              { time: '02:00 PM', name: '🏊 Pool & Beach Time' },
              { time: '05:00 PM', name: '🍹 Afternoon Tea Service' },
              { time: '08:00 PM', name: '🍽️ Farewell Gala Dinner' }
            ]
          },
          {
            title: 'Departure with Luxury Transfer',
            description: 'Relaxing morning and private transfer to the airport.',
            activities: [
              { time: '09:00 AM', name: '🍳 Farewell Breakfast in Villa' },
              { time: '11:00 AM', name: '🏨 Leisurely Check-out' },
              { time: '12:00 PM', name: '🛍️ Last-minute Spa Souvenirs' },
              { time: '02:00 PM', name: '✈️ Private Jet Departure' }
            ]
          }
        ]
      },
      'rome': {
        name: 'Rome',
        tagline: 'Discover the Eternal City, where ancient ruins meet Renaissance masterpieces in a timeless blend of history and beauty.',
        duration: 4,
        rating: 4.9,
        groupSize: 10,
        headerImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80',
        price: {
          basic: 899,
          premium: 1299,
          luxury: 1899
        },
        gallery: [
          'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
          'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
          'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80',
          'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'Arrival in Rome',
            description: 'Welcome to the Eternal City.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏛️ Trevi Fountain & Pantheon' },
              { time: '08:00 PM', name: '🍝 Welcome Dinner' }
            ]
          },
          {
            title: 'Ancient Rome',
            description: 'Explore the Colosseum and Roman Forum.',
            activities: [
              { time: '09:00 AM', name: '🏟️ Colosseum Tour' },
              { time: '12:00 PM', name: '🏛️ Roman Forum' },
              { time: '02:00 PM', name: '🍕 Lunch in Trastevere' },
              { time: '05:00 PM', name: '⛪ Vatican Museums' }
            ]
          },
          {
            title: 'Vatican City',
            description: 'Visit St. Peter\'s Basilica and Sistine Chapel.',
            activities: [
              { time: '09:00 AM', name: '⛪ St. Peter\'s Basilica' },
              { time: '11:00 AM', name: '🎨 Sistine Chapel' },
              { time: '01:00 PM', name: '🍝 Italian Lunch' },
              { time: '03:00 PM', name: '🗽 Castel Sant\'Angelo' }
            ]
          },
          {
            title: 'Departure',
            description: 'Final day in Rome.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Last-minute Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'amsterdam': {
        name: 'Amsterdam',
        tagline: 'Experience the enchanting canals, vibrant culture, and artistic heritage of this picturesque Dutch gem.',
        duration: 3,
        rating: 4.8,
        groupSize: 8,
        headerImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=80',
        price: {
          basic: 699,
          premium: 999,
          luxury: 1499
        },
        gallery: [
          'https://plus.unsplash.com/premium_photo-1661887237533-b38811c27add?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1661878122586-2d75a86f3400?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1719421338114-98f511a99051?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1634322634127-86cd6243a856?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Amsterdam Arrival',
            description: 'Welcome to the Venice of the North.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Canal Hotel Check-in' },
              { time: '06:00 PM', name: '🚤 Canal Cruise' },
              { time: '08:00 PM', name: '🍺 Dutch Dinner' }
            ]
          },
          {
            title: 'City Exploration',
            description: 'Discover Amsterdam\'s highlights.',
            activities: [
              { time: '09:00 AM', name: '🖼️ Rijksmuseum' },
              { time: '12:00 PM', name: '🌷 Vondelpark' },
              { time: '02:00 PM', name: '🍔 Local Lunch' },
              { time: '04:00 PM', name: '🚲 Bike Tour' }
            ]
          },
          {
            title: 'Departure',
            description: 'Farewell to Amsterdam.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'paris': {
        name: 'Paris',
        tagline: 'Fall in love with the City of Light, where iconic landmarks and romantic streets create an unforgettable atmosphere.',
        duration: 4,
        rating: 4.9,
        groupSize: 12,
        headerImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
        price: {
          basic: 899,
          premium: 1299,
          luxury: 1899
        },
        gallery: [
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
          'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=800&q=80',
          'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'Paris Arrival',
            description: 'Welcome to the City of Love.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🗼 Eiffel Tower Visit' },
              { time: '08:00 PM', name: '🥐 French Dinner' }
            ]
          },
          {
            title: 'Iconic Landmarks',
            description: 'Explore Paris\'s famous sites.',
            activities: [
              { time: '09:00 AM', name: '⛪ Notre-Dame & Île de la Cité' },
              { time: '12:00 PM', name: '🖼️ Louvre Museum' },
              { time: '02:00 PM', name: '🥐 Bistro Lunch' },
              { time: '04:00 PM', name: '🏰 Palace of Versailles' }
            ]
          },
          {
            title: 'Montmartre & Seine',
            description: 'Artistic district and river cruise.',
            activities: [
              { time: '09:00 AM', name: '🎨 Montmartre & Sacré-Cœur' },
              { time: '12:00 PM', name: '🍷 Wine Tasting' },
              { time: '02:00 PM', name: '🚤 Seine River Cruise' },
              { time: '06:00 PM', name: '💃 Moulin Rouge Show' }
            ]
          },
          {
            title: 'Departure',
            description: 'Au revoir Paris.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'london': {
        name: 'London',
        tagline: 'Explore the historic charm and modern energy of London, a city that seamlessly blends tradition with innovation.',
        duration: 4,
        rating: 4.8,
        groupSize: 15,
        headerImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80',
        price: {
          basic: 799,
          premium: 1199,
          luxury: 1699
        },
        gallery: [
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
          'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80',
          'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'London Arrival',
            description: 'Welcome to the British capital.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏰 Buckingham Palace' },
              { time: '08:00 PM', name: '🍺 Pub Dinner' }
            ]
          },
          {
            title: 'Historic London',
            description: 'Explore London\'s history.',
            activities: [
              { time: '09:00 AM', name: '🏰 Tower of London' },
              { time: '12:00 PM', name: '⛪ Westminster Abbey' },
              { time: '02:00 PM', name: '🥪 British Lunch' },
              { time: '04:00 PM', name: '🚤 Thames Cruise' }
            ]
          },
          {
            title: 'Modern London',
            description: 'Experience contemporary London.',
            activities: [
              { time: '09:00 AM', name: '🖼️ Tate Modern' },
              { time: '12:00 PM', name: '🌉 Millennium Bridge' },
              { time: '02:00 PM', name: '🍔 Street Food' },
              { time: '04:00 PM', name: '🛍️ Camden Market' }
            ]
          },
          {
            title: 'Departure',
            description: 'Farewell to London.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'new-york': {
        name: 'New York',
        tagline: 'Immerse yourself in the vibrant heartbeat of New York City, where skyscrapers touch the sky and dreams come alive.',
        duration: 5,
        rating: 4.9,
        groupSize: 20,
        headerImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&q=80',
        price: {
          basic: 1099,
          premium: 1599,
          luxury: 2299
        },
        gallery: [
          'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805b6d?w=800&q=80',
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'NYC Arrival',
            description: 'Welcome to the Big Apple.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🌆 Times Square' },
              { time: '08:00 PM', name: '🍕 New York Pizza' }
            ]
          },
          {
            title: 'Manhattan Highlights',
            description: 'Explore Manhattan\'s icons.',
            activities: [
              { time: '09:00 AM', name: '🗽 Statue of Liberty' },
              { time: '12:00 PM', name: '🏙️ Empire State Building' },
              { time: '02:00 PM', name: '🌭 Street Food Lunch' },
              { time: '04:00 PM', name: '🌳 Central Park' }
            ]
          },
          {
            title: 'Brooklyn & Beyond',
            description: 'Cross the bridge to Brooklyn.',
            activities: [
              { time: '09:00 AM', name: '🌉 Brooklyn Bridge' },
              { time: '12:00 PM', name: '🏞️ Brooklyn Heights' },
              { time: '02:00 PM', name: '🍔 Brooklyn Lunch' },
              { time: '04:00 PM', name: '🎨 Street Art Tour' }
            ]
          },
          {
            title: 'Museum Day',
            description: 'Art and culture in NYC.',
            activities: [
              { time: '09:00 AM', name: '🖼️ Metropolitan Museum' },
              { time: '12:00 PM', name: '🍽️ Museum Cafe Lunch' },
              { time: '02:00 PM', name: '🎭 Broadway Show' },
              { time: '06:00 PM', name: '🍹 Rooftop Drinks' }
            ]
          },
          {
            title: 'Departure',
            description: 'So long NYC.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'tokyo': {
        name: 'Tokyo',
        tagline: 'Journey through Tokyo\'s mesmerizing blend of ancient temples and cutting-edge technology in this dynamic metropolis.',
        duration: 5,
        rating: 4.9,
        groupSize: 10,
        headerImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80',
        price: {
          basic: 1299,
          premium: 1899,
          luxury: 2699
        },
        gallery: [
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
          'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
          'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80'
        ],
        itinerary: [
          {
            title: 'Tokyo Arrival',
            description: 'Welcome to Tokyo.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🗼 Tokyo Tower' },
              { time: '08:00 PM', name: '🍱 Sushi Dinner' }
            ]
          },
          {
            title: 'Traditional Tokyo',
            description: 'Explore ancient temples.',
            activities: [
              { time: '09:00 AM', name: '⛩️ Senso-ji Temple' },
              { time: '12:00 PM', name: '🏯 Asakusa District' },
              { time: '02:00 PM', name: '🍜 Ramen Lunch' },
              { time: '04:00 PM', name: '🗾 Ueno Park' }
            ]
          },
          {
            title: 'Modern Tokyo',
            description: 'Experience futuristic Tokyo.',
            activities: [
              { time: '09:00 AM', name: '🏙️ Shibuya Crossing' },
              { time: '12:00 PM', name: '🛍️ Harajuku Shopping' },
              { time: '02:00 PM', name: '🍱 Street Food' },
              { time: '04:00 PM', name: '🎮 Akihabara' }
            ]
          },
          {
            title: 'Day Trip',
            description: 'Visit nearby attractions.',
            activities: [
              { time: '08:00 AM', name: '🚅 Mount Fuji View' },
              { time: '12:00 PM', name: '🏞️ Hakone' },
              { time: '02:00 PM', name: '🍜 Local Lunch' },
              { time: '05:00 PM', name: '🔥 Return to Tokyo' }
            ]
          },
          {
            title: 'Departure',
            description: 'Sayonara Tokyo.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'sydney': {
        name: 'Sydney',
        tagline: 'Marvel at Sydney\'s stunning harbor, iconic landmarks, and laid-back coastal beauty that captures the essence of Australia.',
        duration: 4,
        rating: 4.8,
        groupSize: 12,
        headerImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&q=80',
        price: {
          basic: 1499,
          premium: 2199,
          luxury: 3199
        },
        gallery: [
          'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
          'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80',
          'https://plus.unsplash.com/premium_photo-1697730224601-a3c867ac1886?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1559650036-7598504cfaac?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Sydney Arrival',
            description: 'Welcome to Sydney.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🌉 Harbour Bridge' },
              { time: '08:00 PM', name: '🍤 Seafood Dinner' }
            ]
          },
          {
            title: 'Harbour Highlights',
            description: 'Explore Sydney Harbour.',
            activities: [
              { time: '09:00 AM', name: '🏰 Sydney Opera House' },
              { time: '12:00 PM', name: '🚤 Harbour Cruise' },
              { time: '02:00 PM', name: '🍔 Australian Lunch' },
              { time: '04:00 PM', name: '🗽 Harbour Bridge Climb' }
            ]
          },
          {
            title: 'Beaches & Nature',
            description: 'Relax at famous beaches.',
            activities: [
              { time: '09:00 AM', name: '🏖️ Bondi Beach' },
              { time: '12:00 PM', name: '🌊 Beach Activities' },
              { time: '02:00 PM', name: '🍉 Beachside Lunch' },
              { time: '04:00 PM', name: '🏞️ Royal Botanic Gardens' }
            ]
          },
          {
            title: 'Departure',
            description: 'Farewell Sydney.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'hawaii': {
        name: 'Hawaii Paradise',
        tagline: 'Discover Hawaii\'s volcanic landscapes, pristine beaches, and aloha spirit in this tropical paradise of islands.',
        duration: 7,
        rating: 4.9,
        groupSize: 12,
        headerImage: 'https://images.unsplash.com/photo-1545251142-f32339076e6d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 1899,
          premium: 2699,
          luxury: 3999
        },
        gallery: [
          'https://images.unsplash.com/photo-1633511090690-0b7f2fec0e8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1547537352-ae90c682877e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1607896477836-891800269642?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1587000344419-d49f7414ba1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Arrival in Honolulu, Oahu',
            description: 'Welcome to Hawaii! Settle into island life with a traditional lei greeting.',
            activities: [
              { time: '10:00 AM', name: '✈️ Airport Transfer to Waikiki' },
              { time: '12:00 PM', name: '🏨 Check-in at Beachfront Resort' },
              { time: '02:00 PM', name: '🌺 Traditional Lei Greeting & Orientation' },
              { time: '04:00 PM', name: '🏖️ Waikiki Beach Relaxation' },
              { time: '07:00 PM', name: '🍜 Luau Dinner with Hula Show' }
            ]
          },
          {
            title: 'Oahu Island Exploration',
            description: 'Discover Pearl Harbor, Diamond Head, and North Shore.',
            activities: [
              { time: '08:00 AM', name: '🚗 Guided Island Tour' },
              { time: '10:00 AM', name: '⛵ Pearl Harbor Memorial Visit' },
              { time: '01:00 PM', name: '🍔 Hawaiian BBQ Lunch' },
              { time: '03:00 PM', name: '🏔️ Diamond Head Hike' },
              { time: '06:00 PM', name: '🌅 North Shore Sunset' }
            ]
          },
          {
            title: 'Maui Island Adventure',
            description: 'Fly to Maui for Road to Hana and Haleakalā sunrise.',
            activities: [
              { time: '07:00 AM', name: '✈️ Inter-island Flight to Maui' },
              { time: '09:00 AM', name: '🚗 Road to Hana Scenic Drive' },
              { time: '01:00 PM', name: '🍍 Maui Tropical Fruit Lunch' },
              { time: '03:00 PM', name: '🌋 Haleakalā Sunrise (next day prep)' },
              { time: '07:00 PM', name: '🎶 Maui Ukulele & Hula Lesson' }
            ]
          },
          {
            title: 'Big Island Volcano Discovery',
            description: 'Explore Hawaii Volcanoes National Park and black sand beaches.',
            activities: [
              { time: '08:00 AM', name: '✈️ Flight to Big Island' },
              { time: '10:00 AM', name: '🌋 Kīlauea Volcano Visit' },
              { time: '01:00 PM', name: '🏖️ Punalu\'u Black Sand Beach' },
              { time: '03:00 PM', name: '🌺 Hawai\'i Tropical Botanical Garden' },
              { time: '07:00 PM', name: '🍲 Island-style Seafood Dinner' }
            ]
          },
          {
            title: 'Kauai Garden Isle',
            description: 'Experience Kauai\'s lush landscapes and Na Pali Coast.',
            activities: [
              { time: '08:00 AM', name: '✈️ Flight to Kauai' },
              { time: '10:00 AM', name: '🚤 Na Pali Coast Boat Tour' },
              { time: '01:00 PM', name: '🍲 Kauai Ahi Poke Lunch' },
              { time: '03:00 PM', name: '🏞️ Waimea Canyon Exploration' },
              { time: '07:00 PM', name: '🎨 Kauai Cultural Performance' }
            ]
          },
          {
            title: 'Relaxation & Optional Activities',
            description: 'Free day for snorkeling, surfing, or simply relaxing.',
            activities: [
              { time: '09:00 AM', name: '🤿 Snorkeling at Molokini Crater' },
              { time: '09:00 AM', name: '🏄‍♂️ Surf Lesson in Waikiki' },
              { time: '09:00 AM', name: '🧘 Yoga on the Beach' },
              { time: '07:00 PM', name: '🎉 Farewell Island Party' }
            ]
          },
          {
            title: 'Departure from Honolulu',
            description: 'Aloha and safe travels home.',
            activities: [
              { time: '08:00 AM', name: '🍳 Hawaiian Breakfast' },
              { time: '10:00 AM', name: '🏨 Check-out' },
              { time: '12:00 PM', name: '🛍️ Last-minute Souvenir Shopping' },
              { time: '02:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'malaga': {
        name: 'Malaga',
        tagline: 'Bask in the sunny Mediterranean charm of Malaga, where historic fortresses meet pristine beaches and vibrant culture.',
        duration: 3,
        rating: 4.7,
        groupSize: 8,
        headerImage: 'https://plus.unsplash.com/premium_photo-1697729447724-e7ba3a96186a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 599,
          premium: 899,
          luxury: 1299
        },
        gallery: [
          'https://plus.unsplash.com/premium_photo-1697729549014-2faefb25efba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsYWdhfGVufDB8fDB8fHww',
          'https://images.unsplash.com/photo-1553775556-80669b94bfa5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1625396806699-0268fa6f18dc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1598222836613-a3bd8cba5fff?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Malaga Arrival',
            description: 'Welcome to Andalusia.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏰 Alcazaba Fortress' },
              { time: '08:00 PM', name: '🥘 Tapas Dinner' }
            ]
          },
          {
            title: 'Coastal Exploration',
            description: 'Enjoy Malaga\'s beaches and culture.',
            activities: [
              { time: '09:00 AM', name: '🏖️ Playa de la Malagueta' },
              { time: '12:00 PM', name: '🍤 Seafood Lunch' },
              { time: '02:00 PM', name: '🖼️ Picasso Museum' },
              { time: '04:00 PM', name: '🚤 Coastal Walk' }
            ]
          },
          {
            title: 'Departure',
            description: 'Adios Malaga.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'vienna': {
        name: 'Vienna',
        tagline: 'Indulge in Vienna\'s imperial elegance, world-class music, and stunning architecture that embodies classical beauty.',
        duration: 4,
        rating: 4.8,
        groupSize: 10,
        headerImage: 'https://plus.unsplash.com/premium_photo-1716932567535-6bb42a3f38ff?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 799,
          premium: 1199,
          luxury: 1699
        },
        gallery: [
          'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1589194379031-6b7606daa33d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1734607528318-93d8e83408a8?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1702217560239-8003b9970fc8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Vienna Arrival',
            description: 'Welcome to the City of Music.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏰 Schönbrunn Palace' },
              { time: '08:00 PM', name: '🎻 Classical Concert' }
            ]
          },
          {
            title: 'Imperial Vienna',
            description: 'Explore Vienna\'s palaces.',
            activities: [
              { time: '09:00 AM', name: '🏰 Hofburg Palace' },
              { time: '12:00 PM', name: '🍰 Sachertorte & Coffee' },
              { time: '02:00 PM', name: '🖼️ Belvedere Palace' },
              { time: '04:00 PM', name: '🌳 Stadtpark' }
            ]
          },
          {
            title: 'Music & Culture',
            description: 'Experience Vienna\'s musical heritage.',
            activities: [
              { time: '09:00 AM', name: '🎼 Vienna State Opera' },
              { time: '12:00 PM', name: '🥩 Wiener Schnitzel Lunch' },
              { time: '02:00 PM', name: '🎨 Naschmarkt' },
              { time: '04:00 PM', name: '🎶 Danube River Cruise' }
            ]
          },
          {
            title: 'Departure',
            description: 'Auf Wiedersehen Vienna.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'munich': {
        name: 'Munich',
        tagline: 'Discover the vibrant Bavarian capital, where beer gardens, historic architecture, and modern innovation blend seamlessly.',
        duration: 4,
        rating: 4.7,
        groupSize: 10,
        headerImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80',
        price: {
          basic: 699,
          premium: 999,
          luxury: 1499
        },
        gallery: [
          'https://plus.unsplash.com/premium_photo-1661963646444-ea17cd77c212?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1599982890963-3aabd60064d2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1661886457733-2d936843cd70?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1588061728145-54ace02ab9cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Munich Arrival',
            description: 'Welcome to the Bavarian capital.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏰 Marienplatz' },
              { time: '08:00 PM', name: '🍺 Beer Garden Dinner' }
            ]
          },
          {
            title: 'Historic Munich',
            description: 'Explore Munich\'s history and culture.',
            activities: [
              { time: '09:00 AM', name: '🏰 Neuschwanstein Castle Day Trip' },
              { time: '12:00 PM', name: '🥨 Bavarian Lunch' },
              { time: '02:00 PM', name: '🖼️ Alte Pinakothek Museum' },
              { time: '04:00 PM', name: '🌳 English Garden' }
            ]
          },
          {
            title: 'Modern Munich',
            description: 'Experience contemporary Munich.',
            activities: [
              { time: '09:00 AM', name: '🏟️ Allianz Arena' },
              { time: '12:00 PM', name: '🍔 Street Food' },
              { time: '02:00 PM', name: '🛍️ Viktualienmarkt' },
              { time: '04:00 PM', name: '🚤 Isar River Cruise' }
            ]
          },
          {
            title: 'Departure',
            description: 'Auf Wiedersehen Munich.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'nice': {
        name: 'Nice',
        tagline: 'Relax on the French Riviera in Nice, where stunning beaches, colorful markets, and Mediterranean charm create an idyllic escape.',
        duration: 3,
        rating: 4.6,
        groupSize: 8,
        headerImage: 'https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 599,
          premium: 899,
          luxury: 1299
        },
        gallery: [
          'https://plus.unsplash.com/premium_photo-1688137881227-91b6322c5fe3?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1618079167568-f480a967d4c3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1674676618294-032e247cd5f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1490113355845-cdc3b65f0189?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Nice Arrival',
            description: 'Welcome to the French Riviera.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in' },
              { time: '06:00 PM', name: '🏖️ Promenade des Anglais' },
              { time: '08:00 PM', name: '🥘 French Riviera Dinner' }
            ]
          },
          {
            title: 'Coastal Exploration',
            description: 'Enjoy Nice\'s beaches and culture.',
            activities: [
              { time: '09:00 AM', name: '🏰 Eze Village' },
              { time: '12:00 PM', name: '🍤 Seafood Lunch' },
              { time: '02:00 PM', name: '🖼️ Musée Matisse' },
              { time: '04:00 PM', name: '🌊 Beach Time' }
            ]
          },
          {
            title: 'Departure',
            description: 'Au revoir Nice.',
            activities: [
              { time: '09:00 AM', name: '🛍️ Shopping' },
              { time: '11:00 AM', name: '🏨 Check-out' },
              { time: '01:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'morocco': {
        name: 'Morocco Cultural Journey',
        tagline: 'Immerse yourself in Morocco\'s rich culture, from bustling souks to serene deserts and historic medinas.',
        duration: 7,
        rating: 4.8,
        groupSize: 12,
        headerImage: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 1299,
          premium: 1799,
          luxury: 2499
        },
        gallery: [
          'https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1682097617396-e510665e0dc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Marrakech Arrival & Jemaa el-Fnaa',
            description: 'Arrive in Marrakech and explore the vibrant main square.',
            activities: [
              { time: '02:00 PM', name: '✈️ Airport Transfer to Marrakech' },
              { time: '04:00 PM', name: '🏨 Riad Check-in in Medina' },
              { time: '06:00 PM', name: '🏛️ Jemaa el-Fnaa Square Exploration' },
              { time: '08:00 PM', name: '🍲 Traditional Moroccan Dinner' }
            ]
          },
          {
            title: 'Bahia Palace & Saadian Tombs',
            description: 'Discover Marrakech\'s stunning palaces and tombs.',
            activities: [
              { time: '09:00 AM', name: '🏰 Bahia Palace Visit' },
              { time: '11:00 AM', name: '🏛️ Saadian Tombs Tour' },
              { time: '01:00 PM', name: '🥘 Tagine Lunch at Local Restaurant' },
              { time: '03:00 PM', name: '🛍️ Souk Shopping in Medina' },
              { time: '07:00 PM', name: '🎭 Moroccan Folklore Show' }
            ]
          },
          {
            title: 'Atlas Mountains & Ourika Valley',
            description: 'Day trip to the mountains and Berber villages.',
            activities: [
              { time: '08:00 AM', name: '🚗 Drive to Ourika Valley' },
              { time: '10:00 AM', name: '🏔️ Berber Village Visit' },
              { time: '12:30 PM', name: '🍲 Berber Family Lunch' },
              { time: '02:30 PM', name: '💧 Waterfall Hike' },
              { time: '05:00 PM', name: '🚗 Return to Marrakech' }
            ]
          },
          {
            title: 'Travel to Fes',
            description: 'Journey to Morocco\'s spiritual capital.',
            activities: [
              { time: '08:00 AM', name: '🚗 Transfer to Fes (6 hours)' },
              { time: '03:00 PM', name: '🏨 Riad Check-in in Fes Medina' },
              { time: '05:00 PM', name: '🕌 Bou Inania Madrasa' },
              { time: '07:00 PM', name: '🍲 Fes Cuisine Dinner' }
            ]
          },
          {
            title: 'Fes Medina Exploration',
            description: 'Wander through the world\'s largest car-free urban area.',
            activities: [
              { time: '09:00 AM', name: '🕌 Kairaouine Mosque Exterior' },
              { time: '11:00 AM', name: '🎨 Leather Tannery Visit' },
              { time: '01:00 PM', name: '🥙 Pastilla Lunch' },
              { time: '03:00 PM', name: '🏺 Pottery Workshop' },
              { time: '06:00 PM', name: '🌅 Medina Sunset Walk' }
            ]
          },
          {
            title: 'Chefchaouen Blue City',
            description: 'Visit the picturesque blue-washed mountain town.',
            activities: [
              { time: '08:00 AM', name: '🚗 Transfer to Chefchaouen (4 hours)' },
              { time: '01:00 PM', name: '🏘️ Blue City Exploration' },
              { time: '03:00 PM', name: '🍵 Mint Tea in Mountain Cafe' },
              { time: '05:00 PM', name: '🚗 Return to Fes' },
              { time: '09:00 PM', name: '🍲 Farewell Moroccan Feast' }
            ]
          },
          {
            title: 'Departure from Marrakech',
            description: 'Final day and airport transfer.',
            activities: [
              { time: '08:00 AM', name: '🚗 Transfer back to Marrakech' },
              { time: '11:00 AM', name: '🛍️ Last-minute Souk Shopping' },
              { time: '01:00 PM', name: '🏨 Hotel Check-out' },
              { time: '03:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      },
      'himalayan': {
        name: 'Himalayan Trekking Adventure',
        tagline: 'Challenge yourself with breathtaking mountain treks through the world\'s highest peaks.',
        duration: 14,
        rating: 4.9,
        groupSize: 8,
        headerImage: 'https://images.unsplash.com/photo-1617380613434-7495e9b45dfb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: {
          basic: 1899,
          premium: 2499,
          luxury: 3499
        },
        gallery: [
          'https://images.unsplash.com/photo-1740383237104-4cceff1d355b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1761926041609-10ea291c463e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1740383236873-847e012c2878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1692102550644-b3969be679ad?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        itinerary: [
          {
            title: 'Kathmandu Arrival & Acclimatization',
            description: 'Arrive in Nepal\'s capital and begin your Himalayan adventure.',
            activities: [
              { time: '02:00 PM', name: '✈️ Kathmandu Airport Transfer' },
              { time: '04:00 PM', name: '🏨 Hotel Check-in & Briefing' },
              { time: '06:00 PM', name: '🏛️ Swayambhunath Temple Visit' },
              { time: '08:00 PM', name: '🍛 Traditional Nepali Dinner' }
            ]
          },
          {
            title: 'Kathmandu Cultural Exploration',
            description: 'Explore ancient temples and prepare for the trek.',
            activities: [
              { time: '09:00 AM', name: '🏰 Pashupatinath Temple' },
              { time: '12:00 PM', name: '🥗 Trek Preparation & Gear Check' },
              { time: '02:00 PM', name: '🏯 Boudhanath Stupa' },
              { time: '06:00 PM', name: '🎭 Cultural Dance Performance' }
            ]
          },
          {
            title: 'Fly to Lukla & Trek to Phakding',
            description: 'Begin the Everest Base Camp trek from Lukla.',
            activities: [
              { time: '06:00 AM', name: '✈️ Scenic Flight to Lukla' },
              { time: '08:00 AM', name: '🥾 Start Trek to Phakding' },
              { time: '12:00 PM', name: '🍲 Lunch at Tea House' },
              { time: '04:00 PM', name: '🏞️ Dudh Koshi River Crossing' }
            ]
          },
          {
            title: 'Trek to Namche Bazaar',
            description: 'Ascend to the gateway of Everest with stunning views.',
            activities: [
              { time: '08:00 AM', name: '🥾 Trek to Namche Bazaar' },
              { time: '12:00 PM', name: '🏔️ First Everest View' },
              { time: '02:00 PM', name: '🛍️ Sherpa Market Exploration' },
              { time: '04:00 PM', name: '🏯 Visit Hillary School' }
            ]
          },
          {
            title: 'Acclimatization Day in Namche',
            description: 'Rest and acclimate to the altitude with short hikes.',
            activities: [
              { time: '09:00 AM', name: '🏔️ Acclimatization Hike' },
              { time: '12:00 PM', name: '🧘 Meditation Session' },
              { time: '02:00 PM', name: '🏛️ Khumjung Monastery' },
              { time: '06:00 PM', name: '🌅 Everest Sunset View' }
            ]
          },
          {
            title: 'Trek to Tengboche Monastery',
            description: 'Visit the famous monastery with panoramic mountain views.',
            activities: [
              { time: '08:00 AM', name: '🥾 Trek to Tengboche' },
              { time: '12:00 PM', name: '🍛 Monastery Lunch' },
              { time: '02:00 PM', name: '🛕 Tengboche Monastery Ceremony' },
              { time: '04:00 PM', name: '🏔️ Ama Dablam Viewpoint' }
            ]
          },
          {
            title: 'Trek to Dingboche',
            description: 'Continue through stunning alpine landscapes.',
            activities: [
              { time: '08:00 AM', name: '🥾 Trek to Dingboche' },
              { time: '12:00 PM', name: '🍲 High-Altitude Lunch' },
              { time: '02:00 PM', name: '🏔️ Island Peak & Lhotse Views' },
              { time: '04:00 PM', name: '🧥 Yak Farm Visit' }
            ]
          },
          {
            title: 'Trek to Lobuche',
            description: 'Approach the base camp area with challenging terrain.',
            activities: [
              { time: '08:00 AM', name: '🥾 Trek to Lobuche' },
              { time: '12:00 PM', name: '🍛 Lobuche Lunch' },
              { time: '02:00 PM', name: '🏔️ Khumbu Glacier View' },
              { time: '04:00 PM', name: '🗻 Memorial Stones' }
            ]
          },
          {
            title: 'Everest Base Camp & Kala Patthar',
            description: 'Reach the base camp and summit Kala Patthar for sunrise.',
            activities: [
              { time: '04:00 AM', name: '🥾 Trek to Everest Base Camp' },
              { time: '08:00 AM', name: '🏔️ Base Camp Celebration' },
              { time: '10:00 AM', name: '🥾 Kala Patthar Summit' },
              { time: '12:00 PM', name: '🌅 Everest Sunrise' }
            ]
          },
          {
            title: 'Return Trek to Pheriche',
            description: 'Begin the descent with time for reflection.',
            activities: [
              { time: '08:00 AM', name: '🥾 Descent to Pheriche' },
              { time: '12:00 PM', name: '🍛 Pheriche Lunch' },
              { time: '02:00 PM', name: '🏥 Himalayan Rescue Association' },
              { time: '04:00 PM', name: '🌸 Alpine Flowers' }
            ]
          },
          {
            title: 'Trek to Namche & Lukla',
            description: 'Continue descent through familiar trails.',
            activities: [
              { time: '08:00 AM', name: '🥾 Trek to Namche' },
              { time: '12:00 PM', name: '🍲 Farewell Lunch' },
              { time: '02:00 PM', name: '🥾 Trek to Lukla' },
              { time: '06:00 PM', name: '🎉 Trek Completion Celebration' }
            ]
          },
          {
            title: 'Fly Back to Kathmandu',
            description: 'Return to the capital and relax.',
            activities: [
              { time: '08:00 AM', name: '✈️ Flight to Kathmandu' },
              { time: '11:00 AM', name: '🏨 Hotel Check-in' },
              { time: '01:00 PM', name: '🍛 Celebration Lunch' },
              { time: '03:00 PM', name: '🛍️ Souvenir Shopping' }
            ]
          },
          {
            title: 'Kathmandu Free Day & Departure',
            description: 'Final day in Kathmandu before departure.',
            activities: [
              { time: '09:00 AM', name: '🏰 Patan Durbar Square' },
              { time: '12:00 PM', name: '🥘 Final Nepali Meal' },
              { time: '02:00 PM', name: '🏨 Check-out' },
              { time: '04:00 PM', name: '✈️ Airport Transfer' }
            ]
          }
        ]
      }
    };
    
    this.destination = destinations[id as keyof typeof destinations] || destinations.asia;
  }

  openGallery(image: string) {
    this.selectedImage = image;
  }

  closeGallery() {
    this.selectedImage = null;
  }

  bookPackage(packageType: string, price: number) {
    if (!this.destination) return;

    // Prepare booking details
    const bookingDetails = {
      destination: this.destination.name,
      packageType,
      price,
      type: 'destination',
      title: `${this.destination.name} - ${packageType} Package`
    };

    // Navigate to booking page with destination details
    this.router.navigate(['/booking'], {
      state: { bookingData: bookingDetails }
    });
  }

  bookTour() {
    if (!this.destination) return;

    // Calculate 20% off premium package
    const price = this.destination.price.premium * 0.8;

    // Prepare booking details
    const bookingDetails = {
      destination: this.destination.name,
      packageType: 'premium',
      price: Math.round(price),
      discount: '20% off',
      type: 'destination',
      title: `${this.destination.name} - Premium Package (20% off)`
    };

    // Navigate to booking page with destination details
    this.router.navigate(['/booking'], {
      state: { bookingData: bookingDetails }
    });
  }
}