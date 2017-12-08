import { CheckInState } from '../../redux/check-in.state';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCheckInContainer } from './class-check-in.container';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../services/dialog.service';
import { InitialisePassTemplates } from '../../redux/pass-templates/pass-templates.actions';
import { InitialisePassesForStudent } from '../../redux/passes/passes.actions';
import { SetStudentForCheckIn, CheckInRequest } from '../../redux/student-check-in/student-check-in.actions';

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
    store.select = jasmine.createSpy('select')
      .and.returnValue(Observable.of(false));

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

  describe(`when student is checked in`, () => {
    const studentId = 62;

    beforeEach(() => {
      store.select = jasmine.createSpy()
        .and.returnValue(Observable.of(true));
      component.checkIn(studentId);
    });

    it(`should initialise passes for student`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new InitialisePassesForStudent(studentId));
    });

    it(`should set student check in`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new SetStudentForCheckIn(studentId));
    });

    describe(`when student has valid pass`, () => {
      beforeEach(() => {
        store.select = jasmine.createSpy()
          .and.returnValue(Observable.of(true));
        component.checkIn(studentId);
      });

      it(`should check student in`, () => {
        expect(store.dispatch).toHaveBeenCalledWith(new CheckInRequest());
      });
    });
  });
});
