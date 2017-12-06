import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PurchasePassContainer } from '../containers/purchase-pass/purchase-pass.container';
import { CheckInState } from '../redux/check-in.state';
import { Store } from '@ngrx/store';

@Injectable()
export class DialogService {
  constructor(
    private _dialog: MatDialog,
    private _store: Store<CheckInState>,
  ) { }

  public openPassPurchase(): Observable<boolean> {
    const dialogRef = this._dialog.open(PurchasePassContainer, {
      height: '400px',
      width: '600px',
    });

    return dialogRef.afterClosed();
  }
}
