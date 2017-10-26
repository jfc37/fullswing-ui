import { Block } from '../../../shared/state-models/block';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import { LoadDraftBlockFailure, LoadDraftBlockRequest, LoadDraftBlockSuccess, SaveSelectedDraftBlockRequest, SaveSelectedDraftBlockSuccess, SaveSelectedDraftBlockFailure } from './draft-blocks.actions';
import { DraftBlocksEffects } from './draft-blocks.effects';
import { ineeda } from 'ineeda';
import { Store } from '@ngrx/store';
import { BlockState } from '../block.state';

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

describe('DraftBlocksEffects', () => {
  let sut: DraftBlocksEffects;

  let actions$: TestActions;
  let repository: BlockRepository;
  let store: Store<BlockState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DraftBlocksEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BlockRepository, useValue: {} },
        { provide: Store, useValue: {} },
      ],
    });

    repository = TestBed.get(BlockRepository);
    store = TestBed.get(Store);
    store.select = jasmine.createSpy('select')
      .and.returnValue(Observable.of(null));
    actions$ = TestBed.get(Actions);
    sut = TestBed.get(DraftBlocksEffects);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('load', () => {
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getById = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadDraftBlockRequest(1342) });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success when block are retrieved`, marbles((m) => {
      const response = ineeda<Block>();
      const repositoryObservable = m.cold('---(a|)', { a: response });
      const expected = m.hot('----a', { a: new LoadDraftBlockSuccess(response) });

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when block throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', { a: new LoadDraftBlockFailure(`Failed getting block`) });

      assertMables(repositoryObservable, expected, m);
    }));
  });

  describe('save', () => {
    const selectedBlock = ineeda<Block>();

    beforeEach(() => {
      store.select = jasmine.createSpy('select')
        .and.returnValue(Observable.of(selectedBlock));
    });

    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.update = jasmine.createSpy('update')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new SaveSelectedDraftBlockRequest() });

      m.expect(sut.save$).toBeObservable(expectedObservable);
    }

    it(`should emit success when block is saved`, marbles((m) => {
      const response = ineeda<Block>();
      const repositoryObservable = m.cold('---(a|)', { a: response });
      const expected = m.hot('----a', { a: new SaveSelectedDraftBlockSuccess() });

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when save throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', { a: new SaveSelectedDraftBlockFailure(`Failed saving block`) });

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
