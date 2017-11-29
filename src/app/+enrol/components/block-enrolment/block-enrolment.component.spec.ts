import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockEnrolmentComponent } from './block-enrolment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ineeda } from 'ineeda';
import { BlockEnrolmentModel, BlockModel, GroupedBlocksModel } from './block-enrolment.component.model';
import { getElement, getElementInnerHtml, getElements } from '../../../../unit-test-helpers/html-queries';

describe('BlockEnrolmentComponent', () => {
  let component: BlockEnrolmentComponent;
  let fixture: ComponentFixture<BlockEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockEnrolmentComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEnrolmentComponent);
    component = fixture.componentInstance;
    component.model = ineeda<BlockEnrolmentModel>({ groupedBlocks: [] });
    component.blockClicked.emit = jasmine.createSpy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`when there are no blocks`, () => {
    beforeEach(() => {
      component.model.groupedBlocks = [];
      fixture.detectChanges();
    });

    it(`should show 'No Blocks' message`, () => {
      const element = getElement(fixture.debugElement, 'no-blocks');
      expect(element).toBeTruthy();
    });

    it(`should not show any block groupings`, () => {
      const elements = getElements(fixture.debugElement, 'blocks-starting-on-group');
      expect(elements.length).toBe(0);
    });
  });

  describe(`when there are blocks`, () => {
    beforeEach(() => {
      component.model.groupedBlocks = [ineeda<GroupedBlocksModel>({ blocks: [] })];
      fixture.detectChanges();
    });

    it(`should not show 'No Blocks' message`, () => {
      const element = getElement(fixture.debugElement, 'no-blocks');
      expect(element).toBeFalsy();
    });

    it(`should block groupings for each day`, () => {
      component.model.groupedBlocks = [
        ineeda<GroupedBlocksModel>({ blocks: [] }),
        ineeda<GroupedBlocksModel>({ blocks: [] }),
      ];

      fixture.detectChanges();

      const elements = getElements(fixture.debugElement, 'blocks-starting-on-group');
      expect(elements.length).toBe(component.model.groupedBlocks.length);
    });

    it(`should show date the group of blocks start on`, () => {
      component.model.groupedBlocks[0].startingOn = 'Monday some time';

      fixture.detectChanges();

      const html = getElementInnerHtml(fixture.debugElement, 'starting-on');
      expect(html).toContain(component.model.groupedBlocks[0].startingOn);
    });

    it(`should show a card for each block starting on the same day`, () => {
      component.model.groupedBlocks[0].blocks = [
        ineeda<BlockModel>(),
        ineeda<BlockModel>(),
      ];

      fixture.detectChanges();

      const groupingElement = getElement(fixture.debugElement, 'blocks-starting-on-group');
      const blockCards = getElements(groupingElement, 'block-card');
      expect(blockCards.length).toBe(component.model.groupedBlocks[0].blocks.length);
    });

    it(`should show block title`, () => {
      const expectedName = 'My block';
      component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ name: expectedName });

      fixture.detectChanges();

      const html = getElementInnerHtml(fixture.debugElement, 'block-title');
      expect(html).toBe(expectedName);
    });

    it(`should show block start time`, () => {
      const expectedStartTime = 'time';
      component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ startTime: expectedStartTime });

      fixture.detectChanges();

      const html = getElementInnerHtml(fixture.debugElement, 'block-times');
      expect(html).toContain(expectedStartTime);
    });

    it(`should show block end time`, () => {
      const expectedEndTime = 'time';
      component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ endTime: expectedEndTime });

      fixture.detectChanges();

      const html = getElementInnerHtml(fixture.debugElement, 'block-times');
      expect(html).toContain(expectedEndTime);
    });

    describe(`when already enrolled in block`, () => {
      beforeEach(() => {
        component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ isRegistered: true });
        fixture.detectChanges();
      });

      it(`should show 'Already enrolled' message`, () => {
        const element = getElement(fixture.debugElement, 'already-enrolled');
        expect(element).toBeTruthy();
      });

      it(`should not show enrol checkbox`, () => {
        const element = getElement(fixture.debugElement, 'enrol-checkbox');
        expect(element).toBeFalsy();
      });
    });

    describe(`when not enrolled in block`, () => {
      const id = 5434;
      beforeEach(() => {
        component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ isRegistered: false, id });
        fixture.detectChanges();
      });

      it(`should not show 'Already enrolled' message`, () => {
        const element = getElement(fixture.debugElement, 'already-enrolled');
        expect(element).toBeFalsy();
      });

      it(`should show enrol checkbox`, () => {
        const element = getElement(fixture.debugElement, 'enrol-checkbox');
        expect(element).toBeTruthy();
      });

      it(`should not show enrol checkbox when out of space`, () => {
        component.model.groupedBlocks[0].blocks[0].spacesLeft = 0;
        fixture.detectChanges();

        const element = getElement(fixture.debugElement, 'enrol-checkbox');
        expect(element).toBeFalsy();
      });

      it(`should emit when checkbox is checked`, () => {
        const element = getElement(fixture.debugElement, 'enrol-checkbox');
        element.nativeElement.click();

        expect(component.blockClicked.emit).toHaveBeenCalledWith(id);
      });
    });

    describe(`when more than 5 spaces in the block remain`, () => {
      beforeEach(() => {
        component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ spacesLeft: 6 });
        fixture.detectChanges();
      });

      it(`should not show low space warning`, () => {
        const element = getElement(fixture.debugElement, 'block-low-on-space');
        expect(element).toBeFalsy();
      });

      it(`should not show out of space warning`, () => {
        const element = getElement(fixture.debugElement, 'block-out-of-space');
        expect(element).toBeFalsy();
      });
    });

    describe(`when 5 or less spaces in the block remain`, () => {
      beforeEach(() => {
        component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ spacesLeft: 5 });
        fixture.detectChanges();
      });

      it(`should show warning with remaining spaces available`, () => {
        const html = getElementInnerHtml(fixture.debugElement, 'block-low-on-space');
        expect(html).toBe('5 spaces left');
      });

      it(`should not show out of space warning`, () => {
        const element = getElement(fixture.debugElement, 'block-out-of-space');
        expect(element).toBeFalsy();
      });
    });

    describe(`when no spaces in the block remain`, () => {
      beforeEach(() => {
        component.model.groupedBlocks[0].blocks[0] = ineeda<BlockModel>({ spacesLeft: 0 });
        fixture.detectChanges();
      });

      it(`should not show warning with remaining spaces available`, () => {
        const element = getElement(fixture.debugElement, 'block-low-on-space');
        expect(element).toBeFalsy();
      });

      it(`should show out of space warning`, () => {
        const element = getElement(fixture.debugElement, 'block-out-of-space');
        expect(element).toBeTruthy();
      });
    });
  });
});
