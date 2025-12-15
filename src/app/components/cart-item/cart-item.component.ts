import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartItem } from '../../state/cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <mat-card class="cart-item-card">
      <div class="cart-item-content">
        <div class="item-info">
          <h3>{{ item.product.name }}</h3>
          <p class="price">€{{ item.product.price | number: '1.2-2' }}</p>
        </div>

        <div class="item-controls">
          <div class="quantity-control">
            <button mat-icon-button (click)="decreaseQuantity()" [disabled]="item.quantity <= 1">
              <mat-icon>remove</mat-icon>
            </button>
            <mat-form-field appearance="outline" class="quantity-input">
              <input matInput type="number" [(ngModel)]="quantity" (ngModelChange)="onQuantityChange()" min="1" />
            </mat-form-field>
            <button mat-icon-button (click)="increaseQuantity()">
              <mat-icon>add</mat-icon>
            </button>
          </div>

          <div class="item-total">
            <strong>€{{ (item.product.price * item.quantity) | number: '1.2-2' }}</strong>
          </div>

          <button mat-icon-button color="warn" (click)="removeItem()" class="remove-btn">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .cart-item-card {
        margin-bottom: 1rem;
      }

      .cart-item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .item-info {
        flex: 1;
      }

      .item-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
      }

      .price {
        color: #666;
        margin: 0;
      }

      .item-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .quantity-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .quantity-input {
        width: 80px;
      }

      .item-total {
        min-width: 80px;
        text-align: right;
        font-size: 1.1rem;
        color: #7443ff;
      }

      .remove-btn {
        margin-left: 0.5rem;
      }

      @media (max-width: 768px) {
        .cart-item-content {
          flex-direction: column;
          align-items: flex-start;
        }

        .item-controls {
          width: 100%;
          justify-content: space-between;
        }
      }
    `,
  ],
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  quantity: number = 1;

  ngOnInit(): void {
    this.quantity = this.item.quantity;
  }

  increaseQuantity(): void {
    this.quantity++;
    this.onQuantityChange();
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.onQuantityChange();
    }
  }

  onQuantityChange(): void {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.quantityChange.emit(this.quantity);
  }

  removeItem(): void {
    this.remove.emit();
  }
}


