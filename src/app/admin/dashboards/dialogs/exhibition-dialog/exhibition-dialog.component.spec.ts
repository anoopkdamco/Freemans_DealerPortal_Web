import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionDialogComponent } from './exhibition-dialog.component';

describe('ExhibitionDialogComponent', () => {
  let component: ExhibitionDialogComponent;
  let fixture: ComponentFixture<ExhibitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
