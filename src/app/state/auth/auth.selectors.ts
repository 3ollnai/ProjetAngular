import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(selectAuth, (s) => s.access);
export const selectRefreshToken = createSelector(selectAuth, (s) => s.refresh);
export const selectAuthLoading = createSelector(selectAuth, (s) => s.loading);
export const selectAuthError = createSelector(selectAuth, (s) => s.error);
