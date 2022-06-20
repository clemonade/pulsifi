import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from "rxjs";
import {DATA, DATE_FORMAT, Datum, Filter, TYPES} from "./data.model";
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: BehaviorSubject<Datum[]> = new BehaviorSubject<Datum[]>([]);
  readonly types: string[] = TYPES;

  constructor() {
  }

  getData(): Observable<Datum[]> {
    return this.data.asObservable()
      .pipe(delay(100));
  }

  filterData(filter: Filter) {
    this.data.next(DATA.filter(datum => this.filterPredicate(datum, filter)));
  }

  private filterPredicate(data: Datum, filter: Filter): boolean {
    const isBooleanMatch = this.isBooleanMatch(data.boolean, filter.boolean);
    const isEnumMatch = this.isEnumMatch(data.enum, filter.enums);
    const isInDateRange = this.isInDateRange(data.date, filter.dateFrom, filter.dateTo);
    const isInNumberRange = this.isInNumberRange(data.number, filter.numberMin, filter.numberMax);
    const hasTextMatch = this.hasTextMatch(data, filter.text);

    return isBooleanMatch && isEnumMatch && isInDateRange && isInNumberRange && hasTextMatch;
  }

  private isBooleanMatch(data: boolean, filter: string): boolean {
    switch (filter) {
      case "all":
        return true;
      case "true":
        return data;
      case "false":
      default:
        return !data
    }
  }

  private isEnumMatch(data: string, filter: boolean[]): boolean {
    const filteredTypes: string[] = this.types.filter((_, i) => filter[i]);
    return filteredTypes.includes(data);
  }

  private isInDateRange(data: string, dateFrom?: string, dateTo?: string): boolean {
    if (dateFrom && dateTo) {
      let from = moment(dateFrom).format(DATE_FORMAT);
      let to = moment(dateTo).format(DATE_FORMAT);
      return (data >= from && data <= to);
    }

    if (dateFrom || dateTo) {
      let date = moment(dateFrom || dateTo).format(DATE_FORMAT);
      return data == date;
    }
    return true;
  }

  private isInNumberRange(data: number, min?: number, max?: number): boolean {
    if (min && max) return data >= min && data <= max;
    if (min) return data >= min;
    if (max) return data <= max;
    return true;
  }

  private hasTextMatch(data: Datum, filter?: string): boolean {
    if (filter) {
      const datum = Object.values(data).reduce((a, b) => a + b);
      return datum.trim().toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  }
}
