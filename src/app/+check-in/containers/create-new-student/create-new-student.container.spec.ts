import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewStudentContainer } from './create-new-student.container';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateNewStudentContainer', () => {
  let component: CreateNewStudentContainer;
  let fixture: ComponentFixture<CreateNewStudentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ CreateNewStudentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStudentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
