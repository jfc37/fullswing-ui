import { BlockFormModel, BlockModel } from './block-form.component.model';
import { Component, EventEmitter, OnInit, Input, OnChanges, SimpleChanges, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { INPUT_DEBOUNCE } from '../../../core/constants';

@Component({
  selector: 'fs-block-form',
  templateUrl: './block-form.component.html',
  styleUrls: ['./block-form.component.scss']
})
export class BlockFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public model: BlockFormModel;

  @Output() public modelChanged = new EventEmitter<BlockModel>();
  @Output() public statusChanged = new EventEmitter<boolean>();

  public form: FormGroup;
  private _destroy$ = new ReplaySubject<void>();

  constructor(private _formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      minutesPerClass: ['', [Validators.required]],
      numberOfClasses: ['', [Validators.required]],
      classCapacity: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      inviteOnly: [''],
    });

    this.form.valueChanges
      .takeUntil(this._destroy$.asObservable())
      .debounceTime(INPUT_DEBOUNCE)
      .subscribe(() => this.emitModel());

    this.form.statusChanges
      .takeUntil(this._destroy$.asObservable())
      .debounceTime(INPUT_DEBOUNCE)
      .map(() => this.form.valid)
      .distinctUntilChanged()
      .subscribe(isValid => this.statusChanged.emit(isValid));
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['model'].isFirstChange() && this.model && this.model.block) {
      this.updateFormGroup();
    }
  }

  private updateFormGroup() {
    const startTime = this.model.block.startDate
      ? moment(this.model.block.startDate).format('HH:mm')
      : null;

    this.form.patchValue({
      ...this.model.block,
      startTime
    }, { emitEvent: false });

    this.statusChanged.emit(this.form.valid);
  }

  private emitModel(): void {
    const model = {
      ...this.form.value,
      startDate: this.getCombinedStartDate()
    };

    this.modelChanged.emit(model);
  }

  private getCombinedStartDate(): Date {
    const startDate = this.form.get('startDate').value;
    const startTime = this.form.get('startTime').value as string;
    const [hour, minute] = startTime.split(':').map(x => Number(x));
    const combinedMoment = moment(startDate).hour(hour).minutes(minute);
    return combinedMoment && combinedMoment.isValid()
      ? combinedMoment.toDate()
      : null;
  }
}
