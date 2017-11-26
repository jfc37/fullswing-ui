import { getClassSummariesModelSelector } from '../../redux/block.reducer';
import { SetSelectedBlockId } from '../../redux/block-classes/block-classes.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlockState } from '../../redux/block.state';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fs-class-list',
  templateUrl: './class-list.container.html',
  styleUrls: ['./class-list.container.scss']
})
export class ClassListContainer implements OnInit, OnDestroy {
  public model$: Observable<any>;
  private _destroy$ = new ReplaySubject<void>();

  constructor(
    private _store: Store<BlockState>,
    private _activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.model$ = this._store.select(getClassSummariesModelSelector);
    this._activatedRoute.params
      .takeUntil(this._destroy$)
      .map(params => +params['id'])
      .subscribe(id => {
        this._store.dispatch(new SetSelectedBlockId(id));
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
