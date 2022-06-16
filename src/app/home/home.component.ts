import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../data.service";
import {Subject, takeUntil, tap} from "rxjs";
import {DATE_FORMAT, Datum, Type} from "../data.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";

interface FormValues {
  text: string;
  numberMin: number;
  numberMax: number;
  boolean: string;
  enums: boolean[];
  dateFrom: string;
  dateTo: string;
}

//TODO: Validation numberMin < numberMax
//TODO: Cache sorting
//TODO: Split filter and table into separate components
//TODO: Move filtering logic to service
//TODO: Filter on user input change instead of form submit
//TODO: Fix/update pagination implementation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup = this.formBuilder.group({
    text: [],
    numberMin: [],
    numberMax: [],
    boolean: ['all'],
    enums: this.formBuilder.array([
      this.formBuilder.control(true),
      this.formBuilder.control(true),
      this.formBuilder.control(true)
    ]),
    dateFrom: [],
    dateTo: [],
  });

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

  readonly types: string[] = Object.values(Type);
  readonly pageSizeOptions: number[] = [5, 10, 20];

  private unsubscribe: Subject<void> = new Subject();

  private readonly defaultFormValues: FormValues = this.form.value;
  private readonly localStorageFormKey: string = 'FILTER_FORM';
  private readonly localStoragePageIndexKey: string = 'PAGE_INDEX';
  private readonly localStoragePageSizeKey: string = 'PAGE_SIZE';

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
    this.dataService.getData()
      .pipe(
        takeUntil(this.unsubscribe),
        tap(data => {
          this.dataSource.data = data;
          this.onSubmit();
        })
      ).subscribe()
    this.checkLocalStorage();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(): void {
    this.dataSource.filter = JSON.stringify(this.form.value);
    this.form.markAsPristine();
    localStorage.setItem(this.localStorageFormKey, JSON.stringify(this.form.value));
  }

  onReset(): void {
    this.dataSource.filter = JSON.stringify(this.defaultFormValues);
    this.form.reset(this.defaultFormValues);
    localStorage.setItem(this.localStorageFormKey, JSON.stringify(this.form.value));
  }

  onPageEvent(pageEvent: PageEvent): void {
    localStorage.setItem(this.localStoragePageIndexKey, `${pageEvent.pageIndex}`);
    localStorage.setItem(this.localStoragePageSizeKey, `${pageEvent.pageSize}`);
  }

  get enumsFormArray(): FormArray {
    return this.form.get('enums') as FormArray;
  }

  private filterPredicate(data: Datum, filter: string): boolean {
    const formValues: FormValues = JSON.parse(filter);

    const isBooleanMatch = this.isBooleanMatch(data.boolean, formValues.boolean);
    const isEnumMatch = this.isEnumMatch(data.enum, formValues.enums);
    const isInDateRange = this.isInDateRange(data.date, formValues.dateFrom, formValues.dateTo);
    const isInNumberRange = this.isInNumberRange(data.number, formValues.numberMin, formValues.numberMax);
    const hasTextMatch = this.hasTextMatch(data, formValues.text);

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
      console.log(datum);
      return datum.trim().toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  }

  private checkLocalStorage(): void {
    const localStorageFormValue = localStorage.getItem(this.localStorageFormKey);
    if (localStorageFormValue) {
      this.form.patchValue(JSON.parse(localStorageFormValue));
    }
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
}
