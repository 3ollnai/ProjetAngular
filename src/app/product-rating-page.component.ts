import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-rating-page',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="padding:20px">
      <h3>Product Rating</h3>
      <form [formGroup]="form" (ngSubmit)="submit()" style="display:flex; gap:10px; align-items:end">
        <div>
          <label>Product ID</label>
          <input formControlName="id" style="padding:8px; border:1px solid #ccc" />
        </div>
        <button type="submit" style="padding:8px 16px; background:#007bff; color:white; border:none; cursor:pointer">Fetch</button>
      </form>
      <div *ngIf="rating">Avg: {{ rating.avg_rating }} — Count: {{ rating.count }}</div>
    </div>
  `,
})
export class ProductRatingPageComponent {
  form: FormGroup;
  rating: any | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ id: [1] });
  }

  submit() {
    const id = Number(this.form.value.id);
    console.log('Fetching rating for product ID:', id);
    // Mock rating data for now
    this.rating = { avg_rating: 4.2, count: 15 };
  }
}
