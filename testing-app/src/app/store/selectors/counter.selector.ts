import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from '../reducers/counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounters = createSelector(selectCounterState, counter => counter.counters);

export const selectCounterError = createSelector(selectCounterState, counter => counter.error);

export const selectCounterSuccess = createSelector(selectCounterState, counter => counter.success);