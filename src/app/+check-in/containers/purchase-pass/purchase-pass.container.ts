import { PassSelectionModel } from '../../components/pass-selection/pass-selection.component.model';
import { PurchasePassPreambleModel } from '../../components/purchase-pass-preamble/purchase-pass-preamble.component.model';
import { CheckInState } from '../../redux/check-in.state';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { Observable } from 'rxjs/Observable';
import { getPassSelectionModelSelector, getPurchasePassPreambleModelSelector, getDisablePurchasePassButtonSelector, getHasPurchasedSelector } from '../../redux/check-in.reducer';
import {
  ResetPassPurchase,
  SetPassForPurchase,
  SetStudentForPassPurchase,
  PurchasePassRequest,
} from '../../redux/pass-purchase/pass-purchase.actions';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'fs-purchase-pass',
  templateUrl: './purchase-pass.container.html',
  styleUrls: ['./purchase-pass.container.scss']
})
export class PurchasePassContainer implements OnInit, OnDestroy {
  public preambleModel$: Observable<PurchasePassPreambleModel>;
  public passSelectionModel$: Observable<PassSelectionModel>;
  public disablePurchaseButton$: Observable<boolean>;

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { studentId: number },
    private _dialogRef: MatDialogRef<PurchasePassContainer>,
    private _store: Store<CheckInState>,
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(new InitialisePassTemplates());
    this._store.dispatch(new ResetPassPurchase());
    this._store.dispatch(new SetStudentForPassPurchase(this._data.studentId));

    this.preambleModel$ = this._store.select(getPurchasePassPreambleModelSelector);
    this.passSelectionModel$ = this._store.select(getPassSelectionModelSelector);
    this.disablePurchaseButton$ = this._store.select(getDisablePurchasePassButtonSelector);

    this._store.select(getHasPurchasedSelector)
      .takeUntil(this._destroy$)
      .filter(Boolean)
      .subscribe(() => {
        this._dialogRef.close(true);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public passOptionChanged(id: number): void {
    this._store.dispatch(new SetPassForPurchase(id));
  }

  public purchase(): void {
    this._store.dispatch(new PurchasePassRequest());
  }
}
