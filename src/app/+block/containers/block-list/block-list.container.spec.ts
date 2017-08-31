import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListContainer } from './block-list.container';

describe('BlockListContainer', () => {
  let component: BlockListContainer;
  let fixture: ComponentFixture<BlockListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
