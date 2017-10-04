import { Pass } from '../../../shared/state-models/pass';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { PassRepository } from '../../../shared/repositories/pass.repository';
import { LoadCurrentPassesFailure, LoadCurrentPassesRequest, LoadCurrentPassesSuccess } from './current-passes.actions';
import { CurrentPassesEffects } from './current-passes.effects';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('CurrentPassesEffects', () => {
  let sut: CurrentPassesEffects;

  let actions$: TestActions;
  let repository: PassRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentPassesEffects,
        { provide: Actions, useFactory: getActions },
        { provide: PassRepository, useValue: {} },
      ],
    });

    sut = TestBed.get(CurrentPassesEffects);
    repository = TestBed.get(PassRepository);
    actions$ = TestBed.get(Actions);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getAllCurrent = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadCurrentPassesRequest() });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success when current passes are retrieved`, marbles((m) => {
      const passes = [];
      const repositoryObservable = m.cold('---(a|)', {a: passes});
      const expected = m.hot('----a', {a: new LoadCurrentPassesSuccess(passes)});

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when current passes throw error`, marbles((m) => {
      const passes = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', {a: new LoadCurrentPassesFailure(`Failed getting current passes`)});

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
