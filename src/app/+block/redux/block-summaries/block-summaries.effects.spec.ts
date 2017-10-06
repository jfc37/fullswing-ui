import { Block } from '../../../shared/state-models/block';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import { LoadBlockSummariesFailure, LoadBlockSummariesRequest, LoadBlockSummariesSuccess } from './block-summaries.actions';
import { BlockSummariesEffects } from './block-summaries.effects';

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

describe('BlockSummariesEffects', () => {
  let sut: BlockSummariesEffects;

  let actions$: TestActions;
  let repository: BlockRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BlockSummariesEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BlockRepository, useValue: {} },
      ],
    });

    sut = TestBed.get(BlockSummariesEffects);
    repository = TestBed.get(BlockRepository);
    actions$ = TestBed.get(Actions);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getAll = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadBlockSummariesRequest() });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success when block summaries are retrieved`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(a|)', {a: response});
      const expected = m.hot('----a', {a: new LoadBlockSummariesSuccess(response)});

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when block summaries throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', {a: new LoadBlockSummariesFailure(`Failed getting blocks`)});

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
