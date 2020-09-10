import { AuthTokenService } from './../../services/auth-token.service';
import { IPayments } from './../../models/iPayments';
import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-and-payments',
  templateUrl: './invoice-and-payments.component.html',
  styleUrls: ['./invoice-and-payments.component.scss']
})
export class InvoiceAndPaymentsComponent implements OnInit {
  public activeTab = 'allInvoices';
  public allInvoice: boolean = true;
  public duePayments: boolean = false;
  public executedPayments: boolean = false;
  public upcomingPayments: boolean = false;
  public totalPayment: number = 0;
  public totalDuePayment: number = 0;
  public totalExecutedPayment: number =0;
  public toatlUpcomingPayment: number = 0;
  public invoiceData: IPayments[] = [];
  public dueInvoicesList: IPayments[] = [];
  public noOfDueInvoice: number = 0;
  public noOfTotalInvoice: number = 0;
  public executedPaymentList: IPayments[] = [];
  public upcomingPaymentList: IPayments[] = [];
  public noOfExecutedPayment: number = 0;
  public noOfUpcomingPayments: number = 0;
  public todayDate = new Date();
  public loading: boolean;
  public allDueInvoices: string;
  public tPayment;
  public duePayment;
  public upcPayment;

  public tDueInvoice;
  public tInvoiceAmtDue;
  public tInvoiceAmtUp;
  public tInvoiceEx;
 

  constructor(private store: Store<AppState>, private authService: AuthTokenService) {
    this.loading = true;
   }

  allInvoiceTab(activeTab) {
    this.activeTab = activeTab;
    this.allInvoice = true;
    this.duePayments = false;
    this.executedPayments = false;
    this.upcomingPayments = false;
  }

  duePaymentsTab(activeTab) {
    this.activeTab = activeTab;
    this.allInvoice = false;
    this.duePayments = true;
    this.executedPayments = false;
    this.upcomingPayments = false;
  }

  executedPaymentTab(activeTab) {
    this.activeTab = activeTab;
    this.allInvoice = false;
    this.duePayments = false;
    this.executedPayments = true;
    this.upcomingPayments = false;
  }

  upcomingPaymentTab(activeTab) {
    this.activeTab = activeTab;
    this.allInvoice = false;
    this.duePayments = false;
    this.executedPayments = false;
    this.upcomingPayments = true;
  }
  
  getPaymentRecords() {
    this.showLoader();
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.invoiceData = data.homeRecord.Invoices;
        this.noOfTotalInvoice = this.invoiceData.length;
        if (this.noOfTotalInvoice > 0) {
          for(let i =0; i< this.invoiceData.length; i++) {
            this.totalPayment = this.totalPayment + this.invoiceData[i].Amount__c;
            this.tPayment = '₹' + Number(this.totalPayment.toString()).toLocaleString('en-IN');

            if (this.invoiceData.length > 0) {
             if (this.invoiceData[i].Balance__c != 0) {
               this.tInvoiceEx = 0;
               this.totalDuePayment = this.totalDuePayment + this.invoiceData[i].Balance__c;
               this.tInvoiceAmtDue = (this.totalDuePayment / this.totalPayment);
               this.duePayment = '₹' + Number(this.totalDuePayment.toString()).toLocaleString('en-IN');
               this.dueInvoicesList.push(this.invoiceData[i]);
               this.noOfDueInvoice = this.dueInvoicesList.length;
               this.tDueInvoice = (this.noOfDueInvoice / this.noOfTotalInvoice);
               this.allDueInvoices = ((this.noOfDueInvoice / this.noOfTotalInvoice) * 100).toFixed(0);
               const dueDate = new Date(this.invoiceData[i].Due_Date__c);
               const days = 7;
               const calDate = new Date(this.todayDate.getTime() + (days * 24 * 60 * 60 * 1000));
               if ((dueDate.getDate() === this.todayDate.getDate()) || (dueDate.getDate() < calDate.getDate())) {
                 this.upcomingPaymentList.push(this.invoiceData[i]);
                 this.noOfUpcomingPayments = this.upcomingPaymentList.length;
                 this.toatlUpcomingPayment = this.toatlUpcomingPayment + this.invoiceData[i].Balance__c;
                 this.tInvoiceAmtUp = (this.toatlUpcomingPayment / this.totalPayment);
                 this.upcPayment = '₹' + Number(this.toatlUpcomingPayment.toString()).toLocaleString('en-IN');
            } else {
              this.tInvoiceAmtUp = 0;
              this.upcPayment = 0;
            }
            } else if (this.invoiceData[i].Payment_Status__c == 'Paid') {
              this.totalExecutedPayment = this.totalExecutedPayment + this.invoiceData[i].Amount__c;
              this.executedPaymentList.push(this.invoiceData[i]);
              this.noOfExecutedPayment = this.executedPaymentList.length;
              this.tInvoiceEx = (this.noOfExecutedPayment / this.noOfTotalInvoice);
            } else if(this.totalExecutedPayment == 0) {
              this.tInvoiceEx = 0;
            }

           }
         }

      } else {
        this.tDueInvoice = 0;
        this.tInvoiceAmtDue = 0;
        this.tInvoiceAmtUp = 0 ;
        this.tInvoiceEx = 0;
        this.duePayment = 0 ;
        this.upcPayment = 0;
      }
        this.hideLoader();
      }
    });
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }


  ngOnInit() {
    setTimeout(() => {
      this.showLoader();
      const userData = this.authService.getUserData();
      if (userData) {
        this.hideLoader();
        this.getPaymentRecords();
      }
    }, 3000);
  }

}
