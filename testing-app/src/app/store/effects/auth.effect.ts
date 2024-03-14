// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.action';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/responses/error';


@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(signinRequest =>
            this.authService.signin(signinRequest).pipe(
                map((signinResponse) => {
                    return AuthActions.loginSuccess(signinResponse)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(AuthActions.loginFailure(errorResponse))
                })
            )
        )
    ));

    storeToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((signinResponse) => {
            localStorage.setItem('jwt_token', signinResponse.token)
            this.router.navigate(['/visitor-list']);
        })
    ), {dispatch: false});

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() =>
            this.authService.logout().pipe(
                map(() => AuthActions.logoutSuccess()),
                catchError(error => of(AuthActions.logoutFailure))
            )
        )
    ));

    logoutRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), { dispatch: false });

    constructor(
        private router: Router,
        private actions$: Actions,
        private authService: AuthService
    ) { }
}