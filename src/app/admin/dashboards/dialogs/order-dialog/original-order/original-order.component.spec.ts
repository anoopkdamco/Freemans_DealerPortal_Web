import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalOrderComponent } from './original-order.component';

describe('OriginalOrderComponent', () => {
  let component: OriginalOrderComponent;
  let fixture: ComponentFixture<OriginalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
