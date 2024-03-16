import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';
import { ErrorResponse } from '../../models/responses/error';

export interface AuthState {
    loggedIn: boolean;
    token: string | null;
    error: ErrorResponse | null
}

export const initialState: AuthState = {
    loggedIn: false,
    token: null,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, loggedIn: true, token, error: null })),
    on(AuthActions.loginFailure, (state, error: ErrorResponse) => ({ ...state, loggedIn: false, token: null, error: error })),
    on(AuthActions.logoutSuccess, state => ({ ...state, loggedIn: false, token: null }))
);