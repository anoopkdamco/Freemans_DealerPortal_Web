import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeExhibitionDialogComponent } from './scheme-exhibition-dialog.component';

describe('SchemeExhibitionDialogComponent', () => {
  let component: SchemeExhibitionDialogComponent;
  let fixture: ComponentFixture<SchemeExhibitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeExhibitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeExhibitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
