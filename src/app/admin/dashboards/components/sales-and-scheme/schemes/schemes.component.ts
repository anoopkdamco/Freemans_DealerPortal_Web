import { AuthTokenService } from './../../../services/auth-token.service';
import { SchemeDetailsComponent } from './../../../dialogs/scheme-details/scheme-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { IScheme } from './../../../models/iScheme';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.scss']
})
export class SchemesComponent implements OnInit {
  public schemeList: IScheme[] = [];
  dataSource: MatTableDataSource<IScheme>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['Scheme__r.Name',
    'Scheme__r.Title__c',
    'Scheme_Start_Date__c',
    'Scheme_End_Date__c',
    'Buyer_PO_Date__c',
    'DP_Order__c',
    'Total_Items__c',
    'Total_Amt',
    'slab',
    'Amazon_Voucher_Credit_Note_number__c'
   ];

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: AuthTokenService) { }

  getSchemeData() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.schemeList = data.homeRecord.SchemeOrders;
        for (const item of this.schemeList) {
          const qTarget = '₹' + Number((item.Total_Amount__c).toString()).toLocaleString('en-IN');
          item.Total_Amt = qTarget;
        }
        this.dataSource = new MatTableDataSource(this.schemeList);
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

  openDialog(val) {
    const dialogRef = this.dialog.open(SchemeDetailsComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }


  ngOnInit() {
    this.getSchemeData();
  }

}
