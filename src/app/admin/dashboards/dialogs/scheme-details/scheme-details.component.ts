import { IRelatedScheme } from './../../models/iRelatedScheme';
import { IRelated } from './../../models/iRelated';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from './../../services/home.service';
import { ISchemeExhibition } from './../../models/ISchemeExhibition';
import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { AuthTokenService } from './../../services/auth-token.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrls: ['./scheme-details.component.scss']
})
export class SchemeDetailsComponent implements OnInit {
  public schemeName: string;
  public schemeDataForm: FormGroup;
  public schemeList: ISchemeExhibition[] = [];
  public filteredScheme: ISchemeExhibition[] = [];
  public tokenVal: string;
  public relatedData: IRelated;
  public  listSchemeFilesData: IRelatedScheme[] = [];
  thumbnail: any;
  schemeThumbNail: any;
  public schemeId: string;
  public loading: boolean;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private val: any, private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<SchemeDetailsComponent>, private store: Store<AppState>, 
              private authService: AuthTokenService, private homeService: HomeService, public snackBar: MatSnackBar) {}

 createDetailsForm() {
  const data = this.val;
  this.schemeName = data.Scheme__r.Name;
  this.store.select(state => (state.homeState))
  .subscribe((resp: any) => {
    if (resp.objectLoading == 'Home_Records_Success') {
      this.schemeList = resp.homeRecord.Schemes_Exhibitions;
      for (let i = 0; i< this.schemeList.length; i++) {
        if(this.schemeName == this.schemeList[i].Name) {
          this.schemeId = this.schemeList[i].Id;
          // this.getRelatedInfo();
          this.filteredScheme.push(this.schemeList[i]);
        }
      }
    }
  });
  const stDate =  new Date(data.Scheme_Start_Date__c);
  const eDate = new Date(data.Scheme_End_Date__c);
  const schemeName = data.Scheme__r ? data.Scheme__r.Name : '';
  const title  = data.Scheme__r ? data.Scheme__r.Title__c : '';
  this.schemeDataForm = this.fb.group({
                  scheme: [{value: schemeName, disabled: true}],
                  title: [{value: title , disabled: true}],
                  schemeType: [{value: this.filteredScheme[0].Scheme_Type__c, disabled: true}],
                  startDate: [{value: stDate, disabled: true}],
                  endDate: [{value: eDate, disabled: true}],
                  prod1: [{value: this.filteredScheme[0].Product1__r.Name, disabled: true}],
                  prod2: [{value: this.filteredScheme[0].Product2__r.Name, disabled: true}],
                  prod3: [{value: this.filteredScheme[0].Product3__r.Name, disabled: true}],
                  prod4: [{value: this.filteredScheme[0].Product4__r.Name, disabled: true}],
                  prod5: [{value: this.filteredScheme[0].Product5__r.Name, disabled: true}],
                  prod6: [{value: this.filteredScheme[0].Product6__r.Name, disabled: true}],
                  cond1: [{value: this.filteredScheme[0].Condition1__c, disabled: true}],
                  cond2: [{value: this.filteredScheme[0].Condition2__c, disabled: true}],
                  cond3: [{value: this.filteredScheme[0].Condition3__c, disabled: true}],
                  value1: [{value: this.filteredScheme[0].Value1__c, disabled: true}],
                  value2: [{value: this.filteredScheme[0].Value2__c, disabled: true}],
                  value3: [{value: this.filteredScheme[0].Value3__c, disabled: true}],
                });
 }

 getRelatedInfo() {
  const Id = this.schemeId;
  const token = this.tokenVal;
  const objName = 'Scheme';
  this.homeService.getRelatedInfo(Id, token, objName).subscribe((resp) => {
    this.showLoader();
    this.relatedData = resp;
    this.listSchemeFilesData = this.relatedData.ListSchemeFilesData;
    for(let i = 0; i< this.listSchemeFilesData.length; i++) {
          const objectURL = 'data:image/jpeg;base64,' + this.listSchemeFilesData[i].FileData;
          this.schemeThumbNail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          const contentType = 'image/png';
          const b64Data = this.listSchemeFilesData[i].FileData;
          const byteCharacters = atob(b64Data);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let ii = 0; ii < slice.length; ii++) {
              byteNumbers[ii] = slice.charCodeAt(ii);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, {
            type: contentType
          });
          const blobUrl = URL.createObjectURL(blob);
          this.listSchemeFilesData[i].ImageData = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
  }, err => {
    this.openSnackBar('There is some error while creating order, Please contact to Administration', 'OK');
  });
  this.hideLoader();
 }

 // display messages from top of the page
 openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
  const snackBarRef = this.snackBar.open(message, action, {
    duration: 8000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
  return snackBarRef;
}


public showLoader(): void {
  this.loading = true;
}

public hideLoader(): void {
  this.loading = false;
}

  ngOnInit() {
    this.createDetailsForm();
    setTimeout(() => {
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if(this.tokenVal) {
        this.getRelatedInfo();
      }
    }, 3000);
  }

}
