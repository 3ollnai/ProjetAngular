import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  access?: string | null;
  refresh?: string | null;
  loading: boolean;
  error?: any | null;
}

export const initialAuthState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { access, refresh }) => ({ ...state, loading: false, access, refresh })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.refreshToken, (state) => ({ ...state, loading: true })),
  on(AuthActions.refreshSuccess, (state, { access }) => ({ ...state, loading: false, access })),
  on(AuthActions.refreshFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, () => ({ ...initialAuthState }))
);
