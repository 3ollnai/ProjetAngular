// Cart persistence is now handled directly in the reducer
// This file only exports the utility function for loading from storage
import * as CartActions from './cart.actions';

const CART_STORAGE_KEY = 'my-shop-cart';

export function loadCartFromStorage(): CartActions.CartItem[] | null {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
  }
  return null;
}


