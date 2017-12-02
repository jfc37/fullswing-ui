import { State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { TeacherGuard } from './teacher.guard';
import { Store } from '@ngrx/store';


describe('TeacherGuard', () => {
  let store: Store<State>;
  let router: Router;
  let sut: TeacherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeacherGuard,
        { provide: Store, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    });

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    sut = TestBed.get(TeacherGuard);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('canActivate', () => {
    let isTeacherReplay: ReplaySubject<boolean>;

    beforeEach(() => {
      isTeacherReplay = new ReplaySubject();
      store.select = jasmine.createSpy('select')
        .and.returnValue(isTeacherReplay);

      router.navigateByUrl = jasmine.createSpy('navigate');
    });

    function flushAll() {
      isTeacherReplay.complete();
    }

    it(`should be true when user is a teacher`, done => {
      isTeacherReplay.next(true);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(canActivate => expect(canActivate).toBe(true));
    });

    it(`should be false when user is not a teacher`, done => {
      isTeacherReplay.next(false);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(canActivate => expect(canActivate).toBe(false));
    });

    it(`should redirect to dashboard when not a teacher`, (done) => {
      isTeacherReplay.next(false);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard'));
    });

    it(`should not redirect when a teacher`, (done) => {
      isTeacherReplay.next(true);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).not.toHaveBeenCalled());
    });
  });
});
