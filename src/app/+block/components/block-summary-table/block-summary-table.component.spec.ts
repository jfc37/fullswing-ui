import { getElements, getElement } from '../../../../unit-test-helpers/html-queries';
import { BlockSummaryModel } from '../blocks-summary/blocks-summary.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSummaryTableComponent } from './block-summary-table.component';
import { MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ineeda } from 'ineeda';

describe('BlockSummaryTableComponent', () => {
  let component: BlockSummaryTableComponent;
  let fixture: ComponentFixture<BlockSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockSummaryTableComponent],
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

  it(`should have row for each block`, () => {
    component.model = [{}, {}] as BlockSummaryModel[];

    component.ngOnInit();
    fixture.detectChanges();

    const rows = getElements(fixture.debugElement, 'block-row');
    expect(rows.length).toBe(component.model.length);
  });

  describe(`Delete Button`, () => {
    describe(`when delete is disabled`, () => {
      let deleteButton: DebugElement;

      beforeEach(() => {
        component.model[0] = ineeda<BlockSummaryModel>({ disableDelete: true });

        component.ngOnInit();
        fixture.detectChanges();

        deleteButton = getElement(fixture.debugElement, 'delete-block-0');
      });

      it(`should be disabled`, () => {
        expect(deleteButton.nativeElement.disabled).toBe(true);
      });

      it(`should have disabled class`, () => {
        expect(deleteButton.nativeElement.classList).toContain('disabled');
      });
    });

    describe(`when delete is enabled`, () => {
      const expectedId = 522;
      let deleteButton: DebugElement;

      beforeEach(() => {
        component.deleteBlock.emit = jasmine.createSpy();
        component.model = [
          ineeda<BlockSummaryModel>({ id: expectedId, disableDelete: false })
        ];

        component.ngOnInit();
        fixture.detectChanges();

        deleteButton = getElement(fixture.debugElement, 'delete-block-0');
      });

      it(`should emit delete when clicked`, () => {
        deleteButton.nativeElement.click();
        expect(component.deleteBlock.emit).toHaveBeenCalledWith(expectedId);
      });

      it(`should be disabled`, () => {
        expect(deleteButton.nativeElement.disabled).toBe(false);
      });

      it(`should have disabled class`, () => {
        expect(deleteButton.nativeElement.classList).not.toContain('disabled');
      });
    });
  });
});
