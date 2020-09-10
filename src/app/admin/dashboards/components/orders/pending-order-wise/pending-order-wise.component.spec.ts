import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderWiseComponent } from './pending-order-wise.component';

describe('PendingOrderWiseComponent', () => {
  let component: PendingOrderWiseComponent;
  let fixture: ComponentFixture<PendingOrderWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOrderWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
