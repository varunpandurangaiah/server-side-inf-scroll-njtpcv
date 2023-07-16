import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Car } from "./models/car";

@Injectable({ providedIn: 'root' })
export class CarsApiService {
  constructor(private http: HttpClient) {}

  loadCars(offset: number): Observable<Car[]> {
    return this.http.get<Car[]>(`https://my-json-server.typicode.com/syzmon9/cars-db/cars_${offset}`);
  }
}