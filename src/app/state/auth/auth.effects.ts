import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api.service';

@Injectable()
export class AuthEffects {
  private apiService = inject(ShopApiService);
  login$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.apiService.login(username, password).pipe(
          map((response) => AuthActions.loginSuccess({ access: response.access, refresh: response.refresh })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message || 'Login failed' })))
        )
      )
    );
  });

  refreshToken$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(({ refresh }) =>
        this.apiService.refreshToken(refresh).pipe(
          map((response) => AuthActions.refreshTokenSuccess({ access: response.access })),
          catchError((error) => of(AuthActions.refreshTokenFailure({ error: error.message || 'Token refresh failed' })))
        )
      )
    );
  });
}

