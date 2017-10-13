import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSummaryTableComponent } from './block-summary-table.component';
import { MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlockSummaryTableComponent', () => {
  let component: BlockSummaryTableComponent;
  let fixture: ComponentFixture<BlockSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSummaryTableComponent ],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatSortModule,
        BrowserModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSummaryTableComponent);
    component = fixture.componentInstance;
    component.model = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
