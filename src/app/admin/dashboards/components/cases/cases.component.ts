import { HomeService } from './../../services/home.service';
import { AuthTokenService } from './../../services/auth-token.service';
import { ICase } from './../../models/iCase';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../../models/appState';
import * as homeActions from '../../../../ngrx/actions/home.actions';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  public activeTab = 'allcases';
  public all_cases: boolean = true;
  public open_cases: boolean = false;
  public close_cases: boolean = false;
  public create_case: boolean = false;
  public casesRecords: ICase[] = [];
  public allOpenCases: ICase[] = [];
  public allClosedCases: ICase[] = [];
  public totalCaseInSevenDays: ICase[] = [];
  public totalCasesClosed: number = 0;
  public casesInSevenDays: number = 0;
  public totalCasesCreated: number = 0;
  public caseCreatedDealer: number = 0;
  public totalCase: number = 0;
  public dealerPortalCases = 0;
  public newCasesList: ICase[] = [];
  public accountInfo;
  public newCase: boolean;
  public tokenVal: string;
  public loading: boolean;
  public hcases: string;
  public erpData;
  public tAllCase;
  public tSevenDaysCases;
  public tClosedCases;
  constructor(private store: Store<AppState>, private authService: AuthTokenService, private homeService: HomeService) {
    this.newCase = false;
    this.loading = true;
   }

  getCases() {
    this.showLoader();
    if (!this.newCase) {
      this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.casesRecords = data.homeRecord.Cases;
        this.accountInfo = data.homeRecord.Accounts;
        this.totalCase = this.casesRecords.length;
        if (this.totalCase > 0) {
          for (let i = 0; i< this.casesRecords.length; i++) {
            const closeUR = 'Closed - Unresolved';
            const closeR = 'Closed - Resolved';
            const newCase = 'Dealer Portal';
            if (this.casesRecords[i].Origin == newCase) {
               this.newCasesList.push(this.casesRecords[i]);
               this.dealerPortalCases = this.newCasesList.length;
               this.tClosedCases = (this.dealerPortalCases / this.totalCase);
            } else if ((this.casesRecords[i].Status == closeR) ||  (this.casesRecords[i].Status == closeUR)) {
              this.allClosedCases.push(this.casesRecords[i]);
              this.totalCasesClosed = this.allClosedCases.length;
              if (this.totalCasesClosed > 0) {
                this.tAllCase = (this.totalCasesClosed / this.totalCase);
              } else {
                this.tAllCase = 0;
              }
              const closeDate = new Date(this.casesRecords[i].ClosedDate);
              const todayDate = new Date();
              const days = 7;
              const calDate = new Date(todayDate.getTime() - (days * 24 * 60 * 60 * 1000));
              if ((closeDate.getDate() >= calDate.getDate()) || (closeDate.getDate() == todayDate.getDate())) {
                 this.totalCaseInSevenDays.push(this.casesRecords[i]);
                 this.casesInSevenDays = this.totalCaseInSevenDays.length;
                 this.tSevenDaysCases = (this.casesInSevenDays / this.totalCasesClosed);
              }
            } else {
              this.tClosedCases = 0;
              this.tAllCase = 0;
              this.allOpenCases.push(this.casesRecords[i]);
              if (this.casesInSevenDays == 0) {
                this.tSevenDaysCases = 0;
              }
            }
       }
        } else if (this.casesRecords.length == 0){
          this.tClosedCases = 0;
          this.tSevenDaysCases = 0;
          this.tAllCase = 0;
        }
        this.hideLoader();
      }
    });

    }
  }

  getUpdatedCases() {
    this.showLoader();
    const value = this.tokenVal;
    const obj = {erp: this.erpData, token: value};
    this.casesRecords = [];
    this.allClosedCases = [];
    this.allOpenCases = [];
    this.newCasesList = [];
    this.casesInSevenDays = 0;
    this.totalCasesClosed = 0;
    this.dealerPortalCases = 0;
    this.totalCaseInSevenDays = [];
    this.homeService.getAllHomeRecords(obj).subscribe((data) => {
      this.casesRecords = data.Cases;
      this.accountInfo = data.Accounts;
      this.totalCase = this.casesRecords.length;
      if (this.totalCase > 0) {
        for (let i = 0; i< this.casesRecords.length; i++) {
          const closeUR = 'Closed - Unresolved';
          const closeR = 'Closed - Resolved';
          const newCase = 'Dealer Portal';
          if (this.casesRecords[i].Origin == newCase) {
             this.newCasesList.push(this.casesRecords[i]);
             this.dealerPortalCases = this.newCasesList.length;
             this.tClosedCases = (this.dealerPortalCases / this.totalCase);
          } else if ((this.casesRecords[i].Status == closeR) ||  (this.casesRecords[i].Status == closeUR)) {
            this.allClosedCases.push(this.casesRecords[i]);
            this.totalCasesClosed = this.allClosedCases.length;
            if (this.totalCasesClosed > 0) {
              this.tAllCase = (this.totalCasesClosed / this.totalCase);
            } else {
              this.tAllCase = 0;
            }
            const closeDate = new Date(this.casesRecords[i].ClosedDate);
            const days = 7;
            const todayDate = new Date();
            const calDate = new Date(todayDate.getTime() - (days * 24 * 60 * 60 * 1000));
            if ((closeDate.getDate() >= calDate.getDate()) || (closeDate.getDate() == todayDate.getDate())) {
               this.totalCaseInSevenDays.push(this.casesRecords[i]);
               this.casesInSevenDays = this.totalCaseInSevenDays.length;
               this.tSevenDaysCases = (this.casesInSevenDays / this.totalCasesClosed);
            }
          } else {
            this.tAllCase = 0; 
            this.tClosedCases = 0;
            this.allOpenCases.push(this.casesRecords[i]);
            if (this.casesInSevenDays == 0) {
              this.tSevenDaysCases = 0;
            }
          }
     }

      } else if(this.casesRecords.length == 0){
        this.tClosedCases = 0;
        this.tSevenDaysCases = 0;
        this.tAllCase = 0;
      }
      this.hideLoader();
    });

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  allCases(activeTab){
    this.activeTab = activeTab;
    this.all_cases = true;
    this.create_case = false;
    this.open_cases = false;
    this.close_cases = false;
  }

  openCases(activeTab) {
    this.activeTab = activeTab;
    this.all_cases = false;
    this.create_case = false;
    this.open_cases = true;
    this.close_cases = false;
  }

  createCases(activeTab) {
    this.activeTab = activeTab;
    this.all_cases = false;
    this.create_case = true;
    this.open_cases = false;
    this.close_cases = false;
  }

  closedCases(activeTab) {
    this.activeTab = activeTab;
    this.all_cases = false;
    this.create_case = false;
    this.open_cases = false;
    this.close_cases = true;
  }

  getCreatedCase(val) {
    this.newCase = val;
    this.create_case = false;
    this.allCases('allcases');
    this.getUpdatedCases();
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.hcases = history.state.data;
    this.erpData = sessionStorage.getItem('erpId');
    if (this.hcases == 'hClosed') {
       this.closedCases('close');
    } else {
      this.allCases('allcases');
    }
    setTimeout(() => {
      this.showLoader();
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if (userData) {
        this.hideLoader();
        this.getCases();
      }
    }, 3000);
  }

}
