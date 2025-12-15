import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { selectCartCount } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatBadgeModule],
  template: `
    <a routerLink="/app/cart" class="cart-icon-link">
      <mat-icon matBadge="{{ cartCount$ | async }}" matBadgeColor="accent" matBadgeSize="small">
        shopping_cart
      </mat-icon>
    </a>
  `,
  styles: [
    `
      .cart-icon-link {
        display: inline-flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        transition: opacity 0.2s;
      }

      .cart-icon-link:hover {
        opacity: 0.8;
      }

      mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    `,
  ],
})
export class CartIconComponent {
  cartCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartCount$ = this.store.select(selectCartCount);
  }
}


