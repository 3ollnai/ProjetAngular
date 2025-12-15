import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(selectProductsState, (state) => state.items);

export const selectProductsCount = createSelector(selectProductsState, (state) => state.count);

export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);

export const selectProductsError = createSelector(selectProductsState, (state) => state.error);

export const selectProductsQuery = createSelector(selectProductsState, (state) => state.query);

export const selectSelectedProductId = createSelector(selectProductsState, (state) => state.selectedProductId);

export const selectRating = createSelector(selectProductsState, (state) => state.rating);

export const selectRatingLoading = createSelector(selectProductsState, (state) => state.ratingLoading);

export const selectRatingError = createSelector(selectProductsState, (state) => state.ratingError);

