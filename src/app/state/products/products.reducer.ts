import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../services/shop-api.service';

export interface ProductsState {
  results: Product[];
  count: number;
  loading: boolean;
  error?: any | null;
  lastQuery?: any;
}

export const initialProductsState: ProductsState = {
  results: [],
  count: 0,
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state, q) => ({ ...state, loading: true, lastQuery: q })),
  on(ProductsActions.loadProductsSuccess, (state, { count, results }) => ({ ...state, loading: false, count, results })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
