import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { selectCartItems, selectCartTotal } from '../../state/cart/cart.selectors';
import { clearCart, removeItem, updateQuantity, CartItem } from '../../state/cart/cart.actions';
import { saveOrder } from '../../state/orders/orders.actions';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { HttpClient } from '@angular/common/http';
import { products } from '../../../mocks/data';

interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CartItemComponent,
  ],
  template: `
    <div class="checkout-page">
      <h1>Finaliser la commande</h1>

      <mat-stepper #stepper [linear]="false" class="checkout-stepper">
        <!-- Step 1: Cart Summary -->
        <mat-step>
          <ng-template matStepLabel>Résumé</ng-template>
          <div class="step-content">
            <h2>Récapitulatif de votre panier</h2>
            @if (cartItems$ | async; as cartItems) {
              @if (cartItems.length > 0) {
                <div class="cart-items-summary">
                  @for (item of cartItems; track item.product.id) {
                  <app-cart-item
                    [item]="item"
                    (quantityChange)="updateItemQuantity(item.product.id, $event)"
                    (remove)="removeItem(item.product.id)"
                  />
                  }
                </div>

                <mat-card class="summary-card">
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
              </mat-card>

                <div class="step-actions">
                  <button mat-button routerLink="/app/cart">Retour au panier</button>
                  <button mat-raised-button color="primary" (click)="stepper.next()">
                    Continuer
                  </button>
                </div>
              } @else {
                <p>Votre panier est vide</p>
                <button mat-button routerLink="/app/products">Retour aux produits</button>
              }
            }
          </div>
        </mat-step>

        <!-- Step 2: Address -->
        <mat-step>
          <ng-template matStepLabel>Adresse</ng-template>
          <div class="step-content">
            <h2>Informations de livraison</h2>
            <form #addressForm="ngForm" class="address-form">
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Prénom</mat-label>
                  <input matInput [(ngModel)]="address.firstName" name="firstName" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nom</mat-label>
                  <input matInput [(ngModel)]="address.lastName" name="lastName" required />
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" [(ngModel)]="address.email" name="email" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Téléphone</mat-label>
                  <input matInput type="tel" [(ngModel)]="address.phone" name="phone" required />
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Rue</mat-label>
                <input matInput [(ngModel)]="address.street" name="street" required />
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Ville</mat-label>
                  <input matInput [(ngModel)]="address.city" name="city" required />
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Code postal</mat-label>
                  <input matInput [(ngModel)]="address.zipCode" name="zipCode" required />
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Pays</mat-label>
                <input matInput [(ngModel)]="address.country" name="country" required />
              </mat-form-field>

              <div class="step-actions">
                <button mat-button (click)="stepper.previous()">Retour</button>
                <button
                  mat-raised-button
                  color="primary"
                  (click)="validateAddress()"
                  [disabled]="!addressForm.valid"
                >
                  Valider l'adresse
                </button>
              </div>
            </form>
          </div>
        </mat-step>

        <!-- Step 3: Confirmation -->
        <mat-step>
          <ng-template matStepLabel>Confirmation</ng-template>
          <div class="step-content">
            @if (orderConfirmation$ | async; as confirmation) {
              <div class="confirmation-success">
                <mat-icon class="success-icon">check_circle</mat-icon>
                <h2>Commande confirmée !</h2>
                <p class="order-number">Numéro de commande: <strong>{{ confirmation.orderNumber }}</strong></p>
                <p>Merci pour votre achat. Vous recevrez un email de confirmation sous peu.</p>

                <div class="confirmation-actions">
                  <button mat-raised-button color="primary" routerLink="/app/products">
                    Continuer mes achats
                  </button>
                  <button mat-raised-button color="accent" [routerLink]="['/app/orders/track', confirmation.orderNumber]">
                    <mat-icon>local_shipping</mat-icon>
                    Suivre ma commande
                  </button>
                </div>
              </div>
            } @else if (isSubmitting) {
              <div class="submitting">
                <mat-spinner></mat-spinner>
                <p>Traitement de votre commande...</p>
              </div>
            } @else {
              <div class="confirmation-preview">
                <h2>Confirmer la commande</h2>
                <mat-card class="preview-card">
                  <h3>Adresse de livraison</h3>
                  <p>
                    {{ address.firstName }} {{ address.lastName }}<br />
                    {{ address.street }}<br />
                    {{ address.zipCode }} {{ address.city }}<br />
                    {{ address.country }}
                  </p>
                  <p><strong>Email:</strong> {{ address.email }}</p>
                  <p><strong>Téléphone:</strong> {{ address.phone }}</p>
                </mat-card>

                <mat-card class="preview-card">
                  <h3>Total</h3>
                  <div class="summary-total">
                    <span>Total:</span>
                    <strong>€{{ cartTotal$ | async | number: '1.2-2' }}</strong>
                  </div>
                </mat-card>

                <div class="step-actions">
                  <button mat-button (click)="stepper.previous()">Retour</button>
                  <button mat-raised-button color="primary" (click)="submitOrder()">
                    Confirmer la commande
                  </button>
                </div>
              </div>
            }
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [
    `
      .checkout-page {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
      }

      .checkout-page h1 {
        color: #1a1038;
        margin-bottom: 2rem;
      }

      .checkout-stepper {
        background: white;
        border-radius: 8px;
        padding: 2rem;
      }

      .step-content {
        padding: 2rem 0;
      }

      .step-content h2 {
        color: #1a1038;
        margin-bottom: 1.5rem;
      }

      .cart-items-summary {
        margin-bottom: 1.5rem;
      }

      .summary-card {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
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
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid #7443ff;
        font-size: 1.2rem;
      }

      .address-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .full-width {
        width: 100%;
      }

      .step-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }

      .confirmation-success {
        text-align: center;
        padding: 2rem;
      }

      .success-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
        color: #4caf50;
        margin-bottom: 1rem;
      }

      .order-number {
        font-size: 1.2rem;
        margin: 1rem 0;
      }

      .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
      }

      .submitting {
        text-align: center;
        padding: 4rem;
      }

      .preview-card {
        margin-bottom: 1.5rem;
        padding: 1.5rem;
      }

      .preview-card h3 {
        margin-top: 0;
        color: #1a1038;
      }

      @media (max-width: 768px) {
        .form-row {
          grid-template-columns: 1fr;
        }

        .step-actions {
          flex-direction: column;
          gap: 1rem;
        }

        .confirmation-actions {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class CheckoutPageComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  orderConfirmation$: Observable<any> | null = null;
  isSubmitting = false;

  address: AddressForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'France',
  };

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      if (items.length === 0) {
        this.router.navigate(['/app/cart']);
      }
    });
  }

  updateItemQuantity(productId: number, quantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity }));
  }

  removeItem(productId: number): void {
    this.store.dispatch(removeItem({ productId }));
  }

  validateAddress(): void {
    if (this.stepper) {
      this.stepper.next();
    }
  }

  submitOrder(): void {
    this.isSubmitting = true;
    this.cartItems$.subscribe((items) => {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        address: this.address,
      };

      this.http.post('/api/order/', orderData).subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.orderConfirmation$ = new Observable((observer) => {
            observer.next(response);
            observer.complete();
          });

          // Save order to store
          const order = {
            id: response.orderNumber,
            orderNumber: response.orderNumber,
            status: 'confirmed' as const,
            items: items.map((item) => ({
              product_id: item.product.id,
              product_name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            address: this.address,
            total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            createdAt: new Date().toISOString(),
            estimatedDelivery: response.estimatedDelivery,
            trackingNumber: response.trackingNumber,
            carrier: response.carrier,
          };

          this.store.dispatch(saveOrder({ order }));
          this.store.dispatch(clearCart());
          this.snackBar.open('Commande confirmée avec succès !', 'Fermer', { duration: 5000 });
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Erreur lors de la commande. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
          });
        },
      });
    }).unsubscribe();
  }
}

