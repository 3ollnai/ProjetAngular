import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div style="border:1px solid #ccc; padding:15px; margin:10px; border-radius:8px">
      <h4>{{ name }}</h4>
      <p>{{ price | currency }} — {{ created_at }}</p>
      <p>Avg rating: {{ avgRating || '—' }}</p>
      <button style="padding:5px 10px; background:#007bff; color:white; border:none; cursor:pointer">Voir</button>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() id = 0;
  @Input() name = '';
  @Input() price = 0;
  @Input() created_at?: string;
  @Input() ratings?: any[];
  @Input() avgRating?: number;
}
