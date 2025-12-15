import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadRating } from '../../state/products/products.actions';
import { selectRating, selectRatingLoading, selectRatingError } from '../../state/products/products.selectors';

@Component({
  selector: 'app-product-rating-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  template: `
    <div class="rating-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Product Rating</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #ratingForm="ngForm" class="rating-form">
            <mat-form-field appearance="outline">
              <mat-label>Product ID</mat-label>
              <input matInput type="number" [(ngModel)]="productId" name="productId" min="1" required />
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loading$ | async">
              @if (loading$ | async) {
                <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
              } @else {
                Load Rating
              }
            </button>
          </form>

          @if (error$ | async; as error) {
            <div class="error-message">{{ error }}</div>
          }

          @if (loading$ | async) {
            <div class="loading-container">
              <mat-spinner></mat-spinner>
            </div>
          } @else if (rating$ | async; as rating) {
            @if (rating.productId) {
              <div class="rating-result">
                <h3>Product #{{ rating.productId }}</h3>
                <div class="rating-display">
                  <div class="rating-value">
                    <mat-icon>star</mat-icon>
                    <span class="avg-rating">{{ rating.avgRating?.toFixed(1) || 'N/A' }}</span>
                  </div>
                  <div class="rating-count">
                    <span>{{ rating.count || 0 }} rating(s)</span>
                  </div>
                </div>
              </div>
            } @else {
              <p class="no-rating">Enter a product ID and click "Load Rating" to see the rating.</p>
            }
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .rating-container {
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
      }

      .rating-form {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        margin-bottom: 2rem;
      }

      .rating-form mat-form-field {
        flex: 1;
      }

      .error-message {
        color: #f44336;
        margin: 1rem 0;
        font-size: 0.875rem;
      }

      .loading-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
      }

      .no-rating {
        text-align: center;
        padding: 2rem;
        color: #666;
      }

      .rating-result {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #f5f5f5;
        border-radius: 8px;
      }

      .rating-result h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      .rating-display {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .rating-value {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 500;
      }

      .rating-value mat-icon {
        color: #ffc107;
      }

      .avg-rating {
        font-size: 2rem;
      }

      .rating-count {
        color: #666;
        font-size: 0.875rem;
      }

      .inline-spinner {
        display: inline-block;
        margin-right: 0.5rem;
      }
    `,
  ],
})
export class ProductRatingPageComponent {
  productId = 1;

  rating$: Observable<{ productId: number | null; avgRating: number | null; count: number | null }>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.rating$ = this.store.select(selectRating);
    this.loading$ = this.store.select(selectRatingLoading);
    this.error$ = this.store.select(selectRatingError);
  }

  onSubmit(): void {
    this.store.dispatch(loadRating({ id: this.productId }));
  }
}

