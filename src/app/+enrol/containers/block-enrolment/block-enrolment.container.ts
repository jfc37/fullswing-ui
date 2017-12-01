import { BlockEnrolmentModel } from '../../components/block-enrolment/block-enrolment.component.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrolmentState } from '../../redux/enrolment.state';
import { InitialiseBlockEnrolment, ResetEnrolableBlocks } from '../../redux/enrolable-blocks/enrolable-blocks.actions';
import { Observable } from 'rxjs/Observable';
import { getBlockEnrolmentModelSelector, getEnrolEnabledSelector, getHasEnrolledSuccessfullySelector } from '../../redux/enrolment.reducer';
import { InitialiseSelectedBlocks, ToggleBlockSelection, EnrolInSelectedBlocksRequest } from '../../redux/selected-blocks/selected-blocks.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'fs-block-enrolment',
  templateUrl: './block-enrolment.container.html',
  styleUrls: ['./block-enrolment.container.scss']
})
export class BlockEnrolmentContainer implements OnInit, OnDestroy {

  public model$: Observable<BlockEnrolmentModel>;
  public disableEnrol$: Observable<boolean>;

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    private _store: Store<EnrolmentState>,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(new InitialiseBlockEnrolment());
    this._store.dispatch(new InitialiseSelectedBlocks());

    this.model$ = this._store.select(getBlockEnrolmentModelSelector);
    this.disableEnrol$ = this._store.select(getEnrolEnabledSelector)
      .map(hasSelected => !hasSelected);

      this._store.select(getHasEnrolledSuccessfullySelector)
        .takeUntil(this._destroy$)
        .filter(hasSaved => hasSaved)
        .subscribe(() => {
          this._store.dispatch(new ResetEnrolableBlocks());
          this._router.navigate(['/dashboard']);
        });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public blockClicked(id: number): void {
    this._store.dispatch(new ToggleBlockSelection(id));
  }

  public enrolClicked(): void {
    this._store.dispatch(new EnrolInSelectedBlocksRequest());
  }
}
