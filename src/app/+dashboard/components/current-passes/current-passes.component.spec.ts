import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPassesComponent } from './current-passes.component';

describe('CurrentPassesComponent', () => {
  let component: CurrentPassesComponent;
  let fixture: ComponentFixture<CurrentPassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
