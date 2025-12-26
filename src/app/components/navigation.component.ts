import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <a routerLink="/" class="logo">
            <span class="logo-icon">✈️</span>
            <span class="logo-text">Source<span class="highlight">Expeditions</span></span>
          </a>
          
          <button class="menu-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div class="nav-menu" [class.active]="isMenuOpen">
          <div class="nav-links">
            <a routerLink="/" 
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: true}"
               (click)="closeMenu()">
              Home
            </a>
            <a routerLink="/flights" 
               routerLinkActive="active"
               (click)="closeMenu()">
              Flights
            </a>
            <a routerLink="/destinations" 
               routerLinkActive="active"
               (click)="closeMenu()">
              Destinations
            </a>
            <a routerLink="/tours" 
               routerLinkActive="active"
               (click)="closeMenu()">
              Tours
            </a>
            <a routerLink="/deals" 
               routerLinkActive="active"
               (click)="closeMenu()">
              Deals
            </a>
            <a routerLink="/about" 
               routerLinkActive="active"
               (click)="closeMenu()">
              About
            </a>
            <a routerLink="/contact" 
               routerLinkActive="active"
               (click)="closeMenu()">
              Contact
            </a>
          </div>
          
          <div class="nav-actions">
            <button class="btn btn-primary" *ngIf="!currentUser" routerLink="/signin">
              <span class="icon">👤</span>
              <span class="text">Sign In</span>
            </button>
            <div class="user-menu" *ngIf="currentUser">
              <span class="user-name">👤 {{currentUser.name}}</span>
              <button class="btn btn-secondary" (click)="signOut()">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 20px 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-brand {
      display: flex;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .logo-icon {
      margin-right: 10px;
      font-size: 1.8rem;
    }
    
    .logo-text {
      .highlight {
        color: #2563eb;
      }
    }
    
    .menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    
    .menu-toggle span {
      display: block;
      height: 3px;
      width: 100%;
      background: #1e293b;
      border-radius: 3px;
      transition: all 0.3s ease;
    }
    
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 40px;
    }
    
    .nav-links {
      display: flex;
      gap: 30px;
    }
    
    .nav-links a {
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      padding: 8px 0;
      position: relative;
      transition: color 0.3s ease;
    }
    
    .nav-links a:hover {
      color: #2563eb;
    }
    
    .nav-links a.active {
      color: #2563eb;
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: #2563eb;
      border-radius: 2px;
    }
    
    .nav-actions {
      .btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 24px;

        .icon {
          font-size: 1.1rem;
        }

        .text {
          display: inline;
        }
      }

      .user-menu {
        display: flex;
        align-items: center;
        gap: 15px;

        .user-name {
          font-weight: 600;
          color: #1e293b;
        }

        .btn {
          padding: 8px 16px;
          font-size: 0.875rem;
        }
      }
    }
    
    /* Mobile Styles */
    @media (max-width: 992px) {
      .container {
        flex-direction: column;
        align-items: stretch;
      }
      
      .nav-brand {
        justify-content: space-between;
      }
      
      .menu-toggle {
        display: flex;
      }
      
      .nav-menu {
        display: none;
        flex-direction: column;
        gap: 20px;
        padding-top: 20px;
      }
      
      .nav-menu.active {
        display: flex;
      }
      
      .nav-links {
        flex-direction: column;
        width: 100%;
        gap: 15px;
      }
      
      .nav-links a {
        padding: 12px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .nav-links a:last-child {
        border-bottom: none;
      }
      
      .nav-actions {
        width: 100%;
        
        .btn {
          width: 100%;
          justify-content: center;
        }
      }
      
      .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      
      .menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  `]
})
export class NavigationComponent implements OnInit {
  isMenuOpen = false;
  currentUser: any = null;

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}