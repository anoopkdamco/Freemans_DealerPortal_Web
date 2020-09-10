import { FormGroup, FormBuilder } from '@angular/forms';
import { IExhibition } from './../../models/iExhibition';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-exhibition-dialog',
  templateUrl: './exhibition-dialog.component.html',
  styleUrls: ['./exhibition-dialog.component.scss']
})
export class ExhibitionDialogComponent implements OnInit {
  public exhibitionName: string;
  public ExhbitionBoothNumber: string;
  public ExhibitionAddress: string;
  public ExhibitionCity: string;
  public ExhibitionCountry: string;
  public ExhibitionHallNumber: string;
  public ExhibitionState: string;
  public RecordTypeId: string;

  public exhibitionDataForm: FormGroup;


  constructor( @Inject(MAT_DIALOG_DATA) private val: IExhibition,  private dialogRef: MatDialogRef<ExhibitionDialogComponent>, 
               private fb: FormBuilder) {
    this.exhibitionName = val.Name;
    this.ExhbitionBoothNumber = val.Exhbition_Booth_Number__c;
    this.ExhibitionAddress = val.Exhibition_Address__c;
    this.ExhibitionCity = val.Exhibition_City__c;
    this.ExhibitionCountry = val.Exhibition_Country__c;
    this.ExhibitionHallNumber = val.Exhibition_Hall_Number__c;
    this.ExhibitionState = val.Exhibition_State__c;
    this.RecordTypeId = val.RecordTypeId;

    this.exhibitionDataForm = this.fb.group({
      exBooth: [this.ExhbitionBoothNumber],
      exAdd: [this.ExhibitionAddress],
      exCity: [this.ExhibitionCity],
      exCountry: [this.ExhibitionCountry],
      exHall: [this.ExhibitionHallNumber],
      exState: [this.ExhibitionState],
    });
  }

  ngOnInit() {
  }

}
