import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatChipsModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="product-card" [routerLink]="['/app/products', productId]">
      <div class="product-image-container">
        <img [src]="image" [alt]="name" class="product-image" (error)="onImageError($event)" />
        @if (avgRating !== null && avgRating !== undefined) {
          <div class="rating-badge">
            <mat-icon>star</mat-icon>
            <span>{{ avgRating.toFixed(1) }}</span>
          </div>
        }
      </div>
      <mat-card-content class="product-content">
        <h3 class="product-name">{{ name }}</h3>
        <div class="product-footer">
          <div class="price">€{{ price | number: '1.2-2' }}</div>
          <button
            mat-icon-button
            color="primary"
            class="add-to-cart-btn"
            (click)="onAddToCart($event)"
            [attr.aria-label]="'Ajouter ' + name + ' au panier'"
          >
            <mat-icon>shopping_cart</mat-icon>
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .product-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border-radius: 12px;
        overflow: hidden;
      }

      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      .product-image-container {
        position: relative;
        width: 100%;
        height: 280px;
        overflow: hidden;
        background: #f5f5f5;
      }

      .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .product-card:hover .product-image {
        transform: scale(1.05);
      }

      .rating-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        background: rgba(255, 255, 255, 0.95);
        padding: 6px 10px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ff9800;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .rating-badge mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #ff9800;
      }

      .product-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      .product-name {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
        font-weight: 500;
        color: #1a1038;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        min-height: 2.8em;
      }

      .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
      }

      .price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #7443ff;
      }

      .add-to-cart-btn {
        background: rgba(116, 67, 255, 0.1);
        transition: background 0.2s ease;
      }

      .add-to-cart-btn:hover {
        background: rgba(116, 67, 255, 0.2);
      }

      .add-to-cart-btn mat-icon {
        color: #7443ff;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() productId = 0;
  @Input() name = '';
  @Input() price = 0;
  @Input() image = '';
  @Input() avgRating: number | null = null;
  @Input() onAddToCartClick?: (productId: number) => void;

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(this.name)}`;
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    if (this.onAddToCartClick) {
      this.onAddToCartClick(this.productId);
    }
  }
}

