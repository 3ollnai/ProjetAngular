import { createAction, props } from '@ngrx/store';
import { Product } from '../../../mocks/data';

export interface ProductsQuery {
  page: number;
  pageSize: number;
  minRating?: number;
  ordering?: string;
}

export interface PaginatedProducts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export const loadProducts = createAction('[Products] Load Products', props<ProductsQuery>());

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ data: PaginatedProducts }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const selectProduct = createAction('[Products] Select Product', props<{ id: number }>());

export const loadRating = createAction('[Products] Load Rating', props<{ id: number }>());

export const loadRatingSuccess = createAction(
  '[Products] Load Rating Success',
  props<{ productId: number; avgRating: number; count: number }>()
);

export const loadRatingFailure = createAction(
  '[Products] Load Rating Failure',
  props<{ error: string }>()
);

