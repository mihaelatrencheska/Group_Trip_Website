import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>About SourceExpeditions</h1>
        <p>Your trusted partner in extraordinary travel experiences</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>Our Story</h2>
            <p>Founded in 2025, SourceExpeditions began with a simple mission: to make extraordinary travel accessible to everyone. What started as a small team of passionate travelers has grown into a global travel company, helping thousands of adventurers explore the world.</p>
            <p>We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories. Our team works tirelessly to curate unique experiences that go beyond typical tourism.</p>
          </div>
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Team">
          </div>
        </div>

        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Happy Travelers</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">150+</div>
              <div class="stat-label">Destinations</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">98%</div>
              <div class="stat-label">Satisfaction Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">15</div>
              <div class="stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        <div class="values-section">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🌍</div>
              <h3>Sustainable Travel</h3>
              <p>We prioritize eco-friendly practices and support local communities in all our destinations.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🤝</div>
              <h3>Authentic Experiences</h3>
              <p>We create journeys that offer genuine cultural immersion and meaningful connections.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">⭐</div>
              <h3>Excellence in Service</h3>
              <p>Our dedicated team ensures every detail is perfect, from booking to return.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">💎</div>
              <h3>Unbeatable Value</h3>
              <p>We offer premium experiences at competitive prices with transparent pricing.</p>
            </div>
          </div>
        </div>

        <div class="team-section">
          <h2>Meet Our Leadership Team</h2>
          <div class="team-grid">
            <div class="team-member" *ngFor="let member of teamMembers">
              <img [src]="member.image" [alt]="member.name">
              <div class="member-info">
                <h3>{{member.name}}</h3>
                <p class="position">{{member.position}}</p>
                <p class="bio">{{member.bio}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                   url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 80px;
    }
    
    .about-text {
      h2 {
        font-size: 2.5rem;
        margin-bottom: 25px;
        color: #1e293b;
      }
      
      p {
        color: #475569;
        line-height: 1.8;
        margin-bottom: 20px;
        font-size: 1.125rem;
      }
    }
    
    .about-image {
      img {
        width: 100%;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
    }
    
    .stats-section {
      background: #f8fafc;
      padding: 80px 40px;
      border-radius: 30px;
      margin-bottom: 80px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      text-align: center;
    }
    
    .stat-card {
      .stat-number {
        font-size: 3.5rem;
        font-weight: 700;
        color: #f59e0b;
        margin-bottom: 10px;
      }
      
      .stat-label {
        font-size: 1.125rem;
        color: #475569;
        font-weight: 500;
      }
    }
    
    .values-section {
      margin-bottom: 80px;
      
      h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 50px;
        color: #1e293b;
      }
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .value-card {
      text-align: center;
      padding: 40px 30px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-10px);
      }
      
      .value-icon {
        font-size: 3rem;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: #1e293b;
      }
      
      p {
        color: #64748b;
        line-height: 1.6;
      }
    }
    
    .team-section {
      h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 50px;
        color: #1e293b;
      }
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .team-member {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
    }
    
    .member-info {
      padding: 30px;
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 5px;
        color: #1e293b;
      }
      
      .position {
        color: #f59e0b;
        font-weight: 600;
        margin-bottom: 15px;
      }
      
      .bio {
        color: #64748b;
        line-height: 1.6;
      }
    }
    
    @media (max-width: 768px) {
      .page-header {
        padding: 80px 20px;
        
        h1 {
          font-size: 2.5rem;
        }
      }
      
      .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .values-grid {
        grid-template-columns: 1fr;
      }
      
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Mihaela Trencheska',
      position: 'CEO & Founder',
      bio: 'Passionate traveler with 10+ years in the travel industry and extensive tech experience. Started SourceExpeditions to share her love for authentic travel experiences.',
      image: 'https://plus.unsplash.com/premium_photo-1714051661316-4432704b02f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Michael Chen',
      position: 'Head of Operations',
      bio: 'Former hotel executive with expertise in luxury travel and customer service excellence.',
      image: 'https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Maria Rodriguez',
      position: 'Destination Director',
      bio: 'Multilingual travel expert with deep knowledge of European and South American destinations.',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];
}