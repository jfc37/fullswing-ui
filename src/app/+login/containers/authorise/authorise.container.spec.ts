import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoriseContainer } from './authorise.container';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/index';

describe('AuthoriseContainer', () => {
  let component: AuthoriseContainer;
  let fixture: ComponentFixture<AuthoriseContainer>;

  let store: Store<State>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthoriseContainer],
      providers: [
        { provide: Store, useValue: {} },
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.select = jasmine.createSpy('complete')
      .and.returnValue(Observable.never());
    router = TestBed.get(Router);
    router.navigateByUrl = jasmine.createSpy('navigate');

    fixture = TestBed.createComponent(AuthoriseContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let isAuthorisedReplay: ReplaySubject<boolean>;

    beforeEach(() => {
      isAuthorisedReplay = new ReplaySubject();
      store.select = jasmine.createSpy('complete')
        .and.returnValue(isAuthorisedReplay);

      component.ngOnInit();
    });

    it(`should not redirect while authorisation hasn't completed`, () => {
      expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dashboard');
    });

    it(`should redirect to dashboard when authorisation completes`, () => {
      isAuthorisedReplay.next(true);
      isAuthorisedReplay.complete();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });
  });
});
