import { AuthTokenService } from './../../../services/auth-token.service';
import { OrderDialogComponent } from './../../../dialogs/order-dialog/order-dialog.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { IPayments } from './../../../models/iPayments';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort } from '@angular/material';
import { VERSION, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { InvoiceDialogComponent } from '../../../dialogs/invoice-dialog/invoice-dialog.component';


@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
})
export class AllInvoiceComponent implements OnInit {

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: AuthTokenService) { }

  displayedColumns = ['Buyer_PO_Number__c',
    'PO_Date__c',
    'Name',
    'Invoice_Date__c',
    'Amount',
    'Balance',
    'Due_Date__c',
    'Payment_Status__c',
    'LastModifiedDate',
    'LastName',
    'OrderName'
   ];


  dataSource: MatTableDataSource<IPayments>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public invoiceData: IPayments[] = [];

  getAllPaymentRecords() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
          this.invoiceData = data.homeRecord.Invoices;
          if(this.invoiceData) {
            for (const item of this.invoiceData) {
              const amount = '₹' + Number((item.Amount__c).toString()).toLocaleString('en-IN');
              const balance = '₹' + Number((item.Balance__c).toString()).toLocaleString('en-IN');
              item.LastName = item.LastModifiedBy ? item.LastModifiedBy.Name : '';
              item.OrderName = item.FMI_OrderId__r ? item.FMI_OrderId__r.Name : '';
              item.Amount = amount;
              item.Balance = balance;
            }
            this.dataSource = new MatTableDataSource(this.invoiceData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openInvoiceDialog(val) {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }

 openOrderDialog(val) {
  const dialogRef = this.dialog.open(OrderDialogComponent, {data: val});

  dialogRef.afterClosed().subscribe(result => {
 });
}

  ngOnInit() {
    this.getAllPaymentRecords();
  }

}


