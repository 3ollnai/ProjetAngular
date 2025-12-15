import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from './state/auth/auth.selectors';
import { logout } from './state/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-10 space-y-4">
      <h2 class="text-2xl font-semibold">My Shop</h2>
      <p class="text-gray-600">Welcome to My Shop! Navigate to the different sections below.</p>
      
      @if (isAuthenticated$ | async) {
        <div class="auth-status">
          <mat-chip color="primary">✓ Logged in</mat-chip>
          <button mat-button color="warn" (click)="onLogout()">Logout</button>
        </div>
      } @else {
        <div class="auth-status">
          <mat-chip>Not logged in</mat-chip>
        </div>
      }

      <mat-card>
        <mat-card-content>
          <h3 class="mb-4">Navigation</h3>
          <nav class="flex flex-wrap gap-3">
            <button mat-raised-button color="primary" routerLink="/app/login">
              Login
            </button>
            <button mat-raised-button color="primary" routerLink="/app/products">
              Products
            </button>
            <button mat-raised-button color="primary" routerLink="/app/rating">
              Product Rating
            </button>
            <button mat-button routerLink="/dev">
              Dev Zone
            </button>
            <button mat-button routerLink="/">
              Home
            </button>
          </nav>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .auth-status {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .mb-4 {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class AppPlaceholderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
