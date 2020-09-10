import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthTokenService } from './../../services/auth-token.service';
import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  public accountData;
  public loading: boolean;
  public accountForm: FormGroup;
  public tokenVal: string;
  constructor(private store: Store<AppState>, private authService: AuthTokenService, private fb: FormBuilder) {
    this.loading = true;
   }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  getAccountInfo() {
    this.showLoader();
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.accountData = data.homeRecord.Accounts;
        const parentAccName = this.accountData.Parent ? this.accountData.Parent.Name : '';
        const fsoOfficer = this.accountData.Field_Service_Officer__r ? this.accountData.Field_Service_Officer__r.Name : '';
        this.hideLoader();
        this.accountForm = this.fb.group({
          accountName: [{value: this.accountData.Name, disabled: true}],
          email: [{value: this.accountData.Email__c, disabled: true}],
          phone: [{value: this.accountData.Phone, disabled: true}],
          parentAccount: [{value: parentAccName, disabled: true}],
          industry: [{value: this.accountData.FMI_Industry__c, disabled: true}],
          fso: [{value: fsoOfficer, disabled: true}],
          agentName: [{value: this.accountData.Name, disabled: true}],
          shipmentTerm: [{value: this.accountData.Shipment_Terms__c, disabled: true}],
          contactName: [{value: this.accountData.Sic, disabled: true}],
          adharNumber: [{value: this.accountData.Aadhar_No__c, disabled: true}],
          panNumber: [{value: this.accountData.IT_PAN__c, disabled: true}],
          gstUin: [{value: this.accountData.GSTIN_UIN__c, disabled: true}],
          ecmsCode: [{value: this.accountData.ECMS_Code__c, disabled: true}],
          cmsCode: [{value: this.accountData.CMS_Code__c, disabled: true}],
          birthday: [{value: this.accountData.Birthday__c, disabled: true}],
          billingAccountName: [{value: this.accountData.Name, disabled: true}],
          billingCity: [{value: this.accountData.BillingCity, disabled: true}],
          shippingCity: [{value: this.accountData.ShippingCity, disabled: true}],
          billingCountry: [{value: this.accountData.BillingCountry, disabled: true}],
          shippingCountry: [{value: this.accountData.ShippingCountry, disabled: true}],
          billingState: [{value: this.accountData.BillingState, disabled: true}],
          shippingState: [{value: this.accountData.ShippingState, disabled: true}],
          shippingPostalCode: [{value: this.accountData.ShippingPostalCode, disabled: true}],
          billingPostalCode: [{value: this.accountData.BillingPostalCode, disabled: true}],
          shippingAccountName: [{value: this.accountData.Name, disabled: true}],
          billingStreet: [{value: this.accountData.BillingStreet, disabled: true}],
          shippingStreet: [{value: this.accountData.ShippingStreet, disabled: true}]
        });
      }
    });

  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnInit() {
    setTimeout(() => {
      this.showLoader();
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if (userData) {
        this.hideLoader();
        this.getAccountInfo();
      }
    }, 3000);
  }

}
