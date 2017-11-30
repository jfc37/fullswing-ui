import { BlockEnrolmentModel } from '../../components/block-enrolment/block-enrolment.component.model';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { EnrolmentState } from '../../redux/enrolment.state';
import { InitialiseBlockEnrolment } from '../../redux/enrolable-blocks/enrolable-blocks.actions';
import { Observable } from 'rxjs/Observable';
import { getBlockEnrolmentModelSelector, getHasAnySelectedBlocksSelector } from '../../redux/enrolment.reducer';
import { InitialiseSelectedBlocks, ToggleBlockSelection, EnrolInSelectedBlocksRequest } from '../../redux/selected-blocks/selected-blocks.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fs-block-enrolment',
  templateUrl: './block-enrolment.container.html',
  styleUrls: ['./block-enrolment.container.scss']
})
export class BlockEnrolmentContainer implements OnInit {

  public model$: Observable<BlockEnrolmentModel>;
  public disableEnrol$: Observable<boolean>;

  constructor(
    private _store: Store<EnrolmentState>
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(new InitialiseBlockEnrolment());
    this._store.dispatch(new InitialiseSelectedBlocks());

    this.model$ = this._store.select(getBlockEnrolmentModelSelector);
    this.disableEnrol$ = this._store.select(getHasAnySelectedBlocksSelector)
      .map(hasSelected => !hasSelected);
  }

  public blockClicked(id: number): void {
    this._store.dispatch(new ToggleBlockSelection(id));
  }

  public enrolClicked(): void {
    this._store.dispatch(new EnrolInSelectedBlocksRequest());
  }
}
