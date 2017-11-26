import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesSummaryTableComponent } from './classes-summary-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClassesSummaryTableComponent', () => {
  let component: ClassesSummaryTableComponent;
  let fixture: ComponentFixture<ClassesSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesSummaryTableComponent ],
      imports: [
        MatTableModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesSummaryTableComponent);
    component = fixture.componentInstance;
    component.model = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
