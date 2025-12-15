import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  private apiService = inject(HttpClient);

  loadOrder$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(OrdersActions.loadOrder),
      switchMap(({ orderNumber }) =>
        this.apiService.get<OrdersActions.Order>(`/api/orders/${orderNumber}/`).pipe(
          map((order) => OrdersActions.loadOrderSuccess({ order })),
          catchError((error) =>
            of(OrdersActions.loadOrderFailure({ error: error.message || 'Failed to load order' }))
          )
        )
      )
    );
  });

  loadOrderTracking$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(OrdersActions.loadOrderTracking),
      switchMap(({ orderNumber }) =>
        this.apiService.get<OrdersActions.OrderTracking>(`/api/orders/${orderNumber}/tracking/`).pipe(
          map((tracking) => OrdersActions.loadOrderTrackingSuccess({ tracking })),
          catchError((error) =>
            of(OrdersActions.loadOrderTrackingFailure({ error: error.message || 'Failed to load tracking' }))
          )
        )
      )
    );
  });

  loadUserOrders$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(OrdersActions.loadUserOrders),
      switchMap(() =>
        this.apiService.get<OrdersActions.Order[]>('/api/orders/').pipe(
          map((orders) => OrdersActions.loadUserOrdersSuccess({ orders })),
          catchError((error) =>
            of(OrdersActions.loadUserOrdersFailure({ error: error.message || 'Failed to load orders' }))
          )
        )
      )
    );
  });
}

