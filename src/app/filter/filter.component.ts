import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {Filter, TYPES} from "../data.model";
import {filter, Subject, takeUntil, tap} from "rxjs";

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
  }, {validators: this.validateNumber});

  readonly types: string[] = TYPES;

  private unsubscribe: Subject<void> = new Subject();

  private readonly defaultFormValues: Filter = this.form.value;
  private readonly localStorageFilterKey: string = 'FILTER';

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
        filter(_ => this.form.valid),
        tap(_ => {
          this.filterChanges.emit(this.form.value);
          localStorage.setItem(this.localStorageFilterKey, JSON.stringify(this.form.value));
        })
      ).subscribe();

    const localStorageFormValue = localStorage.getItem(this.localStorageFilterKey);
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
    localStorage.setItem(this.localStorageFilterKey, JSON.stringify(this.form.value));
  }

  private validateNumber(group: FormGroup): ValidationErrors | null {
    const numberMin = group.controls['numberMin'].value;
    const numberMax = group.controls['numberMax'].value;
    if (numberMin && numberMax && numberMin !== 0 && numberMax !== 0) {
      if (numberMin > numberMax) {
        group.controls['numberMin'].setErrors({numberMinError: true});
        group.controls['numberMax'].setErrors({numberMaxError: true});
        return {numberError: true};
      }
    }
    group.controls['numberMin'].setErrors(null);
    group.controls['numberMax'].setErrors(null);
    return null;
  }
}
