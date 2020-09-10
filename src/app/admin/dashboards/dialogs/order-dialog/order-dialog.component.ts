import { IOriginalOrder } from './../../models/iOriginalOrder';
import { IOrderData } from './../../models/iOrderData';
import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRelatedInvoices } from './../../models/iRelatedInvoices';
import { IRelatedOrders } from './../../models/iRelatedOrders';
import { AuthTokenService } from './../../services/auth-token.service';
import { HomeService } from './../../services/home.service';

import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSort } from '@angular/material';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { IRelated } from '../../models/iRelated';


@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  public infoForm: FormGroup;
  public orderNo: string;
  public tokenVal: string;
  public relatedData: IRelated;
  public orderRelatedData: IRelatedOrders[] = [];
  public invoiceRelatedData: IRelatedInvoices[] = [];
  dataSource: MatTableDataSource<IRelatedOrders>;

  public activeTab = 'orderLine';
  public allOrderLine: boolean = true;
  public invoice: boolean = false;
  public originalOrder: boolean = false;
  public totalOrderItem: number = 0;
  public totalInvocieItem: number = 0;
  public totalOriginalItem: number = 0;


  displayedColumns = ['Name',
    'Quantity__c',
    'TotalGST__c',
    'PriceAfterDiscount__c',
    'TotalPrice__c',
    'UnitPrice__c',
    'Discount__c',
   ];

   displayInvoiceColumn = ['Amount__c',
   'Balance__c',
   'Invoice_Date__c',
   'Name',
   'LastModifiedBy.Name'
  ];

  displayOriginalOrder = [
    'Buyer_PO_Date__c',
    'GrandTotal__c',
    'Id',
    'Name',
    'TotalGST__c',
    'TotalPrice__c'
  ]
   invoiceDataSource: MatTableDataSource<IRelatedInvoices>;
   originalOrderData: MatTableDataSource<IOriginalOrder>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  date = new FormControl(new Date());
  public loading: boolean;
  public accountInfo;
  public erpNumber;
  public orderData: IOrderData[] = [];
  public originalOrders: IOriginalOrder[] = [];

  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private authService: AuthTokenService,
              private homeService: HomeService, public snackBar: MatSnackBar, private store: Store<AppState>,
              private dialogRef: MatDialogRef<OrderDialogComponent>) {

                this.store.select(state => (state.homeState))
                .subscribe((resp: any) => {
                  if (resp.objectLoading == 'Home_Records_Success') {
                    this.accountInfo = resp.homeRecord.Accounts;
                    this.orderData = resp.homeRecord.Orders;
                    this.erpNumber = this.accountInfo.ERP_Customer_Number__c;
                  }
                });
                if (data.DP_OrderNO__c) {
                  for (const obj of this.orderData) {
                    if (obj.Name == data.DP_OrderNO__c) {
                      const orgId = obj.OriginalOrderId__r ? obj.OriginalOrderId__r.Name : '';
                      const tPrice = obj.TotalPrice__c ? '₹' + Number(obj.TotalPrice__c.toString()).toLocaleString('en-IN') : '';
                      const tGst = obj.TotalGST__c ? '₹' + Number(obj.TotalGST__c.toString()).toLocaleString('en-IN') : '';
                      const gTotal = obj.GrandTotal__c ? '₹' + Number(obj.GrandTotal__c.toString()).toLocaleString('en-IN') : '';
                      this.loading = false;
                      const owner = obj.LastModifiedBy ? obj.LastModifiedBy.Name : '';
                      this.orderNo = obj.Name;
                      this.infoForm = fb.group({
                buyerDate: [{value: obj.Buyer_PO_Date__c, disabled: true}],
                buyerPo: [{value: obj.Buyer_PO_Number__c,  disabled: true}],
                order: [{value: obj.Name,  disabled: true}],
                originalOrder: [{value: orgId,  disabled: true}],
                totalPrice: [{value: tPrice,  disabled: true}],
                totalGst: [{value: tGst,  disabled: true}],
                owner: [{value: owner,  disabled: true}],
                description: [{value: obj.Description__c,  disabled: true}],
                grandTotal: [{value: gTotal,  disabled: true}],
                billingCity: [{value: obj.BillingCity__c,  disabled: true}],
                billingState: [{value: obj.BillingState__c,  disabled: true}],
                billingCountry: [{value: obj.BillingCountry__c,  disabled: true}],
                billingZip: [{value: obj.BillingPostalCode__c,  disabled: true}],
                billingStreet: [{value: obj.BillingStreet__c,  disabled: true}],
                shippingCity: [{value: obj.ShippingCity__c,  disabled: true}],
                shippingState: [{value: obj.ShippingState__c,  disabled: true}],
                shippingCountry: [{value: obj.ShippingCountry__c,  disabled: true}],
                shippingZip: [{value: obj.ShippingPostalCode__c,  disabled: true}],
                shippingStreet: [{value: obj.ShippingStreet__c,  disabled: true}],
                invoiceTracking: [{value: obj. Invoice_Courier_Tracking_No__c,  disabled: true}],
                invoiceUrl: [{value: obj.Invoice_Courier_Tracking_URL__c,  disabled: true}],
                lrTracking: [{value: obj.LR_Courier_Tracking_No__c,  disabled: true}],
                lrUrl: [{value: obj.LR_Courier_Tracking_URL__c,  disabled: true}],
                erp: [{value: this.erpNumber,  disabled: true}],
                customerType: [{value: obj.Type__c,  disabled: true}],
              });

                    }
                  }
                } else {
                  const orgId = data.OriginalOrderId__r ? data.OriginalOrderId__r.Name : '';
                  const tPrice = data.TotalPrice__c ? '₹' + Number(data.TotalPrice__c.toString()).toLocaleString('en-IN') : '';
                  const tGst = data.TotalGST__c ? '₹' + Number(data.TotalGST__c.toString()).toLocaleString('en-IN') : '';
                  const gTotal = data.GrandTotal__c ? '₹' + Number(data.GrandTotal__c.toString()).toLocaleString('en-IN') : '';
                  this.loading = false;
                  const owner = data.LastModifiedBy ? data.LastModifiedBy.Name : ''
                  this.orderNo = data.Name;
                  this.infoForm = fb.group({
                buyerDate: [{value: data.Buyer_PO_Date__c, disabled: true}],
                buyerPo: [{value: data.Buyer_PO_Number__c,  disabled: true}],
                order: [{value: data.Name,  disabled: true}],
                originalOrder: [{value: orgId,  disabled: true}],
                totalPrice: [{value: tPrice,  disabled: true}],
                totalGst: [{value: tGst,  disabled: true}],
                owner: [{value: owner ,  disabled: true}],
                description: [{value: data.Description__c,  disabled: true}],
                grandTotal: [{value: gTotal,  disabled: true}],
                billingCity: [{value: data.BillingCity__c,  disabled: true}],
                billingState: [{value: data.BillingState__c,  disabled: true}],
                billingCountry: [{value: data.BillingCountry__c,  disabled: true}],
                billingZip: [{value: data.BillingPostalCode__c,  disabled: true}],
                billingStreet: [{value: data.BillingStreet__c,  disabled: true}],
                shippingCity: [{value: data.ShippingCity__c,  disabled: true}],
                shippingState: [{value: data.ShippingState__c,  disabled: true}],
                shippingCountry: [{value: data.ShippingCountry__c,  disabled: true}],
                shippingZip: [{value: data.ShippingPostalCode__c,  disabled: true}],
                shippingStreet: [{value: data.ShippingStreet__c,  disabled: true}],
                invoiceTracking: [{value: data. Invoice_Courier_Tracking_No__c,  disabled: true}],
                invoiceUrl: [{value: data.Invoice_Courier_Tracking_URL__c,  disabled: true}],
                lrTracking: [{value: data.LR_Courier_Tracking_No__c,  disabled: true}],
                lrUrl: [{value: data.LR_Courier_Tracking_URL__c,  disabled: true}],
                erp: [{value: this.erpNumber,  disabled: true}],
                customerType: [{value: data.Type__c,  disabled: true}],
              });

                }
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  getRelatedInfo() {
    this.showLoader();
    const Id = this.data.FMI_OrderId__c ? this.data.FMI_OrderId__c : this.data.Id;
    const token = this.tokenVal;
    const objName = 'Orders';
    this.homeService.getRelatedInfo(Id, token, objName).subscribe((resp) => {
          this.relatedData = resp;
          if (resp) {
            this.orderRelatedData = this.relatedData.RelatedOrdersItem;
            this.totalOrderItem = this.orderRelatedData.length;
            this.invoiceRelatedData = this.relatedData.RelatedInvoices;
            this.totalInvocieItem = this.invoiceRelatedData.length;
            this.originalOrders = this.relatedData.RelatedOriginalOrder;
            this.totalOriginalItem = this.originalOrders.length;
          }
    }, err => {
      this.openSnackBar('There is some error while creating order, Please contact to Administration', 'OK');
    });
    this.hideLoader();
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openOrderLine(activeTab) {
    this.activeTab = activeTab;
    this.allOrderLine = true;
    this.invoice = false;
    this.originalOrder = false;
  }

  openInvoice(activeTab) {
    this.activeTab = activeTab;
    this.allOrderLine = false;
    this.invoice = true;
    this.originalOrder = false;
  }

  openOriginalOrder(activeTab) {
    this.activeTab = activeTab;
    this.allOrderLine = false;
    this.invoice = false;
    this.originalOrder = true;
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

  ngOnInit(){
    setTimeout(() => {
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if(this.tokenVal) {
        this.getRelatedInfo();
      }
    }, 3000);
  }

}
