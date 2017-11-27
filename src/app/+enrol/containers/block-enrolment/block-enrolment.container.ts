import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { EnrolmentState } from '../../redux/enrolment.state';
import { InitialiseBlockEnrolment } from '../../redux/enrolable-blocks/enrolable-blocks.actions';
import { Observable } from 'rxjs/Observable';
import { getBlockEnrolmentModelSelector } from '../../redux/enrolment.reducer';

@Component({
  selector: 'fs-block-enrolment',
  templateUrl: './block-enrolment.container.html',
  styleUrls: ['./block-enrolment.container.scss']
})
export class BlockEnrolmentContainer implements OnInit {

  public model$: Observable<any>;

  constructor(
    private _store: Store<EnrolmentState>
  ) {}

  public ngOnInit(): void {
    this._store.dispatch(new InitialiseBlockEnrolment());

    this.model$ = this._store.select(getBlockEnrolmentModelSelector);
  }
}
