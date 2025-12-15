import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../../mocks/data';

export interface ProductsState {
  items: Product[];
  count: number;
  loading: boolean;
  error: string | null;
  query: ProductsActions.ProductsQuery | null;
  selectedProductId: number | null;
  rating: {
    productId: number | null;
    avgRating: number | null;
    count: number | null;
  };
  ratingLoading: boolean;
  ratingError: string | null;
}

export const initialState: ProductsState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
  query: null,
  selectedProductId: null,
  rating: {
    productId: null,
    avgRating: null,
    count: null,
  },
  ratingLoading: false,
  ratingError: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, query) => ({
    ...state,
    loading: true,
    error: null,
    query,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    items: data.results,
    count: data.count,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductsActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
  })),
  on(ProductsActions.loadRating, (state) => ({
    ...state,
    ratingLoading: true,
    ratingError: null,
  })),
  on(ProductsActions.loadRatingSuccess, (state, { productId, avgRating, count }) => ({
    ...state,
    rating: {
      productId,
      avgRating,
      count,
    },
    ratingLoading: false,
    ratingError: null,
  })),
  on(ProductsActions.loadRatingFailure, (state, { error }) => ({
    ...state,
    ratingLoading: false,
    ratingError: error,
  }))
);

