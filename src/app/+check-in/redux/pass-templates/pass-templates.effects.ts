import { CheckInState } from '../check-in.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PassTemplateRepository } from '../../../shared/repositories/pass-template.repository';
import * as stateActions from './pass-templates.actions';
import { getHasLoadedPassTemplatesSelector } from '../check-in.reducer';

@Injectable()
export class PassTemplatesEffects {

  @Effect()
  public initialise$: Observable<Action> = this.actions$
    .ofType<stateActions.InitialisePassTemplates>(stateActions.INITIALISE_PASS_TEMPLATES)
    .withLatestFrom(this.store.select(getHasLoadedPassTemplatesSelector))
    .filter(([action, hasLoaded]) => !hasLoaded)
    .map(blockId => new stateActions.LoadPassTemplatesRequest());

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadPassTemplatesRequest>(stateActions.LOAD_PASS_TEMPLATES_REQUEST)
    .switchMap(() => this.repository.getAllSummaries()
      .map(passes => new stateActions.LoadPassTemplatesSuccess(passes))
      .catch(() => Observable.of(new stateActions.LoadPassTemplatesFailure(`Failed getting pass templates`)))
    );

  constructor(
    private actions$: Actions,
    private repository: PassTemplateRepository,
    private store: Store<CheckInState>,
  ) { }
}
