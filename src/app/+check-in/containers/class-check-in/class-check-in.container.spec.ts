import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCheckInContainer } from './class-check-in.container';

describe('ClassCheckInContainer', () => {
  let component: ClassCheckInContainer;
  let fixture: ComponentFixture<ClassCheckInContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCheckInContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCheckInContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
