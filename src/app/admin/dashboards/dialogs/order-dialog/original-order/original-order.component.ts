import { MatPaginator } from '@angular/material/paginator';
import { IOriginalOrder } from './../../../models/iOriginalOrder';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-original-order',
  templateUrl: './original-order.component.html',
  styleUrls: ['./original-order.component.scss']
})
export class OriginalOrderComponent implements OnInit {
  @Input() originalOrders: any;
  public originalData: IOriginalOrder[] = [];

  dataSource: MatTableDataSource<IOriginalOrder>;
  public message: string;
  displayOriginalOrder = [
    'Name',
    'Buyer_PO_Date__c',
    'Id',
    'TotalPrice__c',
    'TotalGST__c',
    'GrandTotal__c'
  ];
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

  public loading: boolean;
  constructor() {
   
   }
  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }


  ngOnInit() {
    this.showLoader();
    setTimeout(() => {
      this.originalData = this.originalOrders;
      if (this.originalData.length != 0) {
          this.message = '';
          for (const obj of this.originalData) {
            const totalGst = '₹' + Number((obj.TotalGST__c).toString()).toLocaleString('en-IN');
            const totalPrice = '₹' + Number((obj.TotalPrice__c).toString()).toLocaleString('en-IN');
            const grandTotal = '₹' + Number((obj.GrandTotal__c).toString()).toLocaleString('en-IN');
            obj.TotalGST__c = totalGst;
            obj.TotalPrice__c = totalPrice;
            obj.GrandTotal__c = grandTotal;
          }
          this.dataSource = new MatTableDataSource(this.originalData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }  else {
        this.message = 'No Record Available';
       }
      this.hideLoader();
    });
  }

}
