import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartActions.CartItem[];
}

export const initialState: CartState = {
  items: [],
};

const CART_STORAGE_KEY = 'my-shop-cart';

function saveToStorage(items: CartActions.CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

function calculateTotalPrice(items: CartActions.CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function calculateTotalCount(items: CartActions.CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product, quantity }) => {
    const existingItem = state.items.find((item) => item.product.id === product.id);
    let newItems: CartActions.CartItem[];
    if (existingItem) {
      newItems = state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...state.items, { product, quantity }];
    }
    saveToStorage(newItems);
    return { items: newItems };
  }),
  on(CartActions.removeItem, (state, { productId }) => {
    const newItems = state.items.filter((item) => item.product.id !== productId);
    saveToStorage(newItems);
    return { items: newItems };
  }),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    let newItems: CartActions.CartItem[];
    if (quantity <= 0) {
      newItems = state.items.filter((item) => item.product.id !== productId);
    } else {
      newItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }
    saveToStorage(newItems);
    return { items: newItems };
  }),
  on(CartActions.clearCart, () => {
    saveToStorage([]);
    return { items: [] };
  }),
  on(CartActions.loadCartFromStorage, (state, { items }) => ({ items }))
);

// Helper functions for selectors
export const getTotalPrice = (state: CartState): number => calculateTotalPrice(state.items);
export const getTotalCount = (state: CartState): number => calculateTotalCount(state.items);


