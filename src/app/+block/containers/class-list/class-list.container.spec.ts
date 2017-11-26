import { SetSelectedBlockId } from '../../redux/block-classes/block-classes.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListContainer } from './class-list.container';
import { Store } from '@ngrx/store';
import { BlockState } from '../../redux/block.state';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { marbles } from 'rxjs-marbles';

describe('ClassListContainer', () => {
  let component: ClassListContainer;
  let fixture: ComponentFixture<ClassListContainer>;

  let store: Store<BlockState>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassListContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select')
      .and.returnValue(Observable.empty());

    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.params = Observable.empty();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedBlockId(+params.a.id));
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedBlockId(+params.b.id));
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedBlockId(+params.c.id));
  }));
});
