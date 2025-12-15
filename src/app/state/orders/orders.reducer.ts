import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';

export interface OrdersState {
  currentOrder: OrdersActions.Order | null;
  currentTracking: OrdersActions.OrderTracking | null;
  userOrders: OrdersActions.Order[];
  loading: boolean;
  trackingLoading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  currentOrder: null,
  currentTracking: null,
  userOrders: [],
  loading: false,
  trackingLoading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrderSuccess, (state, { order }) => ({
    ...state,
    currentOrder: order,
    loading: false,
    error: null,
  })),
  on(OrdersActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrdersActions.loadOrderTracking, (state) => ({
    ...state,
    trackingLoading: true,
    error: null,
  })),
  on(OrdersActions.loadOrderTrackingSuccess, (state, { tracking }) => ({
    ...state,
    currentTracking: tracking,
    trackingLoading: false,
    error: null,
  })),
  on(OrdersActions.loadOrderTrackingFailure, (state, { error }) => ({
    ...state,
    trackingLoading: false,
    error,
  })),
  on(OrdersActions.saveOrder, (state, { order }) => ({
    ...state,
    userOrders: [order, ...state.userOrders],
  })),
  on(OrdersActions.loadUserOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    userOrders: orders,
    loading: false,
    error: null,
  })),
  on(OrdersActions.loadUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

