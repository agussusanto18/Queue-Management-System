import {createReducer, on} from '@ngrx/store';
import * as CounterActions from '../actions/counter.action';
import { ErrorResponse } from '../../models/responses/error';
import { CounterResponse } from '../../models/responses/counter';
import { SuccessResponse } from 'src/app/models/responses/success';

export interface CounterState {
    counters: CounterResponse[];
    counter: CounterResponse;
    error: ErrorResponse | null;
    success: SuccessResponse | null
}

export const initialState: CounterState = {
    counters: [],
    counter: null,
    error: null,
    success: null
};

export const counterReducer = createReducer(
    initialState,
    on(CounterActions.counterSuccess, (state, { counters }) => ({ ...state, counters, error: null })),
    on(CounterActions.counterFailure, (state, error: ErrorResponse) => ({ ...state, counters: [], error: error, success: null })),
    on(CounterActions.deleteCounterFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CounterActions.deleteCounterSuccess, (state, success: SuccessResponse) => ({ ...state, error: null, success: success })),
    on(CounterActions.createCounterFailure, (state, error: ErrorResponse) => ({ ...state, error: error, success: null })),
    on(CounterActions.createCounterSuccess, (state, counter: CounterResponse) => ({ ...state, error: null, success: null, counter}))
);