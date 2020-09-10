import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClosedCasesComponent } from './all-closed-cases.component';

describe('AllClosedCasesComponent', () => {
  let component: AllClosedCasesComponent;
  let fixture: ComponentFixture<AllClosedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClosedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClosedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
