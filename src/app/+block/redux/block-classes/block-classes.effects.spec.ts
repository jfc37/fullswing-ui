import { SetClasses } from '../classes/classes.actions';
import { LoadBlockClassesSuccess, SetSelectedBlockId, LoadBlockClassesFailure, LoadBlockClassesRequest } from './block-classes.actions';
import { ClassRepository } from '../../../shared/repositories/class.repository';
import { BlockState } from '../block.state';
import { Block } from '../../../shared/state-models/block';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { marbles, Context } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ineeda } from 'ineeda';
import { BlockClassesEffects } from './block-classes.effects';

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

describe('BlockClassesEffects', () => {
  let sut: BlockClassesEffects;

  let actions$: TestActions;
  let repository: ClassRepository;
  let store: Store<BlockState>;

  let hasLoadedReplay: ReplaySubject<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BlockClassesEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ClassRepository, useValue: {} },
        { provide: Store, useValue: {} },
      ],
    });

    hasLoadedReplay = new ReplaySubject();
    store = TestBed.get(Store);
    store.select = jasmine.createSpy('select')
      .and.returnValue(hasLoadedReplay);

    sut = TestBed.get(BlockClassesEffects);
    repository = TestBed.get(ClassRepository);
    actions$ = TestBed.get(Actions);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('setSelectedId', () => {
    function assertMables(expectedObservable, m: Context) {
      actions$.stream = m.hot('-a---', { a: new SetSelectedBlockId(1) });

      m.expect(sut.setSelectedId$).toBeObservable(expectedObservable);
    }

    describe(`when block summaries have not been loaded`, () => {
      beforeEach(() => {
        hasLoadedReplay.next(false);
      });

      it(`should emit success when block classes are retrieved`, marbles((m) => {
        const response = [];
        const expected = m.hot('-a---', { a: new LoadBlockClassesRequest(1) });

        assertMables(expected, m);
      }));
    });

    describe(`when block classes have been loaded`, () => {
      beforeEach(() => {
        hasLoadedReplay.next(true);
      });

      it(`should not emit any action`, marbles((m) => {
        const response = [];
        const expected = m.hot('-----');

        assertMables(expected, m);
      }));
    });
  });

  describe('load', () => {
    const blockId = 5421;
    function assertMables(repositoryObservable, expectedObservable, m: Context) {
      repository.getForBlock = jasmine.createSpy('get')
        .and.returnValue(repositoryObservable);

      actions$.stream = m.hot('-a---', { a: new LoadBlockClassesRequest(blockId) });

      m.expect(sut.load$).toBeObservable(expectedObservable);
    }

    it(`should emit success and SetClasses when block classes are retrieved`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(a|)', { a: response });
      const expected = m.hot('----(ab)', {
        a: new SetClasses(response),
        b: new LoadBlockClassesSuccess(blockId, response),
      });

      assertMables(repositoryObservable, expected, m);
    }));

    it(`should emit failure when block classes throw error`, marbles((m) => {
      const response = [];
      const repositoryObservable = m.cold('---(#|)');
      const expected = m.hot('----a', { a: new LoadBlockClassesFailure(`Failed getting block classes`) });

      assertMables(repositoryObservable, expected, m);
    }));

  });
});
