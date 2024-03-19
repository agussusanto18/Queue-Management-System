import { createAction, props } from '@ngrx/store'
import { CustomerRequest, CustomerResponse } from '../../models/responses/customer';
import { ErrorResponse } from '../../models/responses/error'
import { SuccessResponse } from '../../models/responses/success'

export const customer = createAction('[Customer] Customer');
export const customerSuccess = createAction('[Customer] Customer Success', props<{ customers: CustomerResponse[] }>());
export const customerFailure = createAction('[Customer] Customer Failure', props<ErrorResponse>());

export const deleteCustomer = createAction('[Customer] Delete Customer', props<{id: string}>());
export const deleteCustomerSuccess = createAction('[Customer] Delete Customer Success', props<SuccessResponse>());
export const deleteCustomerFailure = createAction('[Customer] Delete Customer Failure', props<ErrorResponse>());

export const createCustomer = createAction('[Customer] Create Customer', props<CustomerRequest>());
export const createCustomerSuccess = createAction('[Customer] Create Customer Success', props<CustomerResponse>());
export const createCustomerFailure = createAction('[Customer] Create Customer Failure', props<ErrorResponse>());

export const callCustomer = createAction('[Customer] Call Customer', props<{ id: string }>());
export const callCustomerSuccess = createAction('[Customer] Call Customer Success', props<CustomerResponse>());
export const callCustomerFailure = createAction('[Customer] Call Customer Failure', props<ErrorResponse>());

export const getUncalledCustomer = createAction('[Customer] Uncalled Customer');
export const getUncalledCustomerSuccess = createAction('[Customer] Uncalled Customer Success', props<{ uncalledCustomers: CustomerResponse[] }>());
export const getUncalledCustomerFailure = createAction('[Customer] Uncalled Customer Failure', props<ErrorResponse>());

export const getCalledCustomer = createAction('[Customer] Called Customer');
export const getCalledCustomerSuccess = createAction('[Customer] Called Customer Success', props<CustomerResponse>());
export const getCalledCustomerFailure = createAction('[Customer] Called Customer Failure', props<ErrorResponse>());