import { createAction, props } from '@ngrx/store';

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
  items: Array<{
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
  }>;
  address: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  carrier?: string;
}

export interface OrderTracking {
  orderNumber: string;
  status: Order['status'];
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  trackingHistory: Array<{
    date: string;
    status: string;
    location?: string;
    description: string;
  }>;
}

export const loadOrder = createAction('[Orders] Load Order', props<{ orderNumber: string }>());

export const loadOrderSuccess = createAction('[Orders] Load Order Success', props<{ order: Order }>());

export const loadOrderFailure = createAction('[Orders] Load Order Failure', props<{ error: string }>());

export const loadOrderTracking = createAction('[Orders] Load Order Tracking', props<{ orderNumber: string }>());

export const loadOrderTrackingSuccess = createAction(
  '[Orders] Load Order Tracking Success',
  props<{ tracking: OrderTracking }>()
);

export const loadOrderTrackingFailure = createAction(
  '[Orders] Load Order Tracking Failure',
  props<{ error: string }>()
);

export const saveOrder = createAction('[Orders] Save Order', props<{ order: Order }>());

export const loadUserOrders = createAction('[Orders] Load User Orders');

export const loadUserOrdersSuccess = createAction('[Orders] Load User Orders Success', props<{ orders: Order[] }>());

export const loadUserOrdersFailure = createAction('[Orders] Load User Orders Failure', props<{ error: string }>());

