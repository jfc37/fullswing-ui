import { PassSelectionModel } from '../../components/pass-selection/pass-selection.component.model';
import { PurchasePassPreambleModel } from '../../components/purchase-pass-preamble/purchase-pass-preamble.component.model';
import { CheckInState } from '../../redux/check-in.state';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { Observable } from 'rxjs/Observable';
import { getPassSelectionModelSelector, getPurchasePassPreambleModelSelector } from '../../redux/check-in.reducer';

@Component({
  selector: 'fs-purchase-pass',
  templateUrl: './purchase-pass.container.html',
  styleUrls: ['./purchase-pass.container.scss']
})
export class PurchasePassContainer implements OnInit {
  public preambleModel$: Observable<PurchasePassPreambleModel>;
  public passSelectionModel$: Observable<PassSelectionModel>;

  constructor (
    private _store: Store<CheckInState>,
  ) {}

  public ngOnInit(): void {
    this._store.dispatch(new InitialisePassTemplates());

    this.preambleModel$ = this._store.select(getPurchasePassPreambleModelSelector);
    this.passSelectionModel$ = this._store.select(getPassSelectionModelSelector);
  }

  public passOptionChanged(id: number): void {
    console.error('xxx', id);
  }
}
