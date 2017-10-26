import { CreateBlockFailure, CreateBlockRequest, CreateBlockSuccess } from './new-block.actions';
import { NewBlockEffects } from './new-block.effects';
import { Block } from '../../../shared/state-models/block';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { BlockRepository } from '../../../shared/repositories/block.repository';
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

describe('NewBlockEffects', () => {
  let sut: NewBlockEffects;

  let actions$: TestActions;
  let repository: BlockRepository;
  let store: Store<BlockState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewBlockEffects,
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
    sut = TestBed.get(NewBlockEffects);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('save', () => {
    const block = ineeda<Block>();

    beforeEach(() => {
      store.select = jasmine.createSpy('select')
        .and.returnValue(Observable.of(block));
    });

    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.create = jasmine.createSpy('create')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new CreateBlockRequest() });

      m.expect(sut.create$).toBeObservable(expectedObservable);
    }

    it(`should emit success when block is created`, marbles((m) => {
      const response = ineeda<Block>();
      const repositoryObservable = m.cold('---(a|)', { a: response });
      const expected = m.hot('----a', { a: new CreateBlockSuccess() });

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when save throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', { a: new CreateBlockFailure(`Failed creating block`) });

      assertMables(repositoryObservable, expected, m);
    }));
  });
});
