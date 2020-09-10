import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject} from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';


@Component({
  selector: 'app-cases-dialog',
  templateUrl: './cases-dialog.component.html',
  styleUrls: ['./cases-dialog.component.scss'],
})
export class CasesDialogComponent implements OnInit {
  public caseInfoForm: FormGroup;
  public additionalInfoForm: FormGroup;
  public webInfoForm: FormGroup;
  public feedbackForm: FormGroup;
  public issueForm: FormGroup;
  public addressForm: FormGroup;
  public caseNumber: string;
  public rating: number;


  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<CasesDialogComponent>) {
                this.caseNumber = data.CaseNumber;
                this.rating = data.Rating__c;
                const parentCaseN = (data.Parent !== undefined) ? data.Parent.CaseNumber : '';
                const prodName = (data.Product__r !== undefined) ? data.Product__r.Name : '';
                const cName = (data.Contact !== undefined) ? data.Contact.Name :  '';
                const accName = (data.Account !== undefined) ? data.Account.Name : '';
                const cOwner = (data.Owner !== undefined) ? data.Owner.Name : '';
                this.caseInfoForm = fb.group({
                  caseNumber: [{value: data.CaseNumber, disabled: true}],
                  dateOfComplain: [{value: data.Date_of_Complaint__c, disabled: true}],
                  accountName: [{value: accName, disabled: true}],
                  accountMail: [{value: data.Account_Email__c, disabled: true}],
                  contactName: [{value: cName, disabled: true}],
                  contactEmail: [{value: data.ContactEmail, disabled: true}],
                  contactPhone: [{value: data.ContactPhone, disabled: true}],
                  caseOwner: [{value: cOwner, disabled: true}]
                });
                this.additionalInfoForm = fb.group({
                  status: [{value: data.Status, disabled: true}],
                  type: [{value: data.Type, disabled: true}],
                  caseOrigin: [{value: data.CaseOrigin, disabled: true}],
                  subType: [{value: data.Sub_Type__c, disabled: true}],
                  priority: [{value: data.Priority, disabled: true}],
                  parentCase: [{value: parentCaseN, disabled: true}],
                  productQuantity: [{value: data.No_of_Pieces__c, disabled: true}],
                  invoice: [{value: data.Invoice__c, disabled: true}],
                  product: [{value: prodName, disabled: true}],
                  transportCompany: [{value: data.Transport_Company_Name__c, disabled: true}],
                  creditNoteNumber: [{value: data.Credit_Note_Number__c, disabled: true}],
                  trackingNumber: [{value: data.Tracking_Number__c, disabled: true}],
                });
                this.feedbackForm = fb.group({
                  feedbackRating: [data.Rating__c]
                });
                this.issueForm = fb.group({
                  subject: [{value: data.Subject__c, disabled: true}],
                  description: [{value: data.Description, disabled: true}]
                });
                this.webInfoForm = fb.group({
                  webMail: [{value: data.Account_Email__c, disabled: true}]
                });
               }

  ngOnInit() {
  }

}

