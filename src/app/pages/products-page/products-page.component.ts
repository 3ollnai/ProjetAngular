import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadProducts } from '../../state/products/products.actions';
import {
  selectProducts,
  selectProductsCount,
  selectProductsLoading,
  selectProductsError,
} from '../../state/products/products.selectors';
import { addItem } from '../../state/cart/cart.actions';
import { Product } from '../../../mocks/data';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { products } from '../../../mocks/data';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    ProductCardComponent,
  ],
  template: `
    <div class="products-container">
      <div class="page-header">
        <h1>Notre Catalogue</h1>
        @if (count$ | async; as count) {
          <p class="product-count">{{ count }} produit{{ count > 1 ? 's' : '' }} disponible{{ count > 1 ? 's' : '' }}</p>
        }
      </div>

      <mat-card class="filters-card">
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #filterForm="ngForm" class="filters-form">
            <div class="filters-grid">
              <mat-form-field appearance="outline">
                <mat-label>Page</mat-label>
                <input matInput type="number" [(ngModel)]="page" name="page" min="1" required />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Produits par page</mat-label>
                <input matInput type="number" [(ngModel)]="pageSize" name="pageSize" min="1" required />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Note minimum</mat-label>
                <input matInput type="number" [(ngModel)]="minRating" name="minRating" min="0" step="0.1" />
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Trier par</mat-label>
                <mat-select [(ngModel)]="ordering" name="ordering">
                  <mat-option value="-created_at">Plus récents</mat-option>
                  <mat-option value="created_at">Plus anciens</mat-option>
                  <mat-option value="price">Prix : croissant</mat-option>
                  <mat-option value="-price">Prix : décroissant</mat-option>
                  <mat-option value="name">Nom : A-Z</mat-option>
                  <mat-option value="-name">Nom : Z-A</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="loading$ | async" class="apply-filters-btn">
              @if (loading$ | async) {
                <mat-spinner diameter="20" class="inline-spinner"></mat-spinner>
              } @else {
                <ng-container>
                  <mat-icon>search</mat-icon>
                  Appliquer les filtres
                </ng-container>
              }
            </button>
          </form>

          @if (error$ | async; as error) {
            <div class="error-message">{{ error }}</div>
          }
        </mat-card-content>
      </mat-card>

      @if (loading$ | async) {
        <div class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (productsWithRating$ | async; as products) {
        @if (products.length === 0) {
          <div class="no-products">
            <mat-icon>inventory_2</mat-icon>
            <p>Aucun produit trouvé.</p>
          </div>
        } @else {
          <div class="products-grid">
            @for (product of products; track product.id) {
              <app-product-card
                [productId]="product.id"
                [name]="product.name"
                [price]="product.price"
                [image]="product.image || ''"
                [avgRating]="product.avgRating"
                [onAddToCartClick]="addToCart"
              />
            }
          </div>
        }
      }
    </div>
  `,
  styles: [
    `
      .products-container {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-header h1 {
        margin: 0 0 0.5rem 0;
        font-size: 2rem;
        font-weight: 600;
        color: #1a1038;
      }

      .product-count {
        margin: 0;
        color: #666;
        font-size: 0.95rem;
      }

      .filters-card {
        margin-bottom: 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .filters-form {
        margin-bottom: 0;
      }

      .filters-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .error-message {
        color: #f44336;
        margin: 1rem 0;
        font-size: 0.875rem;
      }

      .apply-filters-btn {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
      }

      .apply-filters-btn mat-icon {
        margin-right: 0.5rem;
      }

      .loading-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
      }

      .no-products {
        text-align: center;
        padding: 2rem;
        color: #666;
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .no-products {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;
      }

      .no-products mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #ccc;
        margin-bottom: 1rem;
      }

      .no-products p {
        font-size: 1.1rem;
        margin: 0;
      }

      @media (max-width: 768px) {
        .products-grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1rem;
        }
      }

      .inline-spinner {
        display: inline-block;
        margin-right: 0.5rem;
      }
    `,
  ],
})
export class ProductsPageComponent implements OnInit {
  page = 1;
  pageSize = 12;
  minRating = 0;
  ordering = '-created_at';

  products$: Observable<Product[]>;
  productsWithRating$: Observable<Array<Product & { avgRating: number | null }>>;
  count$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private snackBar: MatSnackBar) {
    this.products$ = this.store.select(selectProducts);
    this.productsWithRating$ = this.products$.pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          avgRating: product.ratings && product.ratings.length > 0
            ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
            : null,
        }))
      )
    );
    this.count$ = this.store.select(selectProductsCount);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
  }

  addToCart(productId: number): void {
    const product = products.find((p) => p.id === productId);
    if (product) {
      this.store.dispatch(addItem({ product, quantity: 1 }));
      this.snackBar.open(`${product.name} ajouté au panier`, 'Fermer', { duration: 3000 });
    }
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onSubmit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.store.dispatch(
      loadProducts({
        page: this.page,
        pageSize: this.pageSize,
        minRating: this.minRating || undefined,
        ordering: this.ordering || undefined,
      })
    );
  }
}

