import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../../mocks/data';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatProgressSpinnerModule],
  template: `
    <mat-card>
      <mat-card-content>
        @if (loading) {
          <div class="loading-container">
            <mat-spinner></mat-spinner>
          </div>
        } @else if (products.length === 0) {
          <p class="no-products">No products found.</p>
        } @else {
          <table mat-table [dataSource]="products" class="products-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let product">{{ product.id }}</td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let product">{{ product.name }}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">€{{ product.price }}</td>
            </ng-container>

            <ng-container matColumnDef="created_at">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let product">{{ product.created_at | date: 'short' }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
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

      .products-table {
        width: 100%;
      }
    `,
  ],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;

  displayedColumns: string[] = ['id', 'name', 'price', 'created_at'];
}

