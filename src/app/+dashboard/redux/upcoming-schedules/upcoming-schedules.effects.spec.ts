import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { UpcomingScheduleEffects } from './upcoming-schedules.effects';
import { ClassRepository } from '../../../shared/repositories/class.repository';
import { LoadUpcomingScheduleRequest, LoadUpcomingScheduleSuccess, LoadUpcomingScheduleFailure } from './upcoming-schedules.actions';

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

describe('UpcomingScheduleEffects', () => {
  let sut: UpcomingScheduleEffects;

  let actions$: TestActions;
  let repository: ClassRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpcomingScheduleEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ClassRepository, useValue: {} },
      ],
    });

    sut = TestBed.get(UpcomingScheduleEffects);
    repository = TestBed.get(ClassRepository);
    actions$ = TestBed.get(Actions);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getUpcomingSchedule = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadUpcomingScheduleRequest() });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success when upcoming schedule is retrieved`, marbles((m) => {
      const classes = [];
      const repositoryObservable = m.cold('---(a|)', {a: classes});
      const expected = m.hot('----a', {a: new LoadUpcomingScheduleSuccess(classes)});

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when upcoming schedule throw error`, marbles((m) => {
      const classes = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', {a: new LoadUpcomingScheduleFailure(`Failed getting upcoming schedule`)});

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
