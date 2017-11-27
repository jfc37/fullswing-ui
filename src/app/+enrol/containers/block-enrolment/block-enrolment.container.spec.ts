import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockEnrolmentContainer } from './block-enrolment.container';
import { Store } from '@ngrx/store';
import { EnrolmentState } from '../../redux/enrolment.state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InitialiseBlockEnrolment } from '../../redux/enrolable-blocks/enrolable-blocks.actions';

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
    store.select = jasmine.createSpy('select');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initialise block enrolment`, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new InitialiseBlockEnrolment());
  });
});
