import { LoadBlockSummariesRequest, DeleteBlockSummariesSuccess, DeleteBlockSummariesRequest } from '../../redux/block-summaries/block-summaries.actions';
import { BlockState } from '../../redux/block.state';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListContainer } from './block-list.container';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBlockSummariesModelSelector } from '../../redux/block.reducer';

describe('BlockListContainer', () => {
  let component: BlockListContainer;
  let fixture: ComponentFixture<BlockListContainer>;

  let store: Store<BlockState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockListContainer],
      providers: [
        { provide: Store, useValue: {}, }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should load block summaries`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadBlockSummariesRequest());
  });

  it(`should get block summaries model`, () => {
    expect(store.select).toHaveBeenCalledWith(getBlockSummariesModelSelector);
  });

  describe(`when block is deleted`, () => {
    const deletedBlockId = 53;

    beforeEach(() => {
      component.deleteBlock(deletedBlockId);
    });

    it(`should raise block delete action`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new DeleteBlockSummariesRequest(deletedBlockId));
    });
  });
});
