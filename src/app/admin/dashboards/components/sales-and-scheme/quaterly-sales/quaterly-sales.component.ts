import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthTokenService } from './../../../services/auth-token.service';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { ISales } from './../../../models/iSales';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-quaterly-sales',
  templateUrl: './quaterly-sales.component.html',
  styleUrls: ['./quaterly-sales.component.scss']
})
export class QuaterlySalesComponent implements OnInit {

  public annualSalesList: ISales[] = [];
  public quaterlySalesList: ISales[] = [];
  dataSource: MatTableDataSource<ISales>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['Fiscal_Year__c',
    'Quarter__c',
    'Total_Target',
    'Total_Amount',
    'Target_Achieved__c',
    'Total_Order__c'
   ];

  constructor(private store: Store<AppState>, private authService: AuthTokenService) { }

  getQuaterlySalesData() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.annualSalesList = data.homeRecord.AnnualSalesPerformance;
        this.quaterlySalesList = data.homeRecord.QuarterlyyearSalesPerformance;
        for (const item of this.quaterlySalesList) {
          const qTarget = '₹' + Number((item.Total_Targeted_Amount__c).toString()).toLocaleString('en-IN');
          const aTarget = '₹' + Number((item.Total_Closed_Won__c).toString()).toLocaleString('en-IN');
          item.Total_Target = qTarget; 
          item.Total_Amount = aTarget;
        }
        this.dataSource = new MatTableDataSource(this.quaterlySalesList);
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
    this.getQuaterlySalesData();
  }

}
