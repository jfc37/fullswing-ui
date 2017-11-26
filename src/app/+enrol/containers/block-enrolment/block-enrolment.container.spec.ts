import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockEnrolmentContainer } from './block-enrolment.container';

describe('BlockEnrolmentContainer', () => {
  let component: BlockEnrolmentContainer;
  let fixture: ComponentFixture<BlockEnrolmentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockEnrolmentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEnrolmentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
