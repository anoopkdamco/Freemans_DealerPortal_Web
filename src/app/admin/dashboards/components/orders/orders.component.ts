import { IOrders } from './../../models/iOrders';
import { HomeService } from './../../services/home.service';
import { IOrderItemWise } from './../../models/iOrderItemWise';
import { AuthTokenService } from './../../services/auth-token.service';
import { IAccount } from './../../models/iAccount';
import { Accounts } from './../../models/accounts';
import { IOrderData } from './../../models/iOrderData';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../../models/appState';
import * as homeActions from '../../../../ngrx/actions/home.actions';
import { Orders } from '../../models/orders';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public activeTab = 'allorders';
  public all_order: boolean = true;
  public pending_order: boolean = false;
  public pending_order_wise: boolean = false;
  public create_order: boolean = false;
  public orderData: Array<any> =[];
  public allOrders: IOrders[] = [];
  public totalOrder: number = 0;
  public pendingOrder: number = 0;
  public totalPrice: number = 0.0;
  public pendingOrderPrice: number = 0.0;
  public totalPendingOrders: IOrderData[] = [];
  public totalPendingItemWise: IOrderItemWise[] = [];
  public pendingItemOrderList: IOrderItemWise[] = [];
  public pendingItemLength: number = 0;
  public totalPendingWise: number = 0;
  public op = 'Order Placed';
  public oa = 'Order Approved';
  public pic = 'PI Confirmed';
  public appending = 'Advance Payment Pending';
  public oup = 'Order Under Production';
  public ord = 'Order Ready for Dispatch';
  public newOrder: boolean;
  public tokenVal: string;
 // public accountInfo: Accounts[] = [];
 public accountInfo;
 public salesOrder: string;
 public newSales: boolean;
 public loading: boolean;
 public pendingAmt;
 public totalAmt;
 public erpData;
 public tAllOrder;
 public tPendingOrder;
 public tItemWise;
 public msg;


  constructor(private store: Store<AppState>, private authService: AuthTokenService, private homeService: HomeService) { 
    this.newOrder = false;
    this.newSales = false;
    this.loading = true;
  }
  getUserRecord() {
    this.showLoader();
    if ((!this.newOrder) && (!this.newSales)) {
      this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.allOrders = data.homeRecord.Orders;
        this.accountInfo = data.homeRecord.Accounts;
        this.pendingItemOrderList = data.homeRecord.PendingOrdersItemWise;
        this.totalPendingWise = this.pendingItemOrderList.length;
        this.totalOrder = this.allOrders.length;
        if (this.allOrders.length > 0) {
          this.msg = '';
          for (let i = 0; i < this.allOrders.length; i++) {
            this.totalPrice = this.totalPrice + this.allOrders[i].GrandTotal__c;
            this.totalAmt = '₹' + Number(this.totalPrice.toString()).toLocaleString('en-IN');
            if (this.allOrders[i].Status__c == this.op || this.allOrders[i].Status__c == this.oa 
              || this.allOrders[i].Status__c == this.ord || 
              this.allOrders[i].Status__c == this.oup || this.allOrders[i].Status__c == this.pic
              || this.allOrders[i].Status__c == this.appending) {
              this.totalPendingOrders.push(this.allOrders[i]);
              this.pendingOrder = this.totalPendingOrders.length;
            }
            this.tAllOrder = (this.pendingOrder/ this.totalOrder);
          }
          for (let i = 0; i < this.totalPendingOrders.length; i++) {
            this.pendingOrderPrice = this.pendingOrderPrice + this.totalPendingOrders[i].GrandTotal__c;
            this.pendingAmt = '₹' + Number(this.pendingOrderPrice.toString()).toLocaleString('en-IN');
            this.tPendingOrder = (this.pendingOrderPrice / this.totalPrice);
          }
        } else {
          this.msg = 'No Record Available';
          this.tPendingOrder = 0;
          this.tAllOrder = 0;
          this.totalPrice = 0;
          this.pendingOrder = 0;
        }
        if (this.pendingItemOrderList.length > 0) {
          for (let j = 0; j< this.pendingItemOrderList.length; j++) {
            if (this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.op ||
              this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.oa ||
              this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.ord ||
              this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.oup ||
              this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.pic ||
               this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.appending) {
                 this.totalPendingItemWise.push(this.pendingItemOrderList[j]);
                 this.pendingItemLength = this.totalPendingItemWise.length;
                 this.tItemWise =  (this.pendingItemLength / this.totalPendingWise) ;
            }
          }

        } else {
          this.tItemWise = 0;
          this.pendingItemLength = 0;
          this.totalPendingWise = 0;
        }
        this.hideLoader();
      }
    });

    }
  }

  getNewOrderList() {
      this.showLoader();
      const value = this.tokenVal;
      this.allOrders = [];
      this.pendingItemOrderList = [];
      this.totalPendingOrders = [];
      this.totalPendingItemWise = [];
      this.totalPendingOrders = [];
      this.totalOrder = 0;
      this.tPendingOrder = 0;
      this.tAllOrder = 0;
      this.totalPrice = 0;
      this.pendingOrder = 0;
      this.tItemWise = 0;
      this.pendingItemLength = 0;
      this.pendingAmt = 0;
      this.tPendingOrder = 0;
      this.totalAmt = 0;
      this.pendingOrderPrice = 0;
      this.totalPendingWise = 0;
      this.tItemWise = 0
      const obj = {erp: this.erpData, token: value};
      this.homeService.getAllHomeRecords(obj).subscribe((data: any) => {
          this.allOrders = data.Orders;
          this.accountInfo = data.Accounts;
          this.pendingItemOrderList = data.PendingOrdersItemWise;
          this.totalPendingWise = this.pendingItemOrderList.length;
          this.totalOrder = this.allOrders.length;
          if (this.allOrders.length > 0) {
            this.msg = '';
            for (let i = 0; i < this.allOrders.length; i++) {
              this.totalPrice = this.totalPrice + this.allOrders[i].GrandTotal__c;
              this.totalAmt = '₹' + Number(this.totalPrice.toString()).toLocaleString('en-IN');
              if (this.allOrders[i].Status__c == this.op || this.allOrders[i].Status__c == this.oa 
                || this.allOrders[i].Status__c == this.ord || 
                this.allOrders[i].Status__c == this.oup || this.allOrders[i].Status__c == this.pic
                || this.allOrders[i].Status__c == this.appending) {
                this.totalPendingOrders.push(this.allOrders[i]);
                this.pendingOrder = this.totalPendingOrders.length;
              }
              this.tAllOrder = (this.pendingOrder/ this.totalOrder);
            }
            for (let i = 0; i < this.totalPendingOrders.length; i++) {
              this.pendingOrderPrice = this.pendingOrderPrice + this.totalPendingOrders[i].GrandTotal__c;
              this.pendingAmt = '₹' + Number(this.pendingOrderPrice.toString()).toLocaleString('en-IN');
              this.tPendingOrder = (this.pendingOrderPrice / this.totalPrice);
            }
          } else {
            this.msg = 'No Record Available';
            this.tPendingOrder = 0;
            this.tAllOrder = 0;
            this.totalPrice = 0;
            this.pendingOrder = 0;
          }
          if (this.pendingItemOrderList.length > 0) {
            for (let j = 0; j< this.pendingItemOrderList.length; j++) {
              if (this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.op ||
                this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.oa ||
                this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.ord ||
                this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.oup ||
                this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.pic ||
                 this.pendingItemOrderList[j].FMI_OrderId__r.Status__c == this.appending) {
                   this.totalPendingItemWise.push(this.pendingItemOrderList[j]);
                   this.pendingItemLength = this.totalPendingItemWise.length;
                   this.tItemWise =  (this.pendingItemLength / this.totalPendingWise) ;
              }
            }
  
          } else {
            this.tItemWise = 0;
            this.pendingItemLength = 0;
            this.totalPendingWise = 0;
          }
          this.hideLoader();
      });

  }

  allOrder(activeTab){
    this.activeTab = activeTab;
    this.all_order = true;
    this.create_order = false;
    this.pending_order = false;
    this.pending_order_wise = false;
  }

  pendingOrders(activeTab) {
    this.activeTab = activeTab;
    this.all_order = false;
    this.create_order = false;
    this.pending_order = true;
    this.pending_order_wise = false;
  }

  createOrder(activeTab) {
    this.activeTab = activeTab;
    this.all_order = false;
    this.create_order = true;
    this.pending_order = false;
    this.pending_order_wise = false;
  }

  pendingOrderItemWise(activeTab) {
    this.activeTab = activeTab;
    this.all_order = false;
    this.create_order = false;
    this.pending_order = false;
    this.pending_order_wise = true;
  }

  getCreatedOrder(val) {
     this.newOrder = val;
     this.create_order = false;
     this.allOrder('allorders');
     this.getNewOrderList();
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.salesOrder = window.history.state.data;
    this.erpData = sessionStorage.getItem('erpId');

    if (this.salesOrder == 'Sales Order Created') {
      this.newSales = true;
    }
    setTimeout(() => {
      this.showLoader();
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      if (userData) {
        this.hideLoader();
        this.getUserRecord();
      }
    }, 3000);
  }

}
