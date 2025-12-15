import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../../mocks/data';
import { products } from '../../../mocks/data';
import { addItem } from '../../state/cart/cart.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="product-details-page">
      @if (product$ | async; as product) {
        <div class="product-details-content">
          <button mat-button routerLink="/app/products" class="back-button">
            <mat-icon>arrow_back</mat-icon>
            Retour aux produits
          </button>

          <mat-card class="product-details-card">
            <div class="product-header">
              <h1>{{ product.name }}</h1>
              <div class="product-price">€{{ product.price | number: '1.2-2' }}</div>
            </div>

            <div class="product-info">
              <div class="info-item">
                <strong>ID Produit:</strong>
                <span>#{{ product.id }}</span>
              </div>
              <div class="info-item">
                <strong>Date de création:</strong>
                <span>{{ product.created_at | date: 'long' }}</span>
              </div>
              <div class="info-item">
                <strong>Propriétaire:</strong>
                <span>#{{ product.owner_id }}</span>
              </div>
              @if (product.ratings && product.ratings.length > 0) {
                <div class="info-item">
                  <strong>Note moyenne:</strong>
                  <span>
                    <mat-icon>star</mat-icon>
                    {{ getAverageRating(product.ratings).toFixed(1) }} ({{ product.ratings.length }} avis)
                  </span>
                </div>
              }
            </div>

            <div class="add-to-cart-section">
              <mat-form-field appearance="outline" class="quantity-field">
                <mat-label>Quantité</mat-label>
                <input matInput type="number" [(ngModel)]="quantity" min="1" value="1" />
              </mat-form-field>

              <button mat-raised-button color="primary" class="add-to-cart-btn" (click)="addToCart(product)">
                <mat-icon>shopping_cart</mat-icon>
                Ajouter au panier
              </button>
            </div>
          </mat-card>
        </div>
      } @else {
        <div class="loading-container">
          <p>Chargement du produit...</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .product-details-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
      }

      .back-button {
        margin-bottom: 1.5rem;
      }

      .product-details-card {
        padding: 2rem;
      }

      .product-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #eee;
      }

      .product-header h1 {
        margin: 0;
        color: #1a1038;
        font-size: 2rem;
      }

      .product-price {
        font-size: 2rem;
        font-weight: bold;
        color: #7443ff;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f9f9f9;
        border-radius: 8px;
      }

      .info-item strong {
        color: #666;
      }

      .info-item span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #1a1038;
      }

      .info-item mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #ffc107;
      }

      .add-to-cart-section {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        padding-top: 1.5rem;
        border-top: 2px solid #eee;
      }

      .quantity-field {
        width: 120px;
      }

      .add-to-cart-btn {
        flex: 1;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      .loading-container {
        text-align: center;
        padding: 4rem;
        color: #666;
      }

      @media (max-width: 768px) {
        .product-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .add-to-cart-section {
          flex-direction: column;
        }

        .add-to-cart-btn {
          width: 100%;
        }
      }
    `,
  ],
})
export class ProductDetailsPageComponent implements OnInit {
  product$!: Observable<Product | null>;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      map((params) => Number(params['id'])),
      map((id) => products.find((p) => p.id === id) || null)
    );
  }

  getAverageRating(ratings: { user_id: number; value: number }[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    return sum / ratings.length;
  }

  addToCart(product: Product): void {
    if (this.quantity < 1) {
      this.snackBar.open('La quantité doit être au moins 1', 'Fermer', { duration: 3000 });
      return;
    }

    this.store.dispatch(addItem({ product, quantity: this.quantity }));
    this.snackBar.open(`${this.quantity} × ${product.name} ajouté au panier`, 'Fermer', {
      duration: 3000,
    });
  }
}

