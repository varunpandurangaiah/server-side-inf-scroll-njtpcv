import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Car } from "./models/car";

@Injectable({ providedIn: 'root' })
export class HelperService {
  private carsSubj = new BehaviorSubject<Car[]>([]);

  constructor(){}

  getCarData() {
    return this.carsSubj;
  }

  setCarData(data: Car[]) {
    this.carsSubj.next(data);
  }
}