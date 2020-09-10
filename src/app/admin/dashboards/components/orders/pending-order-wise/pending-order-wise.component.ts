import { OrderDialogComponent } from './../../../dialogs/order-dialog/order-dialog.component';
import { IOrderItemWise } from './../../../models/iOrderItemWise';
import { OrderLineDialogComponent } from './../../../dialogs/order-line-dialog/order-line-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IOrderData } from './../../../models/iOrderData';
import { Orders } from './../../../models/orders';
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { VERSION, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pending-order-wise',
  templateUrl: './pending-order-wise.component.html',
  styleUrls: ['./pending-order-wise.component.scss']
})
export class PendingOrderWiseComponent implements OnInit {
  @Input() allOrders: IOrderItemWise[] = [];
  public orderData: Array<any> = [];
  displayedColumns = [
    'DP_OrderNO__c',
    'Name',
    'DP_Buyer_PO_Date__c',
    'DP_Product_Code__c',
    'DP_Product_Name__c',
    'Quantity__c',
    'DP_Age__c',
    'UnitPrice__c',
    'Discount__c',
 ];
  dataSource: MatTableDataSource<IOrderItemWise>;
  public orders: IOrderData[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(val) {
    const dialogRef = this.dialog.open(OrderLineDialogComponent, {data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }

 openOrderDialog(val) {
  const dialogRef = this.dialog.open(OrderDialogComponent, {width: '1000px', data: val});

  dialogRef.afterClosed().subscribe(result => {
 });
}


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.allOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}


@Component({
  selector: 'pending-order-itemwise-content-dialog',
  templateUrl: 'pending-order-itemwise-content-dialog.html',
})

export class PendingOrderItemwiseContentDialog  {
  public infoForm: FormGroup;
  public orderNo: string;
  date = new FormControl(new Date());
  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<PendingOrderItemwiseContentDialog>) {
                console.log(data);
                this.orderNo = data.Name;
                this.infoForm = fb.group({
                buyerDate: [data.Buyer_PO_Date__c],
                buyerPo: [data.Buyer_PO_Number__c],
                order: [data.Name],
                originalOrder: [''],
                totalPrice: [data.TotalPrice__c],
                totalGst: [data.TotalGST__c],
                owner: [data.LastModifiedBy.Name],
                description: [''],
                grandTotal: [data.GrandTotal__c],
                billingCity: [data.BillingCity__c],
                billingState: [data.BillingState__c],
                billingCountry: [data.BillingCountry__c],
                billingZip: [data.BillingPostalCode__c],
                billingStreet: [data.BillingStreet__c],
                shippingCity: [data.ShippingCity__c],
                shippingState: [data.ShippingState__c],
                shippingCountry: [data.ShippingCountry__c],
                shippingZip: [data.ShippingPostalCode__c],
                shippingStreet: [data.ShippingStreet__c],
                invoiceTracking: [data. Invoice_Courier_Tracking_No__c],
                invoiceUrl: [data.Invoice_Courier_Tracking_URL__c],
                lrTracking: [data.LR_Courier_Tracking_No__c],
                lrUrl: [data.LR_Courier_Tracking_URL__c]
              });
  }
}
