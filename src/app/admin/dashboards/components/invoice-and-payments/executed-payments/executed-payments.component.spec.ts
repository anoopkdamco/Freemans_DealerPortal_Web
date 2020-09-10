import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedPaymentsComponent } from './executed-payments.component';

describe('ExecutedPaymentsComponent', () => {
  let component: ExecutedPaymentsComponent;
  let fixture: ComponentFixture<ExecutedPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutedPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
