import { ISpeedometer } from './../../models/iSpeedometer';
import { ILatestProduct } from './../../models/iLatestProduct';
import { IAnnualSales } from './../../models/iAnualSales';
import { IOrderData } from './../../models/iOrderData';
import { IPayments } from './../../models/iPayments';
import { SchemeExhibitionDialogComponent } from './../../dialogs/scheme-exhibition-dialog/scheme-exhibition-dialog.component';
import { SchemeDetailsComponent } from './../../dialogs/scheme-details/scheme-details.component';
import { ISchemeExhibition } from './../../models/ISchemeExhibition';
import { ExhibitionDialogComponent } from './../../dialogs/exhibition-dialog/exhibition-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IExhibition } from './../../models/iExhibition';
import { ICase } from './../../models/iCase';
import { IScheme } from './../../models/iScheme';
import { ISales } from './../../models/iSales';
import { AuthTokenService } from './../../services/auth-token.service';
import { AppState } from './../../../../models/appState';
import { HomeService } from './../../services/home.service';
import { Component, OnInit, SecurityContext, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as homeActions from '../../../../ngrx/actions/home.actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, MultiDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CurrencyPipe } from '@angular/common';
import 'chart.piecelabel.js';
import { IAnnualSalesPerformance } from '../../models/iAnnualSalesPerformance';
import { SimpleSnackBar, MatSnackBarRef, MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public erpData;
  public prodMsg = "No Record Available";
  public accountName: string;
  public loading: boolean;
  public quaterlySalesList: ISales[] = [];
  public totalQuarterTarget = 0;
  public quaterlyAchieved = 0;
  public schemeList: IScheme[] = [];
  public totalSchemeTarget = 0;
  public fyTotalScheme: IScheme[] = [];
  public fyAchievedScheme: IScheme[] = [];
  public schemeAchieved = 0;
  public casesRecords: ICase[] = [];
  public allOpenCases: ICase[] = [];
  public allClosedCases: ICase[] = [];
  public totalCaseInSevenDays: ICase[] = [];
  public totalCasesClosed = 0;
  public casesInSevenDays = 0;
  public totalCasesCreated = 0;
  public caseCreatedDealer = 0;
  public totalCase = 0;
  public dealerPortalCases = 0;
  public newCasesList: ICase[] = [];
  public accountInfo;
  public exhibitionHome: IExhibition[] = [];
  public newExhibitionHome: IExhibition[] = [];
  public schemeExhibition: ISchemeExhibition[] = [];
  public latestProduct: ILatestProduct[] = [];
  public creditLimit = 0;
  public totalCreditLimit = 0;
  public cardCLimit;
  public totalCLimit;
  public qSales;
  public totalQSales;
  thumbnail: any;
  thumb: SafeResourceUrl;
  schemeThumbNail: any;
  public salesReport: IAnnualSales[] = [];
  public salesAchievment: IAnnualSales[] = [];
  public salesComaprision: IAnnualSales[] = [];
  public curSalesYear: IAnnualSales[] = [];
  public prevSalesYear: IAnnualSales[] = [];
  public lastSalesYear: IAnnualSales[] = [];
  public filterdSalesData: IAnnualSales[] = [];
  public annualSalesPerformance: IAnnualSalesPerformance[] = [];
  public calendarYear: string;
  public fiscalYear: string;
  public fyJan: number;

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
  public allOrders: IOrderData[] = [];
  public pieChart = 'Pending Order';
  public donutChart = 'Payment Overview';
  public fisYear;
  public totalClose;
  public calenderYr;
  public totalCloseWon;

  //public canvasWidth = 545;
  public canvasWidth = 400;
  public canvasHighWidth = 600;
  public needleValue: number;
  public centralLabel: string;
  public name: string;
  public bottomLabel = '$20';
  public nameFont = 14;
  public bottomLabelFont = 16;
  public options = {};

  //  @ViewChild('targetGauge') targetElement: ElementRef;
  //  resultGauge: string;

  // @ViewChild('targetSales') targetElements: ElementRef;
  //  resultSales: string;


  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  public lineChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true,
        userCallback(val, index, values) {
          const value = val;
          const res = '₹' + Number((value).toString()).toLocaleString('en-IN');
          return res;
          // let lastThree = value.substring(value.length - 3);
          // const otherNumbers = value.substring(0, value.length - 3);
          // if (otherNumbers != '') {
          //       lastThree = ',' + lastThree;
          //       const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
          //       return '₹' + res;
          // }
        }
      }
    }] },
    plugins: {
      datalabels: {
        display: false
      }
    },
    legend: {
      labels: {
        boxWidth: 10,
      }
    },

    tooltips: {
      callbacks: {
          label(tooltipItem, data) {
            const value = tooltipItem.yLabel;
            const res = '₹' + Number((value).toString()).toLocaleString('en-IN');
            return res;
            // let lastThree = value.substring(value.length - 3);
            // const otherNumbers = value.substring(0, value.length - 3);
            // if (otherNumbers != '') {
            //     lastThree = ',' + lastThree;
            //     const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            //     return '₹' + res;
            // }


            // return '₹' + Number(tooltipItem.yLabel).toFixed(0).replace(/./g, (c, i, a) => {
            //       return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
            //   });
          }
      }
  }
  };
  public lineChartColors: Color[] = [
    { borderColor: '#00BFFF',
      backgroundColor: '#00BFFF' },
    { borderColor: '#FF1493',
      backgroundColor: '#FF1493' },
    { borderColor: '#f9bd65' ,
      backgroundColor: '#f9bd65' },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

   barChartLabels: Label[] = ['Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  barChartOptions: any = {
    responsive: true,
    // scales: { xAxes: [{}], yAxes: [{}] },
    scales: {
      yAxes: [{
          ticks: {
              callback (val, index, labels) {
                const value = val;
                const res = '₹' + Number((value).toString()).toLocaleString('en-IN');
                return  res;
                // let lastThree = value.substring(value.length - 3);
                // const otherNumbers = value.substring(0, value.length - 3);
                // if (otherNumbers != '') {
                // lastThree = ',' + lastThree;
                // const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
                // return '₹' + res;
                // }
              },
              }
          }]
      },
    plugins: {
      datalabels: {
        display: false
      }
    },
    legend: {
      labels: {
        boxWidth: 10,
      }
    },

    tooltips: {
      callbacks: {
          label(tooltipItem, data) {
            const value = tooltipItem.yLabel;
            const res = '₹' + Number((value).toString()).toLocaleString('en-IN');
            return res;
            // let lastThree = value.substring(value.length - 3);
            // const otherNumbers = value.substring(0, value.length - 3);
            // if (otherNumbers != '') {
            //     lastThree = ',' + lastThree;
            //     const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            //     return '₹' + res;
            // }
          }
      }
  }
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];
  public aprData: number;
  public febData: number;
  public marData: number;
  public mayData: number;
  public juneData: number;
  public julData: number;
  public augData: number;
  public sepData: number;
  public octData: number;
  public novData: number;
  public decData: number;
  public janData: number;

  public aprCData: number;
  public febCData: number;
  public marCData: number;
  public mayCData: number;
  public juneCData: number;
  public julCData: number;
  public augCData: number;
  public sepCData: number;
  public octCData: number;
  public novCData: number;
  public decCData: number;
  public janCData: number;

  public aprDataP: number;
  public marDataP: number;
  public mayDataP: number;
  public juneDataP: number;
  public julDataP: number;
  public augDataP: number;
  public sepDataP: number;
  public octDataP: number;
  public novDataP: number;
  public decDataP: number;
  public janDataP: number;
  public febDataP: number;

  public aprDataL: number;
  public febDataL: number;
  public marDataL: number;
  public mayDataL: number;
  public juneDataL: number;
  public julDataL: number;
  public augDataL: number;
  public sepDataL: number;
  public octDataL: number;
  public novDataL: number;
  public decDataL: number;
  public janDataL: number;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
        boxWidth: 10,
      }
    },
  };
  public pieChartLabels: Label[] = ['Approval Pending', 'Advance Payment Pending', 'Under Production', 'Ready For Dispatch'];
  public pieChartColors: Color[] = [
    {backgroundColor:['#f9bd65', '#FF1493', '#1E90FF', '#32CD32']},
  ];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public hTarget = 0;
  public hLimit = 0;
  public hCases = 0;
  public hScheme = 0;

 public op = 'Order Placed';
 public oa = 'Order Approved';
 public pic = 'PI Confirmed';
 public advpayc = 'Advance Payment Pending';
 public oup = 'Order Under Production';
 public ord = 'Order Ready for Dispatch';
 public gd = 'Goods Dispatched';
 public psd = 'Post Sales Documents Dispatched';
 public pc = 'Payment Completed';
 public cl = 'Closed';

 public approvalPending: IOrderData[] =[];
 public advancePaymentPending: IOrderData[] = [];
 public underProduction: IOrderData[] = [];
 public readyForDispatch: IOrderData[] = [];
 public pendingOrder: IOrderData[] = [];

public noOfApprovalPending: number =0;
public noOfAdavancePaymentPending: number =0;
public noOfUnderProduction: number =0;
public noOfPendingOrder: number =0;
public finanicialYear = '';
public doughnutChartOptions: any = {
  responsive: true,
  legend: {
    labels: {
      boxWidth: 15,
    }
  },
  plugins: {
    datalabels: {
      display: false
    }
  },
  tooltips: {
    enabled: true,
    mode: 'single',
    callbacks: {
      label (tooltipItems, data) {
        const value = (data.datasets[0].data[tooltipItems.index]);
        const res = '₹' + Number((value).toString()).toLocaleString('en-IN');
        return data.labels[tooltipItems.index] +  ' : ' + res;
        // let lastThree = value.substring(value.length - 3);
        // const otherNumbers = value.substring(0, value.length - 3);
        // if (otherNumbers != '') {
        //   lastThree = ',' + lastThree;
        //   const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
        //   return data.labels[tooltipItems.index] +  ' : ' + '₹' + res;
        // }
      }
    }
  },

  pieceLabel: {
    render (args) {
      const label = args.label;
      const value = args.value;
      return label + ': ' + value;
    }
  }
};

public tokenVal;

  doughnutChartLabels: Label[] = ['Completed Payments', 'Upcoming Payments', 'Overdue Payments'];
  public doughnutChartData: Array<any> = [];

  public doughnutChartColors: Color[] = [
    {backgroundColor:['#32CD32', '#f9bd65', '#FF1493']},
  ];

  public completedPayment: number =0;
  doughnutChartType: ChartType = 'doughnut';
  public totalPayments;
  public totalDuePayments;
  public totalUpcomingPayments;
  public dataVal: boolean;

  public speedoArray: ISpeedometer[] = [];
  public fYVal: boolean;

  constructor(private homeService: HomeService, private store: Store<AppState>, private authService: AuthTokenService,
              public snackBar: MatSnackBar,
              private sanitizer: DomSanitizer, config: NgbCarouselConfig, public dialog: MatDialog, private cur: CurrencyPipe) {
                config.interval = 2000;
                config.wrap = true;
                config.keyboard = false;
                config.pauseOnHover = false;
                this.loading = true;
                this.dataVal = false;
                this.fYVal = false;
                monkeyPatchChartJsTooltip();
                monkeyPatchChartJsLegend();
   }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  public chartClicked(e: any): void {
    return e;
  }
 
  public chartHovered(e: any): void {
   return e;
  }


  getUserRecord() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      this.showLoader();
      if (data.objectLoading === 'Home_Records_Success') {
        if (data.homeRecord.TheRecordStatus == 'No Data Found') {
          this.dataVal = false;
          this.hideLoader();
          this.openSnackBar('No Records Available for this user, Please contact Your Administrator', 'OK');
        } else if (data.homeRecord.TheRecordStatus == "") {
          this.dataVal = true;
          this.hideLoader();
          this.allOrders = data.homeRecord.Orders;
          this.accountInfo = data.homeRecord.Accounts;
          this.accountName = this.accountInfo.Name;
          this.invoiceData = data.homeRecord.Invoices;
          this.speedoArray = data.homeRecord.SpeedomtercatList;
          this.annualSalesPerformance = data.homeRecord.AnnualSalesPerformance;
          if (data.homeRecord.Accounts) {
            this.creditLimit = data.homeRecord.Accounts.Credit_Remaining__c;
            this.cardCLimit = '₹' + Number(this.creditLimit.toString()).toLocaleString('en-IN');
            this.totalCreditLimit = data.homeRecord.Accounts.Credit_Limit__c;
            this.hLimit = (this.creditLimit / this.totalCreditLimit) ;
            this.totalCLimit = '₹' + Number(this.totalCreditLimit.toString()).toLocaleString('en-IN');
          } else {
            this.hLimit = 0;
            this.creditLimit = 0;
            this.totalCreditLimit = 0;
          }
          const today = new Date();
          let quarter =  Math.floor(today.getMonth() / 3);
          quarter -= quarter > 4 ? 4 : 0;
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
          const bronze = this.speedoArray[0].Percentage;
          const silver = this.speedoArray[1].Percentage;
          const gold = this.speedoArray[2].Percentage;
          const platinum = this.speedoArray[3].Percentage;
          const centurian = this.speedoArray[4].Percentage;
          const lastVal = (bronze + silver + gold + platinum + centurian) + '%';
          this.needleValue = this.annualSalesPerformance[0].January__c ? this.annualSalesPerformance[0].January__c : 0;
          this.centralLabel = this.needleValue + '%';
          const cen = 99;
          const zero = 0 + '%';
          this.options = {
            hasNeedle: true,
            needleColor: 'black',
            needleUpdateSpeed: 1000,
            arcColors: ['black', 'rgb(205, 127, 50)', 'rgb(192,192,192)', 'rgb(255,215,0)', '#e5e4e2', '#32CD32'],
            arcDelimiters: [bronze, silver, gold, platinum, cen],
            rangeLabel: ['0%', '100%'],
            needleStartValue: 0,
            rangeLabelFontSize: [14]
          };
          const totalCW = this.annualSalesPerformance[0].Total_Closed_Won__c;
          this.fisYear = ((this.annualSalesPerformance[0].Fiscal_Year__c == undefined) ? fiscalYr : this.annualSalesPerformance[0].Fiscal_Year__c);
          const fPay = totalCW.toString();
          this.totalCloseWon = '₹' + Number((totalCW).toString()).toLocaleString('en-IN');
          this.calenderYr = ((this.annualSalesPerformance[0].Calendar_Year__c == 'NA') ? '' : this.annualSalesPerformance[0].Calendar_Year__c);
          this.name = 'Annual Sales Policy' + ' ' + ((this.annualSalesPerformance[0].Fiscal_Year__c == undefined) ? fiscalYr : this.annualSalesPerformance[0].Fiscal_Year__c);
          this.salesReport = data.homeRecord.SalesAchievement;
          for (const i of this.salesReport) {
            let fQuarter = (i.Month / 3);
            fQuarter -= fQuarter > 4 ? 4 : 0;
            const fyYear = i.Year + (fQuarter === 1 ? 1 : 0);
            let sFyYear = ''
            const previousYear =  today.getFullYear() - 1 + '-' + today.getFullYear();
            const prevPrevYear =  today.getFullYear() - 2 + '-' + today.getFullYear();
            if (i.Month > 3) {
              if ((today.getFullYear() - 1) == i.Year) {
                this.prevSalesYear.push(i);
              } else if ((today.getFullYear() - 2) == i.Year) {
                this.lastSalesYear.push(i);
              }
              const nextYr1 = i.Year + 1;
              sFyYear = today.getFullYear().toString() + '-' + nextYr1;
          } else  if (i.Month <= 3) {
            const nextYr2 = i.Year - 1;
            sFyYear = today.getFullYear().toString() + '-' + nextYr2;
            if ((today.getFullYear()) == i.Year) {
              this.prevSalesYear.push(i);
            } else if ((today.getFullYear() - 1) == i.Year) {
              this.lastSalesYear.push(i);
            }
          }
            if (fiscalYr == sFyYear) {
              this.fYVal = true;
              this.salesAchievment.push(i);
              this.curSalesYear.push(i);
              for (const obj of this.salesAchievment) {
                if (obj.Month == 4) {
                   this.aprData = obj.totalAmount;
                   this.aprCData = this.aprData;
                } else if(obj.Month == 5) {
                  this.mayData = obj.totalAmount;
                  this.mayCData = this.aprCData + this.mayData;
                } else if(obj.Month == 6) {
                  this.juneData = obj.totalAmount;
                  this.juneCData = this.mayCData + this.juneData;
                } else if(obj.Month == 7) {
                  this.julData = obj.totalAmount;
                  this.julCData = this.julData + this.juneCData;
                } else if(obj.Month == 8) {
                  this.augData = obj.totalAmount;
                  this.augCData = this.augData + this.julCData;
                } else if(obj.Month == 9) {
                  this.sepData = obj.totalAmount;
                  this.sepCData = this.sepData + this.augCData;
                } else if(obj.Month == 10) {
                  this.octData = obj.totalAmount;
                  this.octCData = this.sepCData + this.octData;
                } else if(obj.Month == 11) {
                  this.novData = obj.totalAmount;
                  this.novCData = this.novData + this.octCData;
                } else if(obj.Month == 12) {
                  this.decData = obj.totalAmount;
                  this.decCData = this.decData + this.novCData;
                } else if(obj.Month == 1) {
                  this.janData = obj.totalAmount;
                  this.janCData = this.janData + this.decCData;
                } else if(obj.Month == 2) {
                  this.febData = obj.totalAmount;
                  this.febCData = this.febData + this.janCData;
                } else if(obj.Month == 3) {
                  this.marData = obj.totalAmount;
                  this.marCData = this.marData + this.febCData;
                };
                this.barChartData = [
                { data: [this.aprCData, this.mayCData, this.juneCData, this.julCData, this.augCData, this.sepCData, this.octCData,
                   this.novCData, this.decCData, this.janCData, this.febCData, this.marCData],
                  label: 'Total Sales', fill: false, borderJoinStyle: 'miter', steppedLine: false, lineTension: 0,  type: 'line' },
                { data: [this.aprData, this.mayData, this.juneData, this.julData, this.augData,
                  this.sepData, this.octData, this.novData, this.decData, this.janData, this.febData, this.marData],
                  label: 'Monthly Sales' }
              ];
            }
          }
        };
          for (const obj of this.prevSalesYear) {
          if (obj.Month == 4) {
             this.aprDataP = obj.totalAmount;
          } else if(obj.Month == 5) {
            this.mayDataP = obj.totalAmount;
          } else if(obj.Month == 6) {
            this.juneDataP = obj.totalAmount;
          } else if(obj.Month == 7) {
            this.julDataP = obj.totalAmount;
          } else if(obj.Month == 8) {
            this.augDataP = obj.totalAmount;
          } else if(obj.Month == 9) {
            this.sepDataP = obj.totalAmount;
          } else if(obj.Month == 10) {
            this.octDataP = obj.totalAmount;
          } else if(obj.Month == 11) {
            this.novDataP = obj.totalAmount;
          } else if(obj.Month == 12) {
            this.decDataP = obj.totalAmount;
          } else if(obj.Month == 1) {
            this.janDataP = obj.totalAmount;
          } else if(obj.Month == 2) {
            this.febDataP = obj.totalAmount;
          } else if(obj.Month == 3) {
            this.marDataP = obj.totalAmount;
          };
      }

          for (const obj of this.lastSalesYear) {
        if (obj.Month == 4) {
           this.aprDataL = obj.totalAmount;
        } else if(obj.Month == 5) {
          this.mayDataL = obj.totalAmount;
        } else if(obj.Month == 6) {
          this.juneDataL = obj.totalAmount;
        } else if(obj.Month == 7) {
          this.julDataL = obj.totalAmount;
        } else if(obj.Month == 8) {
          this.augDataL = obj.totalAmount;
        } else if(obj.Month == 9) {
          this.sepDataL = obj.totalAmount;
        } else if(obj.Month == 10) {
          this.octDataL = obj.totalAmount;
        } else if(obj.Month == 11) {
          this.novDataL = obj.totalAmount;
        } else if(obj.Month == 12) {
          this.decDataL = obj.totalAmount;
        } else if(obj.Month == 1) {
          this.janDataL = obj.totalAmount;
        } else if(obj.Month == 2) {
          this.febDataL = obj.totalAmount;
        } else if(obj.Month == 3) {
          this.marDataL = obj.totalAmount;
        };
    }
          this.finanicialYear = today.getFullYear().toString() + '-' + (today.getFullYear() + 1).toString();
          const fy = today.getFullYear().toString() + '-' + (today.getFullYear() + 1).toString() ;
          const py = (today.getFullYear() - 1).toString() + '-' + today.getFullYear().toString();
          const ly = (today.getFullYear() - 2).toString() + '-' + (today.getFullYear() - 1).toString() ;
          this.lineChartData = [
          { data: [this.aprData, this.mayData, this.juneData, this.julData, this.augData,
            this.sepData, this.octData, this.novData, this.decData, this.janData, this.febData, this.marData],
             label: fy, fill: false, borderJoinStyle: 'miter', steppedLine: false, lineTension: 0 },
          { data: [this.aprDataP, this.mayDataP, this.juneDataP, this.julDataP, this.augDataP,
            this.sepDataP, this.octDataP, this.novDataP, this.decDataP, this.janDataP, this.febDataP, this.marDataP],
             label: py, fill: false, borderJoinStyle: 'miter', steppedLine: false, lineTension: 0},
          { data: [this.aprDataL, this.mayDataL, this.juneDataL, this.julDataL, this.augDataL,
            this.sepDataL, this.octDataL, this.novDataL, this.decDataL, this.janDataL, this.febDataL, this.marDataL],
            label: ly, fill: false, borderJoinStyle: 'miter', steppedLine: false, lineTension: 0},
        ];
          this.noOfTotalInvoice = this.invoiceData.length;
          for (const i of this.allOrders) {
           if ((i.Status__c == this.oa) || (i.Status__c == this.op) || (i.Status__c == this.pic)) {
               this.approvalPending.push(i);
               this.noOfApprovalPending = this.approvalPending.length;
           } else if ((i.Status__c == this.advpayc)) {
             this.advancePaymentPending.push(i);
             this.noOfAdavancePaymentPending = this.advancePaymentPending.length;

           } else if ((i.Status__c == this.oup)) {
             this.underProduction.push(i);
             this.noOfUnderProduction = this.underProduction.length;

          } else if ((i.Status__c == this.ord)) {
             this.readyForDispatch.push(i);
             this.noOfPendingOrder = this.readyForDispatch.length;
          }
           this.pieChartData = [this.noOfApprovalPending, this.noOfAdavancePaymentPending,
            this.noOfUnderProduction, this.noOfPendingOrder];
        }

          for(let i =0; i< this.invoiceData.length; i++) {
           this.totalPayment = this.totalPayment + this.invoiceData[i].Amount__c;
           const totalPay = this.totalPayment.toString();
           this.totalPayments = this.cur.transform(totalPay, 'INR');
           if (this.invoiceData[i].Balance__c != 0) {
              this.totalDuePayment = this.totalDuePayment + this.invoiceData[i].Balance__c;
              const totalDuePay = this.totalDuePayment.toString();
              this.totalDuePayments =  this.totalDuePayment ? this.cur.transform(totalDuePay, 'INR') : 0;
              this.dueInvoicesList.push(this.invoiceData[i]);
              this.noOfDueInvoice = this.dueInvoicesList.length;
              const dueDate = new Date(this.invoiceData[i].Due_Date__c);
              const days = 7;
              const calDate = new Date(dueDate.getTime() + (days * 24 * 60 * 60 * 1000));
              if ((dueDate.getDate() === this.todayDate.getDate()) || (dueDate.getDate() >= calDate.getDate())) {
                this.upcomingPaymentList.push(this.invoiceData[i]);
                this.noOfUpcomingPayments = this.upcomingPaymentList.length;
                this.toatlUpcomingPayment = this.toatlUpcomingPayment + this.invoiceData[i].Balance__c;
                const totalUpComingPay = this.toatlUpcomingPayment.toString();
                this.totalUpcomingPayments = this.toatlUpcomingPayment ? this.cur.transform(totalUpComingPay, 'INR') : 0;
           }

           } else if(this.invoiceData[i].Payment_Status__c == 'Paid') {
             this.totalExecutedPayment = this.totalExecutedPayment + this.invoiceData[i].Amount__c;
             this.executedPaymentList.push(this.invoiceData[i]);
             this.noOfExecutedPayment = this.executedPaymentList.length;
           }
           this.completedPayment = this.totalPayment - this.totalDuePayment ;
           this.doughnutChartData = [[this.totalPayment, this.totalDuePayment, this.toatlUpcomingPayment]];
        }
          this.exhibitionHome = data.homeRecord.ExhibitionsHome;
          this.schemeExhibition = data.homeRecord.SchemesHome;
          this.latestProduct = data.homeRecord.latestProdImages;
          for(let i = 0; i< this.latestProduct.length; i++) {
          const objectURL = 'data:image/jpeg;base64,' + this.latestProduct[i].FileData;
          this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
          const contentType = 'image/png';
          const b64Data = this.latestProduct[i].FileData;
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
          this.latestProduct[i].ImageData = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
          for(let i = 0; i< this.exhibitionHome.length; i++) {
          const objectURL = 'data:image/jpeg;base64,' + this.exhibitionHome[i].Image__c;
          this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          const contentType = 'image/png';
          const b64Data = this.exhibitionHome[i].Image__c;
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
          this.exhibitionHome[i].ImageData = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
          for(let i = 0; i< this.schemeExhibition.length; i++) {
          const objectURL = 'data:image/jpeg;base64,' + this.schemeExhibition[i].Image__c;
          this.schemeThumbNail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          const contentType = 'image/png';
          const b64Data = this.schemeExhibition[i].Image__c;
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
          this.schemeExhibition[i].ImageData = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
          this.quaterlySalesList = data.homeRecord.QuarterlyyearSalesPerformance;
          for (let k = 0 ; k < this.quaterlySalesList.length; k++) {
        const qEndDate = new Date(this.quaterlySalesList[k].End_Date__c);
        let fyQuarter = Math.floor(qEndDate.getMonth() / 3);
        fyQuarter -= fyQuarter > 4 ? 4 : 0;
        const fyYear = qEndDate.getFullYear() + (fyQuarter === 1 ? 1 : 0);
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
          this.schemeList = data.homeRecord.SchemeOrders;
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
          if (this.schemeList.length > 0) {
            this.fyTotalScheme.push(this.schemeList[i]);
            this.totalSchemeTarget = this.fyTotalScheme.length;
            if (this.schemeList[i].Qualified_for_Scheme__c == 'Yes') {
               this.fyAchievedScheme.push(this.schemeList[i]);
               this.schemeAchieved = this.fyAchievedScheme.length;
            }
            this.hScheme = (this.schemeAchieved / this.totalSchemeTarget);
            }  else {
              this.totalSchemeTarget = 0 ;
              this.schemeAchieved  = 0 ;
              this.hScheme = 0;

          }
         }

      }
          this.casesRecords = data.homeRecord.Cases;
          this.totalCase = this.casesRecords.length;
          if (this.casesRecords.length > 0) {
            for (let i = 0; i < this.casesRecords.length; i++) {
              const closeUR = 'Closed - Unresolved';
              const closeR = 'Closed - Resolved';
              const newCase = 'Dealer Portal';
              if (this.casesRecords[i].Origin == newCase) {
                 this.newCasesList.push(this.casesRecords[i]);
                 this.dealerPortalCases = this.newCasesList.length;
              }
              if ((this.casesRecords[i].Status == closeR) ||  (this.casesRecords[i].Status == closeUR)) {
                this.allClosedCases.push(this.casesRecords[i]);
                this.totalCasesClosed = this.allClosedCases.length;
                this.hCases = (this.totalCasesClosed / this.totalCase);
                const closeDate = new Date(this.casesRecords[i].ClosedDate);
                const days = 7;
                const calDate = new Date(closeDate.getTime() + (days * 24 * 60 * 60 * 1000));
                if ((closeDate.getDate() < calDate.getDate())) {
                   this.totalCaseInSevenDays.push(this.casesRecords[i]);
                   this.casesInSevenDays = this.totalCaseInSevenDays.length;
                }
              } else {
                this.allOpenCases.push(this.casesRecords[i]);
              }
            }

          } else {
            this.hCases = 0;
            this.totalCase = 0;
            this.totalCasesClosed = 0;
          }
        }
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return snackBarRef;
  }

  openDialog(val) {
    const dialogRef = this.dialog.open(ExhibitionDialogComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
      return result;
   });
 }

 openSchemeDialog(val) {
  const dialogRef = this.dialog.open(SchemeExhibitionDialogComponent, {width: '900px', data: val});

  dialogRef.afterClosed().subscribe(result => {
    return result;
 });
}

  ngOnInit() {
    this.erpData = sessionStorage.getItem('erpId');
    setTimeout(() => {
      this.showLoader();
      this.tokenVal = this.authService.getUserData();
      if (this.tokenVal) {
        this.hideLoader();
        this.getUserRecord();
      }
    }, 3000);
  }
}

