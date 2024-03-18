// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';
import * as CustomerActions from '../actions/customer.action';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../models/responses/error';
import { Store } from '@ngrx/store';


@Injectable()
export class CustomerEffects {

    getCounters$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.customer),
        mergeMap(() =>
            this.customerService.getCustomers().pipe(
                map((customerResponse) => {
                    return CustomerActions.customerSuccess({ customers: customerResponse})
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CustomerActions.customerFailure(errorResponse))
                })
            )
        )
    ));

    deleteCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.deleteCustomer),
        mergeMap(param =>
            this.customerService.deleteCustomer(param.id).pipe(
                map((response) => {
                    return CustomerActions.deleteCustomerSuccess(response)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CustomerActions.deleteCustomerFailure(errorResponse))
                })
            )
        ),
        tap(() => {
            this.store.dispatch(CustomerActions.customer())
        })
    ));

    createCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.createCustomer),
        mergeMap(request =>
            this.customerService.createCustomer(request).pipe(
                map((response) => {
                    return CustomerActions.createCustomerSuccess(response)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CustomerActions.createCustomerFailure(errorResponse))
                })
            )
        ),
        tap(() => {
            this.router.navigate(['/visitor-list']);
        })
    ));

    callCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.callCustomer),
        mergeMap(param =>
            this.customerService.callCustomer(param.id).pipe(
                map((response) => {
                    return CustomerActions.callCustomerSuccess(response)
                }),
                catchError(error => {
                    const errorResponse: ErrorResponse = {
                        message: error.error.error.message || 'There is something wrong, please try it later'
                    };
                    return of(CustomerActions.callCustomerFailure(errorResponse))
                })
            )
        ),
        tap(() => {
            this.store.dispatch(CustomerActions.customer())
        })
    ));

    constructor(
        private router: Router,
        private store: Store,
        private actions$: Actions,
        private customerService: CustomerService
    ) { }
}