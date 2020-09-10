import { MatPaginator } from '@angular/material/paginator';
import { IRelatedInvoices } from './../../../models/iRelatedInvoices';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  @Input() orderInvoive: any;
  public invoiceRelatedData: IRelatedInvoices[] = [];
  displayInvoiceColumn = [
  'Name',
  'Invoice_Date__c',
  'Amount__c',
  'Balance__c',
  'Due_Date__c',
  'Posting_Date__c',
  'Payment_Duration_Days__c'
 ];
  invoiceDataSource: MatTableDataSource<IRelatedInvoices>;
  public loading: boolean;
  public message: string;

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }
  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.showLoader();
    setTimeout(() => {
      this.invoiceRelatedData = this.orderInvoive;
      if (this.invoiceRelatedData.length != 0) {
        this.message = '';
        this.invoiceDataSource = new MatTableDataSource(this.invoiceRelatedData);
        this.invoiceDataSource.paginator = this.paginator;
        this.invoiceDataSource.sort = this.sort;
      } else {
        this.message = 'No Record Avaialble';
      }
      this.hideLoader();
      }, 5000);
  }

}
