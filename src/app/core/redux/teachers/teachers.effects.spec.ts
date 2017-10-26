import { TeachersState } from './teachers.state';
import { Teacher } from '../../../shared/state-models/teacher';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { TeacherRepository } from '../../../shared/repositories/teacher.repository';
import { LoadTeachersFailure, LoadTeachersRequest, LoadTeachersSuccess } from './teachers.actions';
import { TeachersEffects } from './teachers.effects';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';

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

describe('TeachersEffects', () => {
  let sut: TeachersEffects;

  let actions$: TestActions;
  let repository: TeacherRepository;
  let store: Store<TeachersState>;

  let hasLoadedReplay: ReplaySubject<boolean>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeachersEffects,
        { provide: Actions, useFactory: getActions },
        { provide: TeacherRepository, useValue: {} },
        { provide: Store, useValue: {} },
      ],
    });

    hasLoadedReplay = new ReplaySubject();
    store = TestBed.get(Store);
    store.select = jasmine.createSpy('select')
      .and.returnValue(hasLoadedReplay);

    sut = TestBed.get(TeachersEffects);
    repository = TestBed.get(TeacherRepository);
    actions$ = TestBed.get(Actions);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getAll = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadTeachersRequest() });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    describe(`when teachers have not been loaded`, () => {

      beforeEach(() => {
        hasLoadedReplay.next(false);
      });

      it(`should emit success when teachers are retrieved`, marbles((m) => {
        const response = [];
        const repositoryObservable = m.cold('---(a|)', { a: response });
        const expected = m.hot('----a', { a: new LoadTeachersSuccess(response) });

        assertMables(repositoryObservable, expected, m);
      }));

      it(`should emit failure when teachers throw error`, marbles((m) => {
        const response = [];
        const repositoryObservable = m.cold('---(#|)');
        const expected = m.hot('----a', { a: new LoadTeachersFailure(`Failed getting teachers`) });

        assertMables(repositoryObservable, expected, m);
      }));
    });

    describe(`when teachers have been loaded`, () => {

      beforeEach(() => {
        hasLoadedReplay.next(true);
      });

      it(`should not emit anything`, marbles((m) => {
        const response = [];
        const repositoryObservable = m.cold('---(a|)', { a: response });
        const expected = m.hot('-----');

        assertMables(repositoryObservable, expected, m);
      }));
    });
  });
});
