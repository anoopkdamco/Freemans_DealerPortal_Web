import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { IOrders } from './../../../models/iOrders';
import { OrderDialogComponent } from './../../../dialogs/order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IOrderData } from './../../../models/iOrderData';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';import { Orders } from '../../../models/orders';
import { VERSION, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  @Input() allOrdersRecord: IOrders[] = [];
  public recievedRecord: IOrders[] = [];
  public allOrder: IOrders[] = [];
  public totalOrder: number;
  public pendingOrder: number;
  public totalPrice: number = 0.0;
  public pendingPrice: number = 0.0;
  public totalPendingOrders: IOrders[] = [];
  public orderData: Array<any> = [];
  public pendingOrderPrice: number = 0.0;
  public op = 'Order Placed';
  public oa = 'Order Approved';
  public pic = 'PI Confirmed';
  public appending = 'Advance Payment Pending';
  public oup = 'Order Under Production';
  public ord = 'Order Ready for Dispatch';
  displayedColumns = ['Name',
  'Buyer_PO_Number__c',
  'Buyer_PO_Date__c',
  'GTotal',
  'Status__c',
  'Age__c',
  'LastModifiedBy.Name',
  'LastModifiedDate',
 ];
  dataSource: MatTableDataSource<IOrders>;
  public orders: IOrderData[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private store: Store<AppState>) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(val) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {width: '1000px', data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }

  ngOnInit() {

    this.allOrder = this.allOrdersRecord;
    for (let i = 0; i < this.allOrder.length; i++) {
      if (this.allOrder[i].Status__c == this.op || this.allOrder[i].Status__c == this.oa || this.allOrder[i].Status__c == this.ord || 
        this.allOrder[i].Status__c == this.oup || this.allOrder[i].Status__c == this.pic
        || this.allOrder[i].Status__c == this.appending) {
        this.totalPendingOrders.push(this.allOrder[i]);
        for (const item of this.totalPendingOrders) {
          const total = '₹' + Number((item.GrandTotal__c).toString()).toLocaleString('en-IN');
          item.GTotal = total;
        }
        this.pendingOrder = this.totalPendingOrders.length;
        this.dataSource = new MatTableDataSource(this.totalPendingOrders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

}



