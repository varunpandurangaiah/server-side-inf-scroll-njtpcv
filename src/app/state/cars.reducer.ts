import { Action, createReducer, on } from '@ngrx/store';
import { Car } from '../models/car';
import { loadCars, loadCarsFailed, loadCarsSuccess } from './cars.actions';

export const CARS_REDUCER_KEY = 'CARS_STATE';

export interface CarsState {
  loading: boolean;
  cars: Car[];
}

export const initialState: CarsState = {
  loading: false,
  cars: [],
};

const reducer = createReducer(
  initialState,
  on(loadCars, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadCarsSuccess, (state, { cars }) => ({
    ...state,
    loading: false,
    cars,
  })),
  on(loadCarsFailed, (state) => ({
    ...state,
    loading: false,
  }))
);

export function carsReducer(
  state: CarsState | undefined,
  action: Action
): CarsState {
  return reducer(state, action);
}
