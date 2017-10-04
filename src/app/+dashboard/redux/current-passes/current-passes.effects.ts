import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PassRepository } from '../../../shared/repositories/pass.repository';
import { LoadCurrentPassesFailure, LoadCurrentPassesSuccess } from './current-passes.actions';
import * as currentPasses from './current-passes.actions';

@Injectable()
export class CurrentPassesEffects {
  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<currentPasses.LoadCurrentPassesRequest>(currentPasses.LOAD_CURRENT_PASSES_REQUEST)
    .switchMap(() => this.passRepository.getAllCurrent()
      .map(passes => new LoadCurrentPassesSuccess(passes))
      .catch(() => Observable.of(new LoadCurrentPassesFailure(`Failed getting current passes`)))
    );

  constructor(
    private actions$: Actions,
    private passRepository: PassRepository
  ) {}
}
