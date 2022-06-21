import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Datum} from "../data.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortable, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input()
  set data(value: Datum[]) {
    this.dataSource.data = value;
  }

  @Input() isLoading: boolean = false;

  dataSource: MatTableDataSource<Datum> = new MatTableDataSource<Datum>([]);

  displayedColumns: string[] = [
    'id',
    'name',
    'fullName',
    'number',
    'boolean',
    'enum',
    'date'
  ];

  pageIndex: number = 0;

  readonly pageSizeOptions: number[] = [5, 10, 20];

  private readonly localStorageSortKey: string = 'SORT';
  private readonly localStoragePageKey: string = 'PAGE';

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    const localStorageSortValue = localStorage.getItem(this.localStorageSortKey);
    if (localStorageSortValue) {
      const sort: Sort = JSON.parse(localStorageSortValue);
      this.sort.sort({id: sort.active, start: sort.direction} as MatSortable);
    }

    const localStoragePageValue = localStorage.getItem(this.localStoragePageKey);
    if (localStoragePageValue) {
      const pageEvent: PageEvent = JSON.parse(localStoragePageValue)
      this.pageIndex = pageEvent.pageIndex;
      this.paginator.pageIndex = pageEvent.pageIndex;
      this.paginator._changePageSize(pageEvent.pageSize);
    }
  }

  onSortEvent(sort: Sort): void {
    sort.direction
      ? localStorage.setItem(this.localStorageSortKey, JSON.stringify(sort))
      : localStorage.removeItem(this.localStorageSortKey);
  }

  onPageEvent(pageEvent: PageEvent): void {
    localStorage.setItem(this.localStoragePageKey, JSON.stringify(pageEvent));
  }
}
