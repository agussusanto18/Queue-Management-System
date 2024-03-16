// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CounterService } from '../../services/counter.service';
import * as CounterActions from '../actions/counter.action';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../models/responses/error';
import { Store } from '@ngrx/store';


@Injectable()
export class CounterEffects {

    getCounters$ = createEffect(() => this.actions$.pipe(
        ofType(CounterActions.counter),
        mergeMap(() =>
            this.counterService.getCounters().pipe(
                map((counterResponse) => {
                    return CounterActions.counterSuccess({ counters: counterResponse})
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CounterActions.counterFailure(errorResponse))
                })
            )
        )
    ));

    deleteCounter$ = createEffect(() => this.actions$.pipe(
        ofType(CounterActions.deleteCounter),
        mergeMap(param =>
            this.counterService.deleteCounter(param.id).pipe(
                map((response) => {
                    return CounterActions.deleteCounterSuccess(response)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CounterActions.deleteCounterFailure(errorResponse))
                })
            )
        ),
        tap(() => {
            this.store.dispatch(CounterActions.counter())
        })
    ));

    createCounter$ = createEffect(() => this.actions$.pipe(
        ofType(CounterActions.createCounter),
        mergeMap(request =>
            this.counterService.createCounter(request).pipe(
                map((response) => {
                    return CounterActions.createCounterSuccess(response)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CounterActions.createCounterFailure(errorResponse))
                })
            )
        ),
        tap(() => {
            this.router.navigate(['/counter-list']);
        })
    ));

    constructor(
        private router: Router,
        private store: Store,
        private actions$: Actions,
        private counterService: CounterService
    ) { }
}