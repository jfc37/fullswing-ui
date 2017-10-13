import { BlockSummaryTableComponent } from '../block-summary-table/block-summary-table.component';
import { BlocksSummaryModel, BlockSummaryModel } from './blocks-summary.component.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksSummaryComponent } from './blocks-summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getElement, getElementInnerHtml, getElements } from '../../../../unit-test-helpers/html-queries';
import { ineeda } from 'ineeda';
import { By } from '@angular/platform-browser';
import { MatTableModule, MatPaginatorModule, MatTable, MatSortModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BlocksSummaryComponent', () => {
  let component: BlocksSummaryComponent;
  let fixture: ComponentFixture<BlocksSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlocksSummaryComponent,
        BlockSummaryTableComponent
      ],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksSummaryComponent);
    component = fixture.componentInstance;

    component.model = ineeda<BlocksSummaryModel>({blocks: []});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist without model', () => {
    component.model = null;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe(`when there are no blocks`, () => {
    beforeEach(() => {
      component.model.blocks = [];
      fixture.detectChanges();
    });

    it(`should display 'No Blocks' message`, () => {
      const el = getElement(fixture.debugElement, 'no-blocks');
      expect(el).toBeTruthy();
    });

    it(`should not display blocks table`, () => {
      const el = getElement(fixture.debugElement, 'blocks-table');
      expect(el).toBeFalsy();
    });
  });

  describe(`when there are blocks`, () => {
    beforeEach(() => {
      component.model.blocks = [ineeda<BlockSummaryModel>(), ineeda<BlockSummaryModel>(), ineeda<BlockSummaryModel>()];
      fixture.detectChanges();
    });

    it(`should not display 'No Blocks' message`, () => {
      const el = getElement(fixture.debugElement, 'no-blocks');
      expect(el).toBeFalsy();
    });

    it(`should display blocks table`, () => {
      const el = getElement(fixture.debugElement, 'blocks-table');
      expect(el).toBeTruthy();
    });

    it(`should display a row for each block`, () => {
      const expectedRows = component.model.blocks.length;

      const rows = fixture.debugElement.queryAll(By.css('mat-row'));

      expect(rows.length).toBe(expectedRows);
    });
  });


});
