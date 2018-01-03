import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PurchasePassContainer } from '../containers/purchase-pass/purchase-pass.container';
import { CheckInState } from '../redux/check-in.state';
import { Store } from '@ngrx/store';
import { CreateNewStudentContainer } from '../containers/create-new-student/create-new-student.container';

@Injectable()
export class DialogService {
  constructor(
    private _dialog: MatDialog,
    private _store: Store<CheckInState>,
  ) { }

  public openPassPurchase(studentId: number): Observable<boolean> {
    const dialogRef = this._dialog.open(PurchasePassContainer, {
      height: '400px',
      width: '600px',
      data: { studentId },
    });

    return dialogRef.afterClosed();
  }

  public openCreateNewStudent(): Observable<number> {
    const dialogRef = this._dialog.open(CreateNewStudentContainer, {
      height: '400px',
      width: '600px',
    });

    return dialogRef.afterClosed();
  }
}
