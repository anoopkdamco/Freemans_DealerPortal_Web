import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineDialogComponent } from './order-line-dialog.component';

describe('OrderLineDialogComponent', () => {
  let component: OrderLineDialogComponent;
  let fixture: ComponentFixture<OrderLineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
