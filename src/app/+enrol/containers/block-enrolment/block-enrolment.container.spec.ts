import { getElement } from '../../../../unit-test-helpers/html-queries';
import { InitialiseSelectedBlocks, ToggleBlockSelection } from '../../redux/selected-blocks/selected-blocks.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockEnrolmentContainer } from './block-enrolment.container';
import { Store } from '@ngrx/store';
import { EnrolmentState } from '../../redux/enrolment.state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InitialiseBlockEnrolment } from '../../redux/enrolable-blocks/enrolable-blocks.actions';
import { Observable } from 'rxjs/Observable';

describe('BlockEnrolmentContainer', () => {
  let component: BlockEnrolmentContainer;
  let fixture: ComponentFixture<BlockEnrolmentContainer>;

  let store: Store<EnrolmentState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockEnrolmentContainer],
      providers: [
        { provide: Store, useValue: {}, }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEnrolmentContainer);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');
    store.select = jasmine.createSpy('select')
      .and.returnValue(Observable.of(true));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialise block enrolment`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new InitialiseBlockEnrolment());
  });

  it(`should initialise selected block`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new InitialiseSelectedBlocks());
  });

  describe(`when block is clicked`, () => {
    const id = 531;
    beforeEach(() => {
      component.blockClicked(id);
    });

    it(`should dispatch toggle action`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new ToggleBlockSelection(id));
    });
  });

  describe(`when no blocks selected`, () => {
    beforeEach(() => {
      store.select = jasmine.createSpy('select')
        .and.returnValue(Observable.of(false));

      component.ngOnInit();
      fixture.detectChanges();
    });

    it(`should disable enrol button`, () => {
      const enrolButton = getElement(fixture.debugElement, 'enrol-button');
      expect(enrolButton.nativeElement.disabled).toBe(true);
    });
  });

  describe(`when there is a selected block`, () => {
    beforeEach(() => {
      store.select = jasmine.createSpy('select')
        .and.returnValue(Observable.of(true));

      component.ngOnInit();
      fixture.detectChanges();
    });

    it(`should enable enrol button`, () => {
      const enrolButton = getElement(fixture.debugElement, 'enrol-button');
      expect(enrolButton.nativeElement.disabled).toBe(false);
    });
  });
});

