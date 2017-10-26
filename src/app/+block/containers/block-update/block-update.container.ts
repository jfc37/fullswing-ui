import { ResetBlockSummaries } from '../../redux/block-summaries/block-summaries.actions';
import { LoadTeachersRequest } from '../../../core/redux/teachers/teachers.actions';
import { modelToBlock } from '../../components/block-form/block-form.component.model.mapping';
import { Block } from '../../../shared/state-models/block';
import { getDraftBlockFormModelSelector, getHasDraftBlockSavedSelector } from '../../redux/block.reducer';
import { BlockFormModel, BlockModel } from '../../components/block-form/block-form.component.model';
import {
  LoadDraftBlockRequest,
  SaveSelectedDraftBlockRequest,
  SetSelectedDraftBlockId,
  UpdateSelectedDraftBlock,
  ResetDraftBlock,
} from '../../redux/draft-blocks/draft-blocks.actions';
import { BlockState } from '../../redux/block.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'fs-block-update',
  templateUrl: './block-update.container.html',
  styleUrls: ['./block-update.container.scss']
})
export class BlockUpdateContainer implements OnInit, OnDestroy {
  public blockFormModel$: Observable<BlockFormModel>;
  public isFormValid = false;

  private _destroy$ = new ReplaySubject<void>();
  constructor(
    private _store: Store<BlockState>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this._store.dispatch(new LoadTeachersRequest());

    this._activatedRoute.params
      .takeUntil(this._destroy$)
      .map(params => +params['id'])
      .subscribe(id => {
        this._store.dispatch(new ResetDraftBlock());
        this._store.dispatch(new SetSelectedDraftBlockId(id));
        this._store.dispatch(new LoadDraftBlockRequest(id));
      });

    this.blockFormModel$ = this._store.select(getDraftBlockFormModelSelector);

    this._store.select(getHasDraftBlockSavedSelector)
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
    this._store.dispatch(new UpdateSelectedDraftBlock(updatedBlock));
  }

  public statusChanged(isValid: boolean): void {
    this.isFormValid = isValid;
  }

  public save(): void {
    this._store.dispatch(new SaveSelectedDraftBlockRequest());
  }
}
