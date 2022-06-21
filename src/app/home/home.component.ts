import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {debounceTime, Observable, Subject, takeUntil, tap} from "rxjs";
import {Datum, Filter} from "../data.model";

//TODO: Fix loading for no matching data on reset form
//TODO: Fix/update pagination implementation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: Observable<Datum[]> = this.dataService.getData();
  isLoading: boolean = true;

  private filterChange: Subject<Filter> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  private readonly dueTime = 500;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.filterChange
      .pipe(
        tap(_ => this.isLoading = true),
        takeUntil(this.unsubscribe),
        debounceTime(this.dueTime),
        tap(filter => {
          this.dataService.filterData(filter);
          this.isLoading = false;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onFilterChange(filter: Filter): void {
    this.filterChange.next(filter);
  }
}
