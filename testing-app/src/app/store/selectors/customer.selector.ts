import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectCustomers = createSelector(selectCustomerState, customer => customer.customers);

export const selectCustomerError = createSelector(selectCustomerState, customer => customer.error);

export const selectCustomerSuccess = createSelector(selectCustomerState, customer => customer.success);

export const selectUncalledCustomers = createSelector(selectCustomerState, customer => customer.uncalledCustomers);

export const selectCalledCustomer = createSelector(selectCustomerState, customer => customer.calledCustomer);