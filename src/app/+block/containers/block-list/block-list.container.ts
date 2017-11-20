import {
  DeleteBlockSummariesRequest,
  GenerateBlockSummariesRequest,
  LoadBlockSummariesRequest,
} from '../../redux/block-summaries/block-summaries.actions';
import { BlockState } from '../../redux/block.state';
import { BlocksSummaryModel } from '../../components/blocks-summary/blocks-summary.component.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getBlockSummariesModelSelector } from '../../redux/block.reducer';

@Component({
  selector: 'fs-block-list',
  templateUrl: './block-list.container.html',
  styleUrls: ['./block-list.container.scss']
})
export class BlockListContainer implements OnInit {
  public blocksSummaryModel$: Observable<BlocksSummaryModel>;

  constructor(private _store: Store<BlockState>) {}

  public ngOnInit() {
    this._store.dispatch(new LoadBlockSummariesRequest());
    this.blocksSummaryModel$ = this._store.select(getBlockSummariesModelSelector);
  }

  public deleteBlock(blockId: number) {
    this._store.dispatch(new DeleteBlockSummariesRequest(blockId));
  }

  public generateBlock(blockId: number) {
    this._store.dispatch(new GenerateBlockSummariesRequest(blockId));
  }
}
