import { AuthService } from '../../../services/common/auth/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginContainer } from './login.container';

describe('LoginContainer', () => {
  let component: LoginContainer;
  let fixture: ComponentFixture<LoginContainer>;

  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginContainer],
      providers: [
        { provide: AuthService, useValue: {} }
      ]
    })
      .compileComponents();

    authService = TestBed.get(AuthService);

    authService.login = jasmine.createSpy('login');
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
    it(`should kick off auth service login`, () => {
      expect(authService.login).toHaveBeenCalled();
    });
  });
});
