import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {debounceTime, Observable, Subject, takeUntil, tap} from "rxjs";
import {Datum, Filter} from "../data.model";

//TODO: Validation numberMin < numberMax
//TODO: Cache sorting
//TODO: Visualise loading
//TODO: Fix/update pagination implementation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: Observable<Datum[]> = this.dataService.getData();

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
        takeUntil(this.unsubscribe),
        debounceTime(this.dueTime),
        tap(filter => this.dataService.filterData(filter))
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
