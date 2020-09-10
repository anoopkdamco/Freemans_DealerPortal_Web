import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISchemeExhibition } from './../../models/ISchemeExhibition';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-scheme-exhibition-dialog',
  templateUrl: './scheme-exhibition-dialog.component.html',
  styleUrls: ['./scheme-exhibition-dialog.component.scss']
})
export class SchemeExhibitionDialogComponent implements OnInit {
  public schemeName: string;
  public schemeDataForm: FormGroup;
  public schemeList: ISchemeExhibition[] = [];
  public filteredScheme: ISchemeExhibition[] = [];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private val: ISchemeExhibition,
              private dialogRef: MatDialogRef<SchemeExhibitionDialogComponent>) {
                this.schemeName = val.Name;
                const pro1  = val.Product1__r ? val.Product1__r.Name : '';
                const pro2  = val.Product2__r ? val.Product2__r.Name : '';
                const pro3  = val.Product3__r ? val.Product3__r.Name : '';
                const pro4  = val.Product4__r ? val.Product4__r.Name : '';
                const pro5  = val.Product5__r ? val.Product5__r.Name : '';
                const pro6  = val.Product6__r ? val.Product6__r.Name : '';

                const stDate =  new Date(val.Start_Date__c);
                const eDate = new Date(val.End_Date__c);
                this.schemeDataForm = this.fb.group({
                  scheme: [val.Name],
                  title: [val.Title__c],
                  schemeType: [val.Scheme_Type__c],
                  startDate: [stDate],
                  endDate: [eDate],
                  prod1: [pro1],
                  prod2: [pro2],
                  prod3: [pro3],
                  prod4: [pro4],
                  prod5: [pro5],
                  prod6: [pro6],
                  cond1: [val.Condition1__c],
                  cond2: [val.Condition2__c],
                  cond3: [val.Condition3__c],
                  value1: [val.Value1__c],
                  value2: [val.Value2__c],
                  value3: [val.Value3__c],
                });
               }

  ngOnInit() {
  }

}
