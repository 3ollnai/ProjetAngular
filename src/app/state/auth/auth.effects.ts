import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private api: ShopApiService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.api.login(username, password).pipe(
          map((res) => AuthActions.loginSuccess({ access: res.access, refresh: res.refresh })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(({ refresh }) =>
        this.api.refresh(refresh).pipe(
          map((res) => AuthActions.refreshSuccess({ access: res.access })),
          catchError((error) => of(AuthActions.refreshFailure({ error })))
        )
      )
    )
  );
}
