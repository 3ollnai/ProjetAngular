import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { removeItem, updateQuantity, clearCart } from '../../state/cart/cart.actions';
import { CartItem } from '../../state/cart/cart.actions';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, CartItemComponent],
  template: `
    <div class="cart-page">
      <div class="cart-header">
        <h1>Mon Panier</h1>
        @if ((cartItems$ | async)?.length) {
          <button mat-button color="warn" (click)="clearCart()">
            <mat-icon>delete_sweep</mat-icon>
            Vider le panier
          </button>
        }
      </div>

      @if (cartItems$ | async; as cartItems) {
        @if (cartItems.length > 0) {
          <div class="cart-content">
            <div class="cart-items">
              @for (item of cartItems; track item.product.id) {
              <app-cart-item
                [item]="item"
                (quantityChange)="updateItemQuantity(item.product.id, $event)"
                (remove)="removeItem(item.product.id)"
              />
              }
            </div>

            <mat-card class="cart-summary">
            <h2>Résumé</h2>
            <div class="summary-line">
              <span>Sous-total:</span>
              <strong>€{{ cartTotal$ | async | number: '1.2-2' }}</strong>
            </div>
            <div class="summary-line">
              <span>Livraison:</span>
              <span>Gratuite</span>
            </div>
            <div class="summary-total">
              <span>Total:</span>
              <strong>€{{ cartTotal$ | async | number: '1.2-2' }}</strong>
            </div>
            <button mat-raised-button color="primary" class="checkout-btn" routerLink="/app/checkout">
              Passer la commande
            </button>
            <button mat-button routerLink="/app/products" class="continue-shopping">
              Continuer mes achats
            </button>
          </mat-card>
          </div>
        }
      } @else {
        <mat-card class="empty-cart">
          <mat-icon>shopping_cart</mat-icon>
          <h2>Votre panier est vide</h2>
          <p>Ajoutez des produits pour commencer vos achats</p>
          <button mat-raised-button color="primary" routerLink="/app/products">
            Découvrir nos produits
          </button>
        </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .cart-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .cart-header h1 {
        margin: 0;
        color: #1a1038;
      }

      .cart-content {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 2rem;
      }

      .cart-items {
        display: flex;
        flex-direction: column;
      }

      .cart-summary {
        padding: 1.5rem;
        position: sticky;
        top: 2rem;
        height: fit-content;
      }

      .cart-summary h2 {
        margin-top: 0;
        color: #1a1038;
      }

      .summary-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        margin: 1.5rem 0;
        padding-top: 1rem;
        border-top: 2px solid #7443ff;
        font-size: 1.2rem;
      }

      .checkout-btn {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.75rem;
        font-size: 1rem;
      }

      .continue-shopping {
        width: 100%;
      }

      .empty-cart {
        text-align: center;
        padding: 4rem 2rem;
      }

      .empty-cart mat-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
        color: #ccc;
        margin-bottom: 1rem;
      }

      .empty-cart h2 {
        color: #1a1038;
        margin-bottom: 0.5rem;
      }

      .empty-cart p {
        color: #666;
        margin-bottom: 2rem;
      }

      @media (max-width: 968px) {
        .cart-content {
          grid-template-columns: 1fr;
        }

        .cart-summary {
          position: static;
        }
      }
    `,
  ],
})
export class CartPageComponent {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  removeItem(productId: number): void {
    this.store.dispatch(removeItem({ productId }));
  }

  updateItemQuantity(productId: number, quantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity }));
  }

  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.store.dispatch(clearCart());
    }
  }
}


