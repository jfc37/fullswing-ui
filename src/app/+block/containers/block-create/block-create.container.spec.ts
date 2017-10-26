import { ResetBlockSummaries } from '../../redux/block-summaries/block-summaries.actions';
import { LoadTeachersRequest } from '../../../core/redux/teachers/teachers.actions';
import { CreateBlockRequest, ResetNewBlock } from '../../redux/new-block/new-block.actions';
import { BlockState } from '../../redux/block.state';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCreateContainer } from './block-create.container';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { getNewBlockFormModelSelector } from '../../redux/block.reducer';
import { Router } from '@angular/router';
import { getElement } from '../../../../unit-test-helpers/html-queries';

describe('BlockCreateContainer', () => {
  let component: BlockCreateContainer;
  let fixture: ComponentFixture<BlockCreateContainer>;

  let store: Store<BlockState>;
  let router: Router;
  let hasSavedReplay: ReplaySubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockCreateContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCreateContainer);
    component = fixture.componentInstance;

    hasSavedReplay = new ReplaySubject();
    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select')
      .and.returnValue(hasSavedReplay);

    router = TestBed.get(Router);
    router.navigate = jasmine.createSpy('navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should reset new block`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new ResetNewBlock());
  });

  it(`should load teachers`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadTeachersRequest());
  });

  it(`should select block model from state`, () => {
    expect(component.blockFormModel$).toBe(store.select(getNewBlockFormModelSelector));
  });

  describe(`create`, () => {
    it(`should display create button`, () => {
      const el = getElement(fixture.debugElement, 'create-button');
      expect(el).toBeTruthy();
    });

    it(`should start as disabled`, () => {
      const el = getElement(fixture.debugElement, 'create-button');
      expect(el.properties['disabled']).toBe(true);
    });

    it(`should not be disabled when status is valid`, () => {
      component.statusChanged(true);

      fixture.detectChanges();

      const el = getElement(fixture.debugElement, 'create-button');
      expect(el.properties['disabled']).toBe(false);
    });

    it(`should dispatch create action`, () => {
      component.create();

      expect(store.dispatch).toHaveBeenCalledWith(new CreateBlockRequest());
    });
  });

  describe(`on successful create`, () => {
    beforeEach(() => {
      hasSavedReplay.next(true);
    });

    it(`should dispatch reset block summary action`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new ResetBlockSummaries());
    });

    it(`should redirect when saved`, () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
