import {Injectable} from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {DATA, Datum} from "./data.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  getData(): Observable<Datum[]> {
    return of(DATA)
      .pipe(delay(100));
  }
}
