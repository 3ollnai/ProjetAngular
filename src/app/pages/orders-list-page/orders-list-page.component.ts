import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  selectUserOrders,
  selectOrdersLoading,
  selectOrdersError,
} from '../../state/orders/orders.selectors';
import { loadUserOrders } from '../../state/orders/orders.actions';
import { products } from '../../../mocks/data';

@Component({
  selector: 'app-orders-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="orders-list-page">
      <div class="page-header">
        <h1>Mes Commandes</h1>
        <p class="subtitle">Consultez l'historique de toutes vos commandes</p>
      </div>

      @if (loading$ | async) {
        <div class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (error$ | async; as error) {
        <mat-card class="error-card">
          <mat-card-content>
            <div class="error-content">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ error }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      } @else if (orders$ | async; as orders) {
        @if (orders.length === 0) {
          <mat-card class="empty-card">
            <mat-card-content>
              <div class="empty-content">
                <mat-icon>shopping_bag</mat-icon>
                <h2>Aucune commande</h2>
                <p>Vous n'avez pas encore passé de commande.</p>
                <button mat-raised-button color="primary" routerLink="/app/products">
                  Découvrir nos produits
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        } @else {
          <div class="orders-grid">
            @for (order of orders; track order.id) {
              <mat-card class="order-card">
                <mat-card-header>
                  <div class="order-header">
                    <div>
                      <h3>Commande #{{ order.orderNumber }}</h3>
                      <p class="order-date">{{ order.createdAt | date: 'long' }}</p>
                    </div>
                    <mat-chip [ngClass]="'status-' + order.status">
                      {{ getStatusLabel(order.status) }}
                    </mat-chip>
                  </div>
                </mat-card-header>
                <mat-card-content>
                  <div class="order-items-preview">
                    <h4>Produits ({{ order.items.length }})</h4>
                    <div class="items-preview-grid">
                      @for (item of order.items; track item.product_id) {
                        <div class="item-preview">
                          <img
                            [src]="getProductImage(item.product_id)"
                            [alt]="item.product_name"
                            class="item-preview-image"
                            (error)="onImageError($event, item.product_id)"
                          />
                          <div class="item-preview-info">
                            <span class="item-name">{{ item.product_name }}</span>
                            <span class="item-quantity">x{{ item.quantity }}</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="order-summary">
                    <div class="summary-row">
                      <span>Total:</span>
                      <strong>€{{ order.total | number: '1.2-2' }}</strong>
                    </div>
                    @if (order.trackingNumber) {
                      <div class="summary-row">
                        <span>Suivi:</span>
                        <span class="tracking-number">{{ order.trackingNumber }}</span>
                      </div>
                    }
                  </div>

                  <div class="order-actions">
                    <button mat-raised-button color="primary" [routerLink]="['/app/orders/track', order.orderNumber]">
                      <mat-icon>local_shipping</mat-icon>
                      Suivre la commande
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [
    `
      .orders-list-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-header h1 {
        margin: 0 0 0.5rem 0;
        color: #1a1038;
        font-size: 2rem;
      }

      .subtitle {
        color: #666;
        margin: 0;
      }

      .loading-container {
        display: flex;
        justify-content: center;
        padding: 4rem;
      }

      .error-card {
        background: #ffebee;
        margin-bottom: 2rem;
      }

      .error-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #c62828;
      }

      .empty-card {
        text-align: center;
        padding: 4rem 2rem;
      }

      .empty-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .empty-content mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #ccc;
      }

      .orders-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .order-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
      }

      .order-header h3 {
        margin: 0 0 0.5rem 0;
        color: #1a1038;
      }

      .order-date {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
      }

      .order-items-preview {
        margin: 1.5rem 0;
      }

      .order-items-preview h4 {
        margin: 0 0 1rem 0;
        color: #1a1038;
        font-size: 1rem;
      }

      .items-preview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
      }

      .item-preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: #f9f9f9;
        border-radius: 8px;
      }

      .item-preview-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 6px;
        background: #f0f0f0;
      }

      .item-preview-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        text-align: center;
      }

      .item-name {
        font-size: 0.75rem;
        color: #1a1038;
        font-weight: 500;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .item-quantity {
        font-size: 0.7rem;
        color: #666;
      }

      .order-summary {
        margin: 1.5rem 0;
        padding: 1rem;
        background: #f8f4ff;
        border-radius: 8px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }

      .summary-row:last-child {
        margin-bottom: 0;
      }

      .summary-row strong {
        color: #7443ff;
        font-size: 1.2rem;
      }

      .tracking-number {
        font-family: monospace;
        color: #7443ff;
        font-weight: 600;
      }

      .order-actions {
        margin-top: 1.5rem;
      }

      .status-pending {
        background: #fff3e0;
        color: #e65100;
      }

      .status-confirmed {
        background: #e3f2fd;
        color: #1565c0;
      }

      .status-processing {
        background: #f3e5f5;
        color: #6a1b9a;
      }

      .status-shipped {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .status-in_transit {
        background: #e0f2f1;
        color: #00695c;
      }

      .status-delivered {
        background: #c8e6c9;
        color: #1b5e20;
      }

      .status-cancelled {
        background: #ffebee;
        color: #c62828;
      }

      @media (max-width: 768px) {
        .order-header {
          flex-direction: column;
          gap: 1rem;
        }

        .items-preview-grid {
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
      }
    `,
  ],
})
export class OrdersListPageComponent implements OnInit {
  orders$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router, private snackBar: MatSnackBar) {
    this.orders$ = this.store.select(selectUserOrders);
    this.loading$ = this.store.select(selectOrdersLoading);
    this.error$ = this.store.select(selectOrdersError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserOrders());
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En traitement',
      shipped: 'Expédiée',
      in_transit: 'En transit',
      delivered: 'Livrée',
      cancelled: 'Annulée',
    };
    return labels[status] || status;
  }

  getProductImage(productId: number): string {
    const product = products.find((p) => p.id === productId);
    return product?.image || `https://via.placeholder.com/200x200?text=Product+${productId}`;
  }

  onImageError(event: Event, productId: number): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://via.placeholder.com/200x200?text=Product+${productId}`;
  }
}

