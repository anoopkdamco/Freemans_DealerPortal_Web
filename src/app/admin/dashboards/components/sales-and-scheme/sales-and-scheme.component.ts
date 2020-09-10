import { ISales } from './../../models/iSales';
import { AuthTokenService } from './../../services/auth-token.service';
import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { IScheme } from './../../models/iScheme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-and-scheme',
  templateUrl: './sales-and-scheme.component.html',
  styleUrls: ['./sales-and-scheme.component.scss']
})
export class SalesAndSchemeComponent implements OnInit {
  public hTarget = 0;
  public activeTab = 'quaterlySales';
  public quatSale = true;
  public annualSale = false;
  public hQSales: string;
  public hSchemes: string;
  public leftSales: string;
  public schemesRec: string;
  public scheme = false;
  public newOrder = false;
  public schemeList: IScheme[] = [];
  public annualSalesList: ISales[] = [];
  public historicalSalesList: ISales[] = [];
  public quaterlySalesList: ISales[] = [];
  public totalQuarterTarget = 0;
  public totalAnnualTarget = 0;
  public totalSchemeTarget = 0;
  public quaterlyAchieved = 0;
  public annualAchieved = 0;
  public schemeAchieved = 0;
  public accountInfo;
  public fyTotalScheme: IScheme[] = [];
  public fyAchievedScheme: IScheme[] = [];
  public loading: boolean;
  public qSales;
  public totalQSales;
  public annSales;
  public totalAnnSales;
  public dTotalQSales;
  public dTotalAnnSales;
  public dSchemes;


  constructor(private store: Store<AppState>, private authService: AuthTokenService) {
    this.loading = true;
   }

  getSalesAndSchemeData() {
    this.showLoader();
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading === 'Home_Records_Success') {
        const today = new Date();
        let quarter =  Math.floor(today.getMonth() / 3);
        quarter -= quarter > 4 ? 4 : 0;
        const year = today.getFullYear() + (quarter == 1? 1 : 0);
        // get current month
        const curMonth = today.getMonth();
        let fiscalYr = '';
        if (curMonth > 3) { //
        const nextYr1 = (today.getFullYear() + 1).toString();
        fiscalYr = today.getFullYear().toString() + '-' + nextYr1;
        } else {
        const nextYr2 = today.getFullYear().toString();
        fiscalYr = (today.getFullYear() - 1).toString() + '-' + nextYr2;
       }
        this.accountInfo = data.homeRecord.Accounts;
        this.schemeList = data.homeRecord.SchemeOrders;
        if (this.schemeList.length > 0) {
          for (let i = 0; i < this.schemeList.length; i++) {
            const endDate = new Date(this.schemeList[i].Scheme_End_Date__c);
            const schemMonth = endDate.getMonth();
            let schemFiscalYr = '';
            if (schemMonth > 3) { //
              const nextSchemeYr1 = (endDate.getFullYear() + 1).toString();
              schemFiscalYr = today.getFullYear().toString() + '-' + nextSchemeYr1;
              } else {
              const nextSchemeYr2 = today.getFullYear().toString();
              schemFiscalYr = (today.getFullYear() - 1).toString() + '-' + nextSchemeYr2;
             }
            if (fiscalYr == schemFiscalYr) {
                 this.fyTotalScheme.push(this.schemeList[i]);
                 this.totalSchemeTarget = this.fyTotalScheme.length;
                 if (this.schemeList[i].Qualified_for_Scheme__c === 'Yes') {
                   this.fyAchievedScheme.push(this.schemeList[i]);
                   this.schemeAchieved = this.fyAchievedScheme.length;
                }
             }
            this.dSchemes = (this.schemeAchieved / this.totalSchemeTarget);
          }

        } else {
          this.dSchemes = 0;
          this.schemeAchieved = 0;
          this.totalSchemeTarget = 0;

        }
        this.annualSalesList = data.homeRecord.AnnualSalesPerformance;

        if (this.annualSalesList.length > 0) {
          for (let j = 0; j < this.annualSalesList.length; j++) {
            const annFiscalYr = this.annualSalesList[j].Fiscal_Year__c;
            if (annFiscalYr == fiscalYr) {
              this.totalAnnualTarget = this.totalAnnualTarget + this.annualSalesList[0].Total_Targeted_Amount__c;
              this.totalAnnSales = '₹' + Number(this.totalAnnualTarget.toString()).toLocaleString('en-IN');
              this.annualAchieved = this.annualAchieved + this.annualSalesList[0].Total_Closed_Won__c;
              this.annSales = '₹' + Number(this.annualAchieved.toString()).toLocaleString('en-IN');
            }

            if(this.annualAchieved != undefined) {
              this.dTotalAnnSales = this.annualAchieved / this.totalAnnualTarget;
            } else {
              this.dTotalAnnSales = 0;
            }
          }

        } else {
          this.dTotalAnnSales = 0;
          this.annualAchieved = 0;
          this.totalAnnualTarget = 0; 

        }

        this.quaterlySalesList = data.homeRecord.QuarterlyyearSalesPerformance;

        if (this.quaterlySalesList.length > 0) {
          for (let k = 0 ; k < this.quaterlySalesList.length; k++) {
            const qEndDate = new Date(this.quaterlySalesList[k].End_Date__c);
            let fyQuarter = Math.floor(qEndDate.getMonth() / 3);
            fyQuarter -= fyQuarter > 4 ? 4 : 0;
            const fyYear = qEndDate.getFullYear() + (fyQuarter == 1? 1 : 0);
            const qMonth = qEndDate.getMonth();
            let qFiscalYr = '';
            if (qMonth > 3) { //
              const nextQYr1 = (qEndDate.getFullYear() + 1).toString();
              qFiscalYr = today.getFullYear().toString() + '-' + nextQYr1;
              } else {
              const nextQYr2 = today.getFullYear().toString();
              qFiscalYr = (today.getFullYear() - 1).toString() + '-' + nextQYr2;
             }
  
            if (fiscalYr == qFiscalYr) {
              if (fyQuarter == quarter) {
                if(this.quaterlySalesList.length > 0) {
                 this.totalQuarterTarget = this.totalQuarterTarget + this.quaterlySalesList[k].Total_Targeted_Amount__c;
                 this.totalQSales = '₹' + Number(this.totalQuarterTarget.toString()).toLocaleString('en-IN');
                 this.quaterlyAchieved = this.quaterlyAchieved + this.quaterlySalesList[k].Total_Closed_Won__c;
                 this.hTarget = (this.quaterlyAchieved/this.totalQuarterTarget);
                 this.qSales = '₹' + Number(this.quaterlyAchieved.toString()).toLocaleString('en-IN');
                } else {
                  this.totalQSales = 0;
                  this.qSales = 0;
                  this.totalQuarterTarget = 0;
                  this.quaterlyAchieved = 0;
                  this.hTarget = 0;
                }
              }
          }
          }
        } 
      }
      this.hideLoader();
    });
  }


  quaterlySales(activeTab) {
    this.activeTab = activeTab;
    this.quatSale = true;
    this.annualSale = false;
    this.scheme = false;
    this.newOrder = false;
  }

  annualSales(activeTab) {
    this.activeTab = activeTab;
    this.quatSale = false;
    this.annualSale = true;
    this.scheme = false;
    this.newOrder = false;
  }

  createOrder(activeTab) {
    this.activeTab = activeTab;
    this.quatSale = false;
    this.annualSale = false;
    this.scheme = false;
    this.newOrder = true;
  }

  schemes(activeTab) {
    this.activeTab = activeTab;
    this.quatSale = false;
    this.annualSale = false;
    this.scheme = true;
    this.newOrder = false;
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.schemesRec = history.state.data;
    if (this.schemesRec == 'hSchemes') {
       this.schemes('scheme');
    } else if (this.schemesRec == 'qSales') {
      this.quaterlySales('quaterlySales');
    } else {
      this.quaterlySales('quaterlySales');
    }
    setTimeout(() => {
      this.showLoader();
      const userData = this.authService.getUserData();
      if (userData) {
        this.hideLoader();
        this.getSalesAndSchemeData();
      }
    }, 3000);
  }

}
