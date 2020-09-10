import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOpenCasesComponent } from './all-open-cases.component';

describe('AllOpenCasesComponent', () => {
  let component: AllOpenCasesComponent;
  let fixture: ComponentFixture<AllOpenCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOpenCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOpenCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
