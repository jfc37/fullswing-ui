import { Logout } from '../../redux/user/user.actions';
import { getTopNavModelSelector } from '../../../reducers';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/index';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Store, useValue: {} }
      ],
      imports: [
        BrowserModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.get(Store);
    store.select = jasmine.createSpy('select');
    store.dispatch = jasmine.createSpy('dispatch');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should get top nav model`, () => {
    expect(store.select).toHaveBeenCalledWith(getTopNavModelSelector);
  });

  it(`should log out when logout event is emitted`, () => {
    app.logout();

    expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  });
});
