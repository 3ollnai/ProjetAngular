import { createAction, props } from '@ngrx/store';
import { Product } from '../../services/shop-api.service';

export const loadProducts = createAction(
  '[Products] Load',
  props<{ page?: number; page_size?: number; min_rating?: number; ordering?: string }>()
);

export const loadProductsSuccess = createAction('[Products] Load Success', props<{ count: number; results: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: any }>());

export const loadRating = createAction('[Products] Load Rating', props<{ id: number }>());
export const loadRatingSuccess = createAction('[Products] Load Rating Success', props<{ id: number; avg_rating: number; count: number }>());
export const loadRatingFailure = createAction('[Products] Load Rating Failure', props<{ error: any }>());
