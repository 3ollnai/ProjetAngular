import { createAction, props } from '@ngrx/store';
import { Product } from '../../../mocks/data';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const addItem = createAction('[Cart] Add Item', props<{ product: Product; quantity: number }>());

export const removeItem = createAction('[Cart] Remove Item', props<{ productId: number }>());

export const updateQuantity = createAction('[Cart] Update Quantity', props<{ productId: number; quantity: number }>());

export const clearCart = createAction('[Cart] Clear Cart');

export const loadCartFromStorage = createAction('[Cart] Load From Storage', props<{ items: CartItem[] }>());


