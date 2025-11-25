import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProducts = createFeatureSelector<ProductsState>('products');

export const selectProductsList = createSelector(selectProducts, (s) => s.results);
export const selectProductsCount = createSelector(selectProducts, (s) => s.count);
export const selectProductsLoading = createSelector(selectProducts, (s) => s.loading);
export const selectProductsError = createSelector(selectProducts, (s) => s.error);
