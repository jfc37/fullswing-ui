import { LoadCurrentPassesRequest } from '../../redux/current-passes/current-passes.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainer } from './dashboard.container';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../redux/dashboard.state';
import { getCurrentPassesModelSelector } from '../../redux/dashboard.reducer';

describe('DashboardContainer', () => {
  let component: DashboardContainer;
  let fixture: ComponentFixture<DashboardContainer>;

  let store: Store<DashboardState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardContainer],
      providers: [
        { provide: Store, useValue: {}, }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should load current passes`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCurrentPassesRequest());
  });

  it(`should select current passes model`, () => {
    expect(store.select).toHaveBeenCalledWith(getCurrentPassesModelSelector);
  });
});
