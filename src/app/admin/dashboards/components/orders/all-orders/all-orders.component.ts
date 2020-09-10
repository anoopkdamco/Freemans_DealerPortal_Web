import { IOrders } from './../../../models/iOrders';
import { OrderDialogComponent } from './../../../dialogs/order-dialog/order-dialog.component';
import { AuthTokenService } from './../../../services/auth-token.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IOrderData } from './../../../models/iOrderData';

import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { Orders } from '../../../models/orders';
import {MatDialog} from '@angular/material/dialog';
import { VERSION, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  public infoForm: FormGroup;
  public orderData: Array<any> = [];
  public allOrders: IOrders[] = [];
  public totalOrder: number;
  public pendingOrder: number;
  public totalPrice: number;
  public pendingPrice: number;
  displayedColumns = ['Name',
    'Buyer_PO_Number__c',
    'Buyer_PO_Date__c',
    'GTotal',
    'Status__c',
    'Age__c',
    'LastModifiedBy.Name',
    'LastModifiedDate',
   ];
  dataSource: MatTableDataSource<IOrderData>;
  public orders: IOrders[] = [];
  public pendingOrders: IOrders[] = [];
  @Input() allOrdersRecord: IOrders[] = [];
  public recievedRecord: IOrders[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  date = new FormControl(new Date());

  constructor(private store: Store<AppState>, public dialog: MatDialog, fb: FormBuilder, private authService: AuthTokenService) {
    this.infoForm = fb.group({
      buyerDate: this.date
    });
   }

   openDialog(val) {
     const dialogRef = this.dialog.open(OrderDialogComponent, {width: '1000px', data: val});

     dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getOrderData() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading === 'Home_Records_Success') {
        this.orderData = data.homeRecord.Orders;
        this.orders = this.orderData;
        this.allOrders = data.homeRecord.Orders;
        for (const item of this.orders) {
          const total = '₹' + Number((item.GrandTotal__c).toString()).toLocaleString('en-IN');
          item.GTotal = total;
        }
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.recievedRecord = this.allOrdersRecord;
    for (const item of this.recievedRecord) {
      const total = '₹' + Number((item.GrandTotal__c).toString()).toLocaleString('en-IN');
      item.GTotal = total;
    }
    this.dataSource = new MatTableDataSource(this.recievedRecord);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

