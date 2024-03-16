import { createAction, props } from '@ngrx/store'
import { CounterRequest, CounterResponse } from '../../models/responses/counter';
import { ErrorResponse } from '../../models/responses/error'
import { SuccessResponse } from '../../models/responses/success'

export const counter = createAction('[Counter] Counter');
export const counterSuccess = createAction('[Counter] Counter Success', props<{ counters: CounterResponse[] }>());
export const counterFailure = createAction('[Counter] Counter Failure', props<ErrorResponse>());

export const deleteCounter = createAction('[Counter] Delete Counter', props<{id: string}>());
export const deleteCounterSuccess = createAction('[Counter] Delete Counter Success', props<SuccessResponse>());
export const deleteCounterFailure = createAction('[Counter] Delete Counter Failure', props<ErrorResponse>());

export const createCounter = createAction('[Counter] Create Counter', props<CounterRequest>());
export const createCounterSuccess = createAction('[Counter] Create Counter Success', props<CounterResponse>());
export const createCounterFailure = createAction('[Counter] Create Counter Failure', props<ErrorResponse>());