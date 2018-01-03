import { Pass } from '../../../shared/state-models/pass';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { PassRepository } from '../../../shared/repositories/pass.repository';
import { LoadPassesFailure, LoadPassesRequest, LoadPassesSuccess, SetPassesForStudent } from './passes.actions';
import { PassesEffects } from './passes.effects';
import { Store } from '@ngrx/store';
import { CheckInState } from '../check-in.state';

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

describe('PassesEffects', () => {
  let sut: PassesEffects;

  let actions$: TestActions;
  let repository: PassRepository;
  let store: Store<CheckInState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PassesEffects,
        { provide: Actions, useFactory: getActions },
        { provide: PassRepository, useValue: {} },
        { provide: Store, useValue: {} },
      ],
    });

    repository = TestBed.get(PassRepository);
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
    store.select = jasmine.createSpy()
      .and.returnValue(Observable.of([]));

    sut = TestBed.get(PassesEffects);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    const studentId = 622;
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getForStudent = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadPassesRequest(studentId) });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success when passes are retrieved`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(a|)', {a: response});
      const expected = m.hot('----(ab)', {
        a: new LoadPassesSuccess(),
        b: new SetPassesForStudent(studentId, response)
      });

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when passes throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', {a: new LoadPassesFailure(`Failed getting passes for student`)});

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
