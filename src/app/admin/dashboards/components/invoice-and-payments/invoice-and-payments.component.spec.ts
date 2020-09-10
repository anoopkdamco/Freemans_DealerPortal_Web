import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAndPaymentsComponent } from './invoice-and-payments.component';

describe('InvoiceAndPaymentsComponent', () => {
  let component: InvoiceAndPaymentsComponent;
  let fixture: ComponentFixture<InvoiceAndPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAndPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAndPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
