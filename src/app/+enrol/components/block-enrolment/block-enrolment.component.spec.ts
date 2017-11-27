import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockEnrolmentComponent } from './block-enrolment.component';

describe('BlockEnrolmentComponent', () => {
  let component: BlockEnrolmentComponent;
  let fixture: ComponentFixture<BlockEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
