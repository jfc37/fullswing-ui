import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginContainer } from './login.container';
import { AuthSetup } from '../../services/auth-setup.service';

describe('LoginContainer', () => {
  let component: LoginContainer;
  let fixture: ComponentFixture<LoginContainer>;

  let authSetup: AuthSetup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginContainer],
      providers: [
        { provide: AuthSetup, useValue: {} }
      ]
    })
      .compileComponents();

    authSetup = TestBed.get(AuthSetup);

    authSetup.showLogin = jasmine.createSpy('login');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it(`should show login`, () => {
      expect(authSetup.showLogin).toHaveBeenCalled();
    });
  });
});
