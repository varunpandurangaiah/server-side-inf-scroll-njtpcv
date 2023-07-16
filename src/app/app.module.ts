import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { carsReducer, CARS_REDUCER_KEY } from './state/cars.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CarsEffects } from './state/cars.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(CARS_REDUCER_KEY, carsReducer),
    EffectsModule.forFeature([CarsEffects]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
