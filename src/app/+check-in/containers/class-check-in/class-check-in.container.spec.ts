import { CheckInState } from '../../redux/check-in.state';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCheckInContainer } from './class-check-in.container';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../services/dialog.service';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';

describe('ClassCheckInContainer', () => {
  let component: ClassCheckInContainer;
  let fixture: ComponentFixture<ClassCheckInContainer>;

  let store: Store<CheckInState>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let dialogService: DialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCheckInContainer],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Store, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: DialogService, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCheckInContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select');

    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.params = Observable.empty();

    router = TestBed.get(Router);
    router.navigate = jasmine.createSpy('navigate');

    dialogService = TestBed.get(DialogService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
