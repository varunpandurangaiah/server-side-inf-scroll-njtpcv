import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { CarsApiService } from '../cars-api.service';
import { HelperService } from '../helper.service';
import { loadCars, loadCarsFailed, loadCarsSuccess } from './cars.actions';
import { CarsState } from './cars.reducer';

@Injectable({ providedIn: 'root' })
export class CarsEffects {
  loadCars$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadCars),
      switchMap((action) =>
        this.apiService.loadCars(action.offset).pipe(
          tap((cars) => {
            console.log(cars);
          }),
          // some other mapping or data manipulation here
          map(
            (cars) => loadCarsSuccess({ cars }),
            catchError((error) => {
              return of(loadCarsFailed({ error }));
            })
          )
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private apiService: CarsApiService,
    private store: Store<CarsState>,
    private helperService: HelperService
  ) {}
}
