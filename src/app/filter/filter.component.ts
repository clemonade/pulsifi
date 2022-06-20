import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Filter, TYPES} from "../data.model";
import {Subject, takeUntil, takeWhile, tap} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output()
  filterChanges: EventEmitter<Filter> = new EventEmitter<Filter>();

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

  readonly types: string[] = TYPES;

  private unsubscribe: Subject<void> = new Subject();

  private readonly defaultFormValues: Filter = this.form.value;
  private readonly localStorageFormKey: string = 'FILTER_FORM';

  get enumsFormArray(): FormArray {
    return this.form.get('enums') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        takeWhile(_ => this.form.valid),
        tap(_ => {
          this.filterChanges.emit(this.form.value);
          localStorage.setItem(this.localStorageFormKey, JSON.stringify(this.form.value));
        })
      ).subscribe();

    const localStorageFormValue = localStorage.getItem(this.localStorageFormKey);
    if (localStorageFormValue) {
      this.form.patchValue(JSON.parse(localStorageFormValue));
    } else {
      this.form.patchValue(this.defaultFormValues);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onReset(): void {
    this.form.reset(this.defaultFormValues);
    localStorage.setItem(this.localStorageFormKey, JSON.stringify(this.form.value));
  }
}
