import { ResetBlockSummaries } from '../../redux/block-summaries/block-summaries.actions';
import { LoadTeachersRequest } from '../../../core/redux/teachers/teachers.actions';
import { CreateBlockRequest, ResetNewBlock, UpdateNewBlock } from '../../redux/new-block/new-block.actions';
import { BlockState } from '../../redux/block.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlockFormModel, BlockModel } from '../../components/block-form/block-form.component.model';
import { Observable, ReplaySubject } from 'rxjs';
import { getNewBlockFormModelSelector, getHasNewBlockSavedSelector } from '../../redux/block.reducer';
import { modelToBlock } from '../../components/block-form/block-form.component.model.mapping';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-block-create',
  templateUrl: './block-create.container.html',
  styleUrls: ['./block-create.container.scss']
})
export class BlockCreateContainer implements OnInit, OnDestroy {
  public blockFormModel$: Observable<BlockFormModel>;
  public isFormValid = false;

  private _destroy$ = new ReplaySubject<void>();

  constructor(
    private _store: Store<BlockState>,
    private _router: Router) { }

  public ngOnInit(): void {
    this._store.dispatch(new ResetNewBlock());
    this._store.dispatch(new LoadTeachersRequest());

    this.blockFormModel$ = this._store.select(getNewBlockFormModelSelector);

    this._store.select(getHasNewBlockSavedSelector)
      .takeUntil(this._destroy$)
      .filter(hasSaved => hasSaved)
      .subscribe(() => {
        this._store.dispatch(new ResetBlockSummaries());
        this._router.navigate(['/blocks']);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public modelChanged(model: BlockModel): void {
    const updatedBlock = modelToBlock(model);
    this._store.dispatch(new UpdateNewBlock(updatedBlock));
  }

  public statusChanged(isValid: boolean): void {
    this.isFormValid = isValid;
  }

  public create(): void {
    this._store.dispatch(new CreateBlockRequest());
  }

}
