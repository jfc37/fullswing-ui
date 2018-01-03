import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePassPreambleComponent } from './purchase-pass-preamble.component';

describe('PurchasePassPreambleComponent', () => {
  let component: PurchasePassPreambleComponent;
  let fixture: ComponentFixture<PurchasePassPreambleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePassPreambleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePassPreambleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
