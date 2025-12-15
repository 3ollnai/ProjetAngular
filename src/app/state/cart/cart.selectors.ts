import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCartState, (state) => state.items);

export const selectCartTotal = createSelector(selectCartState, (state) => {
  return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
});

export const selectCartCount = createSelector(selectCartState, (state) => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
});


