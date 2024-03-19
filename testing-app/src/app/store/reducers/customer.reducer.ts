import {createReducer, on} from '@ngrx/store';
import * as CustomerActions from '../actions/customer.action';
import { ErrorResponse } from '../../models/responses/error';
import { CustomerRequest } from '../../models/responses/customer';
import { SuccessResponse } from '../../models/responses/success';
import { CustomerResponse } from '../../models/responses/customer';

export interface CustomerState {
    customers: CustomerResponse[];
    uncalledCustomers: CustomerResponse[];
    calledCustomer: CustomerResponse;
    customer: CustomerResponse | null;
    error: ErrorResponse | null;
    success: SuccessResponse | null
}

export const initialState: CustomerState = {
    customers: [],
    uncalledCustomers: [],
    calledCustomer: null,
    customer: null,
    error: null,
    success: null
};

export const customerReducer = createReducer(
    initialState,
    on(CustomerActions.customerSuccess, (state, { customers }) => ({ ...state, customers, error: null })),
    on(CustomerActions.customerFailure, (state, error: ErrorResponse) => ({ ...state, customers: [], error: error, success: null })),
    on(CustomerActions.deleteCustomerFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CustomerActions.deleteCustomerSuccess, (state, success: SuccessResponse) => ({ ...state, error: null, success: success })),
    on(CustomerActions.createCustomerFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CustomerActions.createCustomerSuccess, (state, customer: CustomerResponse) => ({ ...state, error: null, success: null, customer})),
    on(CustomerActions.callCustomerFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CustomerActions.callCustomerSuccess, (state, customer: CustomerResponse) => ({ ...state, error: null, success: null, customer })),
    on(CustomerActions.getUncalledCustomerFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CustomerActions.getUncalledCustomerSuccess, (state, { uncalledCustomers }) => ({ ...state, error: null, success: null, uncalledCustomers })),
    on(CustomerActions.getCalledCustomerFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CustomerActions.getCalledCustomerSuccess, (state, calledCustomer: CustomerResponse) => ({ ...state, error: null, success: null, calledCustomer }))
);