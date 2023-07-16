import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarsState, CARS_REDUCER_KEY } from './cars.reducer';

const carsSelector = createFeatureSelector<CarsState>(CARS_REDUCER_KEY);
export const getCars = createSelector(carsSelector, (state) => state.cars);
export const isLoading = createSelector(carsSelector, (state) => state.loading);
