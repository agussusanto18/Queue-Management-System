import { createAction, props } from '@ngrx/store'
import { SignInRequest, SignInResponse } from '../../models/responses/signin';
import { ErrorResponse } from '../../models/responses/error'

export const login = createAction('[Auth] Login', props<SignInRequest>());
export const loginSuccess = createAction('[Auth] Login Success', props<SignInResponse>());
export const loginFailure = createAction('[Auth] Login Failure', props<ErrorResponse>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');
