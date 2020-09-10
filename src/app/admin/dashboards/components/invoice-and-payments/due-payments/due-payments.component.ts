import { AuthTokenService } from './../../../services/auth-token.service';
import { OrderDialogComponent } from './../../../dialogs/order-dialog/order-dialog.component';
import { InvoiceDialogComponent } from './../../../dialogs/invoice-dialog/invoice-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { IPayments } from './../../../models/iPayments';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-due-payments',
  templateUrl: './due-payments.component.html',
  styleUrls: ['./due-payments.component.scss']
})
export class DuePaymentsComponent implements OnInit {

  displayedColumns = ['Buyer_PO_Number__c',
  'PO_Date__c',
  'Name',
  'Invoice_Date__c',
  'Amount',
  'Balance',
  'Due_Date__c',
  'Payment_Status__c',
  'OrderName',
  'LastName',
  'LastModifiedDate',
 ];
  dataSource: MatTableDataSource<IPayments>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public invoiceData: IPayments[] = [];
  public duePaymentData: IPayments[] = [];
  public paymentList: IPayments[] = [];

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: AuthTokenService) { }

  getAllPaymentRecords() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
          this.invoiceData = data.homeRecord.Invoices;
          for(let i=0; i< this.invoiceData.length; i++) {
              if (this.invoiceData[i].Balance__c != 0) {
                this.duePaymentData.push(this.invoiceData[i]);
              }
          }

          this.paymentList = this.duePaymentData;
          for (const item of this.paymentList) {
                const amount = '₹' + Number((item.Amount__c).toString()).toLocaleString('en-IN');
                const balance = '₹' + Number((item.Balance__c).toString()).toLocaleString('en-IN');
                item.LastName = item.LastModifiedBy ? item.LastModifiedBy.Name : '';
                item.OrderName = item.FMI_OrderId__r ? item.FMI_OrderId__r.Name : '';
                item.Amount = amount; 
                item.Balance = balance;
              }
          this.dataSource = new MatTableDataSource(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
    });
  }

  openInvoiceDialog(val) {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
    
   });
 }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.getAllPaymentRecords();
  }


}
