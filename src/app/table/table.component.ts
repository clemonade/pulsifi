import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Datum} from "../data.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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

  private readonly localStoragePageIndexKey: string = 'PAGE_INDEX';
  private readonly localStoragePageSizeKey: string = 'PAGE_SIZE';

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

    const localStoragePageIndexValue = localStorage.getItem(this.localStoragePageIndexKey);
    if (localStoragePageIndexValue) {
      this.pageIndex = +localStoragePageIndexValue;
      this.paginator.pageIndex = +localStoragePageIndexValue;
    }
    const localStoragePageSizeValue = localStorage.getItem(this.localStoragePageSizeKey);
    if (localStoragePageSizeValue) {
      this.paginator._changePageSize(+localStoragePageSizeValue);
    }
  }

  onPageEvent(pageEvent: PageEvent): void {
    localStorage.setItem(this.localStoragePageIndexKey, `${pageEvent.pageIndex}`);
    localStorage.setItem(this.localStoragePageSizeKey, `${pageEvent.pageSize}`);
  }
}
