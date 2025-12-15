import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectCurrentOrder = createSelector(selectOrdersState, (state) => state.currentOrder);

export const selectCurrentTracking = createSelector(selectOrdersState, (state) => state.currentTracking);

export const selectUserOrders = createSelector(selectOrdersState, (state) => state.userOrders);

export const selectOrdersLoading = createSelector(selectOrdersState, (state) => state.loading);

export const selectTrackingLoading = createSelector(selectOrdersState, (state) => state.trackingLoading);

export const selectOrdersError = createSelector(selectOrdersState, (state) => state.error);

