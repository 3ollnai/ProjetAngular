import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';

@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="products-grid">
      <ng-container *ngFor="let p of products || []">
        <app-product-card [id]="p.id" [name]="p.name" [price]="p.price" [created_at]="p.created_at" [avgRating]="p.avgRating"></app-product-card>
      </ng-container>
    </div>
  `,
  styles: [`.products-grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap:12px }`],
})
export class ProductsListComponent {
  @Input() products: any[] = [];
}
