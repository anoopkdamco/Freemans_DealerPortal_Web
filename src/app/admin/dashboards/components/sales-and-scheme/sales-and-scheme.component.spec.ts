import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndSchemeComponent } from './sales-and-scheme.component';

describe('SalesAndSchemeComponent', () => {
  let component: SalesAndSchemeComponent;
  let fixture: ComponentFixture<SalesAndSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAndSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAndSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
