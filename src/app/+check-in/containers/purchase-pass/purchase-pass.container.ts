import { PassSelectionModel } from '../../components/pass-selection/pass-selection.component.model';
import { PurchasePassPreambleModel } from '../../components/purchase-pass-preamble/purchase-pass-preamble.component.model';
import { CheckInState } from '../../redux/check-in.state';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { Observable } from 'rxjs/Observable';
import { getPassSelectionModelSelector, getPurchasePassPreambleModelSelector, getDisablePurchasePassButtonSelector } from '../../redux/check-in.reducer';
import {
  ResetPassPurchase,
  SetPassForPurchase,
  SetStudentForPassPurchase,
} from '../../redux/pass-purchase/pass-purchase.actions';

@Component({
  selector: 'fs-purchase-pass',
  templateUrl: './purchase-pass.container.html',
  styleUrls: ['./purchase-pass.container.scss']
})
export class PurchasePassContainer implements OnInit {
  public preambleModel$: Observable<PurchasePassPreambleModel>;
  public passSelectionModel$: Observable<PassSelectionModel>;
  public disablePurchaseButton$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { studentId: number },
    private _store: Store<CheckInState>,
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(new InitialisePassTemplates());
    this._store.dispatch(new ResetPassPurchase());
    this._store.dispatch(new SetStudentForPassPurchase(this._data.studentId));

    this.preambleModel$ = this._store.select(getPurchasePassPreambleModelSelector);
    this.passSelectionModel$ = this._store.select(getPassSelectionModelSelector);
    this.disablePurchaseButton$ = this._store.select(getDisablePurchasePassButtonSelector);
  }

  public passOptionChanged(id: number): void {
    this._store.dispatch(new SetPassForPurchase(id));
  }
}
