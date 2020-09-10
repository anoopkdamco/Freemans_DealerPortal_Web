import { ISales } from './../../../models/iSales';
import { AuthTokenService } from './../../../services/auth-token.service';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-annual-sales',
  templateUrl: './annual-sales.component.html',
  styleUrls: ['./annual-sales.component.scss']
})
export class AnnualSalesComponent implements OnInit {
  public annualSalesList: ISales[] = [];
  public historicalSalesList: ISales[] = [];
  dataSource: MatTableDataSource<ISales>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['Fiscal_Year__c',
  'Total_Target',
  'Total_Amount',
  'March__c',
  'Total_Order__c'
 ];

  constructor(private store: Store<AppState>, private authService: AuthTokenService) { }

  getSalesData() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.annualSalesList = data.homeRecord.AnnualSalesPerformance;
        this.historicalSalesList = data.homeRecord.HistoricalSalesPerformance;
        for (const item of this.annualSalesList) {
          const annTarget = '₹' + Number((item.Total_Targeted_Amount__c).toString()).toLocaleString('en-IN');
          const totalTarget = '₹' + Number((item.Total_Closed_Won__c).toString()).toLocaleString('en-IN');
          item.Total_Target = annTarget; 
          item.Total_Amount = totalTarget;
        }
        this.dataSource = new MatTableDataSource(this.annualSalesList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.getSalesData();
  }

}
