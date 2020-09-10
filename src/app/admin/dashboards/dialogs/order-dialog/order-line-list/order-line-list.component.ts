import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRelatedOrders } from './../../../models/iRelatedOrders';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-order-line-list',
  templateUrl: './order-line-list.component.html',
  styleUrls: ['./order-line-list.component.scss']
})
export class OrderLineListComponent implements OnInit {
  @Input() orderRelatedData: any;
  public orderRelatedDataVal: IRelatedOrders[] = [];
  dataSource: MatTableDataSource<IRelatedOrders>;
  public message: string;
  displayedColumns = ['Name',
  'FMI_Product__r.Name',
    'Quantity__c',
    'UnitPrice',
    'TotalDis',
    'PriceDis',
    'TotalGST',
    'TotalPrice',
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
    this.orderRelatedDataVal = this.orderRelatedData;
    if (this.orderRelatedDataVal.length != 0) {
      this.message = '';
      for (const item of this.orderRelatedData) {
        const priceDis = '₹' + Number((item.PriceAfterDiscount__c).toString()).toLocaleString('en-IN');
        const totalGst = '₹' + Number((item.TotalGST__c).toString()).toLocaleString('en-IN');
        const totalPrice = '₹' + Number((item.TotalPrice__c).toString()).toLocaleString('en-IN');
        const totalDis = '₹' + Number((item.Total_Discount__c).toString()).toLocaleString('en-IN');
        const unitPrice = '₹' + Number((item.UnitPrice__c).toString()).toLocaleString('en-IN');
        item.PriceDis = priceDis;
        item.TotalGST = totalGst;
        item.TotalPrice = totalPrice;
        item.TotalDis = totalDis;
        item.UnitPrice = unitPrice;
      }
      this.dataSource = new MatTableDataSource(this.orderRelatedDataVal);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     } else {
      this.message = 'No Record Available';
     }
    this.hideLoader();
    }, 5000);
  }

}
