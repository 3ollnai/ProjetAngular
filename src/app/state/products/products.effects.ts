import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from './products.actions';
import { ShopApiService } from '../../services/shop-api.service';

@Injectable()
export class ProductsEffects {
  private apiService = inject(ShopApiService);
  loadProducts$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap((query) =>
        this.apiService.getProducts(query).pipe(
          map((data) => ProductsActions.loadProductsSuccess({ data })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error: error.message || 'Failed to load products' })))
        )
      )
    );
  });

  loadRating$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(ProductsActions.loadRating),
      switchMap(({ id }) =>
        this.apiService.getProductRating(id).pipe(
          map((response) => ProductsActions.loadRatingSuccess({ productId: id, avgRating: response.avg_rating, count: response.count })),
          catchError((error) => of(ProductsActions.loadRatingFailure({ error: error.message || 'Failed to load rating' })))
        )
      )
    );
  });
}

