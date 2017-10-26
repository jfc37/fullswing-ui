import { ResetBlockSummaries } from '../../redux/block-summaries/block-summaries.actions';
import { LoadTeachersRequest } from '../../../core/redux/teachers/teachers.actions';
import { resetSpy } from '../../../../unit-test-helpers/spy';
import { getElement } from '../../../../unit-test-helpers/html-queries';
import { getDraftBlockFormModelSelector } from '../../redux/block.reducer';
import {
  LoadDraftBlockRequest,
  ResetDraftBlock,
  SaveSelectedDraftBlockRequest,
  SetSelectedDraftBlockId,
  UpdateSelectedDraftBlock,
} from '../../redux/draft-blocks/draft-blocks.actions';
import { BlockState } from '../../redux/block.state';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUpdateContainer } from './block-update.container';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { marbles } from 'rxjs-marbles';
import { Observable, ReplaySubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';
import { BlockModel } from '../../components/block-form/block-form.component.model';
import { modelToBlock } from '../../components/block-form/block-form.component.model.mapping';

describe('BlockUpdateContainer', () => {
  let component: BlockUpdateContainer;
  let fixture: ComponentFixture<BlockUpdateContainer>;

  let store: Store<BlockState>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  let hasSavedReplay: ReplaySubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUpdateContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUpdateContainer);
    component = fixture.componentInstance;

    hasSavedReplay = new ReplaySubject();

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select')
      .and.returnValue(hasSavedReplay.asObservable());

    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.params = Observable.empty();

    router = TestBed.get(Router);
    router.navigate = jasmine.createSpy('navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should select model from state`, () => {
    expect(store.select).toHaveBeenCalledWith(getDraftBlockFormModelSelector);
  });

  it(`should load teachers`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadTeachersRequest());
  });

  it(`should reset state whenever id parameter changes in the route`, marbles((m) => {
    const params = {
      a: { id: '242' },
      b: { id: '322' },
      c: { id: '543' }
    };

    const source = m.cold('--a-b-c-|', params);
    activatedRoute.params = source;

    component.ngOnInit();

    m.flush();
    expect(store.dispatch).toHaveBeenCalledWith(new ResetDraftBlock());
  }));

  it(`should load draft whenever id parameter changes in the route`, marbles((m) => {
    const params = {
      a: { id: '242' },
      b: { id: '322' },
      c: { id: '543' }
    };

    const source = m.cold('--a-b-c-|', params);
    activatedRoute.params = source;

    component.ngOnInit();

    m.flush();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDraftBlockRequest(+params.a.id));
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDraftBlockRequest(+params.b.id));
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDraftBlockRequest(+params.c.id));
  }));

  it(`should set selected id whenever id parameter changes in the route`, marbles((m) => {
    const params = {
      a: { id: '242' },
      b: { id: '322' },
      c: { id: '543' }
    };

    const source = m.cold('--a-b-c-|', params);
    activatedRoute.params = source;

    component.ngOnInit();

    m.flush();
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedDraftBlockId(+params.a.id));
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedDraftBlockId(+params.b.id));
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedDraftBlockId(+params.c.id));
  }));

  it(`should update block state when model changes`, () => {
    const expectedModel = ineeda<BlockModel>();
    resetSpy(store.dispatch);
    component.modelChanged(expectedModel);

    expect(store.dispatch).toHaveBeenCalledWith(new UpdateSelectedDraftBlock(modelToBlock(expectedModel)));
  });

  describe(`save`, () => {
    it(`should display save button`, () => {
      const el = getElement(fixture.debugElement, 'save-button');
      expect(el).toBeTruthy();
    });

    it(`should start as disabled`, () => {
      const el = getElement(fixture.debugElement, 'save-button');
      expect(el.properties['disabled']).toBe(true);
    });

    it(`should not be disabled when status is valid`, () => {
      component.statusChanged(true);

      fixture.detectChanges();

      const el = getElement(fixture.debugElement, 'save-button');
      expect(el.properties['disabled']).toBe(false);
    });

    it(`should dispatch save action`, () => {
      component.save();

      expect(store.dispatch).toHaveBeenCalledWith(new SaveSelectedDraftBlockRequest());
    });
  });

  describe(`on successful save`, () => {
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
