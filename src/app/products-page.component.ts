import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './components/products-list.component';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, ProductsListComponent],
  template: `
    <div style="padding:20px">
      <h3>Products</h3>
      <div>Filters coming soon...</div>
      <app-products-list [products]="mockProducts"></app-products-list>
    </div>
  `,
})
export class ProductsPageComponent {
  mockProducts = [
    { id: 1, name: 'Stylo Bleu', price: 2.5, created_at: '2025-01-10', avgRating: 4 },
    { id: 2, name: 'Cahier Rouge', price: 5.0, created_at: '2025-01-09', avgRating: 3 }
  ];
}
