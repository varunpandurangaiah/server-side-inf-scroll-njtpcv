import { createAction, props } from "@ngrx/store";
import { Car } from "../models/car";

export enum CarsActions {
  LoadCarsStarted = 'Load Cars started',
  LoadCarsSuccess = 'Load Cars success',
  LoadCarsFailed = 'Load Cars failed',
}

export const loadCars = createAction(
  CarsActions.LoadCarsStarted,
  props<{ limit: number; offset: number }>()
);

export const loadCarsSuccess = createAction(
  CarsActions.LoadCarsSuccess,
  props<{ cars: Car[] }>()
);

export const loadCarsFailed = createAction(
  CarsActions.LoadCarsFailed,
  props<{ error: Error }>()
);