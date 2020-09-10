import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlySalesComponent } from './quaterly-sales.component';

describe('QuaterlySalesComponent', () => {
  let component: QuaterlySalesComponent;
  let fixture: ComponentFixture<QuaterlySalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaterlySalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterlySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
