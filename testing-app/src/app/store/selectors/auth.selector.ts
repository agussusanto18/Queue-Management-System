import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, auth => auth.loggedIn);

export const selectAuthToken = createSelector(selectAuthState, auth => auth.token);

export const selectAuthError = createSelector(selectAuthState, auth => auth.error);