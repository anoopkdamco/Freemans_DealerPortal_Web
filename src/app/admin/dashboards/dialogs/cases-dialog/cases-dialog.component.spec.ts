import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesDialogComponent } from './cases-dialog.component';

describe('CasesDialogComponent', () => {
  let component: CasesDialogComponent;
  let fixture: ComponentFixture<CasesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
