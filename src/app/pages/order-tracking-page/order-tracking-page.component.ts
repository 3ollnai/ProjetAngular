import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  selectCurrentOrder,
  selectCurrentTracking,
  selectOrdersLoading,
  selectTrackingLoading,
  selectOrdersError,
} from '../../state/orders/orders.selectors';
import * as OrdersActions from '../../state/orders/orders.actions';
import { products } from '../../../mocks/data';

@Component({
  selector: 'app-order-tracking-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="tracking-page">
      <div class="page-header">
        <button mat-button routerLink="/app/products" class="back-button">
          <mat-icon>arrow_back</mat-icon>
          Retour au catalogue
        </button>
        <h1>Suivi de commande</h1>
        <p class="subtitle">Suivez l'état de votre commande en temps réel</p>
      </div>

      <div class="search-section">
        <mat-card class="search-card">
          <mat-card-content>
            <form (ngSubmit)="onSearchOrder()" class="search-form">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Numéro de commande</mat-label>
                <input matInput [(ngModel)]="orderNumber" name="orderNumber" placeholder="Ex: ORD-1234567890-123" required />
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
              <button mat-raised-button color="primary" type="submit" [disabled]="loading$ | async">
                @if (loading$ | async) {
                  <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
                } @else {
                  Rechercher
                }
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>

      @if (error$ | async; as error) {
        <mat-card class="error-card">
          <mat-card-content>
            <div class="error-content">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ error }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      }

      @if (order$ | async; as order) {
        <div class="order-info-section">
          <mat-card class="order-card">
            <mat-card-header>
              <div class="order-header">
                <div>
                  <h2>Commande #{{ order.orderNumber }}</h2>
                  <p class="order-date">Passée le {{ order.createdAt | date: 'long' }}</p>
                </div>
                <mat-chip [ngClass]="'status-' + order.status">
                  {{ getStatusLabel(order.status) }}
                </mat-chip>
              </div>
            </mat-card-header>
            <mat-card-content>
              <div class="order-details">
                <div class="detail-row">
                  <span class="label">Total:</span>
                  <span class="value">€{{ order.total | number: '1.2-2' }}</span>
                </div>
                @if (order.trackingNumber) {
                  <div class="detail-row">
                    <span class="label">Numéro de suivi:</span>
                    <span class="value tracking-number">{{ order.trackingNumber }}</span>
                  </div>
                }
                @if (order.carrier) {
                  <div class="detail-row">
                    <span class="label">Transporteur:</span>
                    <span class="value">{{ order.carrier }}</span>
                  </div>
                }
                @if (order.estimatedDelivery) {
                  <div class="detail-row">
                    <span class="label">Livraison estimée:</span>
                    <span class="value">{{ order.estimatedDelivery | date: 'long' }}</span>
                  </div>
                }
              </div>

              <div class="order-items">
                <h3>Produits commandés</h3>
                <div class="items-grid">
                  @for (item of order.items; track item.product_id) {
                    <div class="order-item-card">
                      <img
                        [src]="getProductImage(item.product_id)"
                        [alt]="item.product_name"
                        class="item-image"
                        (error)="onImageError($event, item.product_id)"
                      />
                      <div class="item-details">
                        <h4>{{ item.product_name }}</h4>
                        <div class="item-meta">
                          <span class="item-quantity">Quantité: {{ item.quantity }}</span>
                          <span class="item-price">€{{ item.price | number: '1.2-2' }}</span>
                        </div>
                        <div class="item-total">Sous-total: €{{ (item.price * item.quantity) | number: '1.2-2' }}</div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div class="delivery-address">
                <h3>Adresse de livraison</h3>
                <p>
                  {{ order.address.firstName }} {{ order.address.lastName }}<br />
                  {{ order.address.street }}<br />
                  {{ order.address.zipCode }} {{ order.address.city }}<br />
                  {{ order.address.country }}
                </p>
              </div>
            </mat-card-content>
          </mat-card>

          @if (tracking$ | async; as tracking) {
            <mat-card class="tracking-card">
              <mat-card-header>
                <h2>Historique de suivi</h2>
              </mat-card-header>
              <mat-card-content>
                <div class="timeline">
                  @for (event of tracking.trackingHistory; track event.date) {
                    <div class="timeline-item">
                      <div class="timeline-marker" [ngClass]="getTimelineMarkerClass(event.status)"></div>
                      <div class="timeline-content">
                        <div class="timeline-header">
                          <span class="timeline-status">{{ event.description }}</span>
                          <span class="timeline-date">{{ event.date | date: 'short' }}</span>
                        </div>
                        @if (event.location) {
                          <p class="timeline-location">{{ event.location }}</p>
                        }
                      </div>
                    </div>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          } @else if (trackingLoading$ | async) {
            <mat-card class="loading-card">
              <mat-card-content>
                <div class="loading-content">
                  <mat-spinner diameter="40"></mat-spinner>
                  <p>Chargement du suivi...</p>
                </div>
              </mat-card-content>
            </mat-card>
          } @else if (order.trackingNumber) {
            <div class="load-tracking">
              <button mat-raised-button color="primary" (click)="loadTracking(order.orderNumber)">
                Charger le suivi détaillé
              </button>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .tracking-page {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .back-button {
        margin-bottom: 1rem;
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

      .search-section {
        margin-bottom: 2rem;
      }

      .search-card {
        background: white;
        border-radius: 12px;
      }

      .search-form {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }

      .search-field {
        flex: 1;
      }

      .error-card {
        margin-bottom: 2rem;
        background: #ffebee;
      }

      .error-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #c62828;
      }

      .order-info-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .order-card,
      .tracking-card {
        background: white;
        border-radius: 12px;
      }

      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
      }

      .order-header h2 {
        margin: 0 0 0.5rem 0;
        color: #1a1038;
      }

      .order-date {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
      }

      .order-details {
        margin-bottom: 2rem;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .label {
        color: #666;
        font-weight: 500;
      }

      .value {
        color: #1a1038;
        font-weight: 600;
      }

      .tracking-number {
        font-family: monospace;
        color: #7443ff;
      }

      .order-items {
        margin: 2rem 0;
        padding-top: 2rem;
        border-top: 2px solid #eee;
      }

      .order-items h3 {
        margin: 0 0 1.5rem 0;
        color: #1a1038;
      }

      .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
      }

      .order-item-card {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 12px;
        border: 1px solid #eee;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .order-item-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .item-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        background: #f0f0f0;
        flex-shrink: 0;
      }

      .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .item-details h4 {
        margin: 0;
        font-size: 1rem;
        color: #1a1038;
        font-weight: 600;
      }

      .item-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #666;
      }

      .item-price {
        font-weight: 600;
        color: #7443ff;
      }

      .item-total {
        font-weight: 700;
        color: #1a1038;
        font-size: 1rem;
        margin-top: 0.25rem;
      }

      .delivery-address {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 2px solid #eee;
      }

      .delivery-address h3 {
        margin: 0 0 1rem 0;
        color: #1a1038;
      }

      .timeline {
        position: relative;
        padding-left: 2rem;
      }

      .timeline-item {
        position: relative;
        padding-bottom: 2rem;
      }

      .timeline-item:last-child {
        padding-bottom: 0;
      }

      .timeline-marker {
        position: absolute;
        left: -2rem;
        top: 0.25rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ccc;
        border: 3px solid white;
        box-shadow: 0 0 0 2px #ccc;
      }

      .timeline-marker.active {
        background: #4caf50;
        box-shadow: 0 0 0 2px #4caf50;
      }

      .timeline-marker.pending {
        background: #ff9800;
        box-shadow: 0 0 0 2px #ff9800;
      }

      .timeline-content {
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
      }

      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .timeline-status {
        font-weight: 600;
        color: #1a1038;
      }

      .timeline-date {
        color: #666;
        font-size: 0.875rem;
      }

      .timeline-location {
        margin: 0;
        color: #666;
        font-size: 0.875rem;
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

      .load-tracking {
        text-align: center;
        padding: 2rem;
      }

      .loading-card {
        text-align: center;
        padding: 3rem;
      }

      .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .inline-spinner {
        display: inline-block;
        margin-right: 0.5rem;
      }

      @media (max-width: 768px) {
        .search-form {
          flex-direction: column;
        }

        .order-header {
          flex-direction: column;
          gap: 1rem;
        }

        .timeline {
          padding-left: 1.5rem;
        }

        .timeline-marker {
          left: -1.5rem;
        }
      }
    `,
  ],
})
export class OrderTrackingPageComponent implements OnInit {
  orderNumber = '';
  order$: Observable<OrdersActions.Order | null>;
  tracking$: Observable<OrdersActions.OrderTracking | null>;
  loading$: Observable<boolean>;
  trackingLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.order$ = this.store.select(selectCurrentOrder);
    this.tracking$ = this.store.select(selectCurrentTracking);
    this.loading$ = this.store.select(selectOrdersLoading);
    this.trackingLoading$ = this.store.select(selectTrackingLoading);
    this.error$ = this.store.select(selectOrdersError);
  }

  ngOnInit(): void {
    // Check if order number is in route params
    this.route.params.subscribe((params) => {
      if (params['orderNumber']) {
        this.orderNumber = params['orderNumber'];
        this.loadOrder(this.orderNumber);
      }
    });
  }

  onSearchOrder(): void {
    if (this.orderNumber.trim()) {
      this.loadOrder(this.orderNumber.trim());
    }
  }

  loadOrder(orderNumber: string): void {
    this.store.dispatch(OrdersActions.loadOrder({ orderNumber }));
    // Auto-load tracking if available
    setTimeout(() => {
      this.store.dispatch(OrdersActions.loadOrderTracking({ orderNumber }));
    }, 500);
  }

  loadTracking(orderNumber: string): void {
    this.store.dispatch(OrdersActions.loadOrderTracking({ orderNumber }));
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

  getTimelineMarkerClass(status: string): string {
    if (status.includes('Livré') || status.includes('delivered')) return 'active';
    if (status.includes('En attente') || status.includes('pending')) return 'pending';
    return 'active';
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

