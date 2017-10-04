import { AuthoriseContainerDispatcher } from './authorise.container.dispatcher';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoriseContainer } from './authorise.container';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

describe('AuthoriseContainer', () => {
  let component: AuthoriseContainer;
  let fixture: ComponentFixture<AuthoriseContainer>;

  let dispatcher: AuthoriseContainerDispatcher;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthoriseContainer],
      providers: [
        { provide: AuthoriseContainerDispatcher, useValue: {} },
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dispatcher = TestBed.get(AuthoriseContainerDispatcher);
    dispatcher.completeAuthorisation = jasmine.createSpy('complete')
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
    let completeReplay: ReplaySubject<null>;

    beforeEach(() => {
      completeReplay = new ReplaySubject();
      dispatcher.completeAuthorisation = jasmine.createSpy('complete')
        .and.returnValue(completeReplay);

      component.ngOnInit();
    });

    it(`should not redirect while authorisation hasn't completed`, () => {
      expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dashboard');
    });

    it(`should redirect to dashboard when authorisation completes`, () => {
      completeReplay.next(null);
      completeReplay.complete();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });
  });
});
