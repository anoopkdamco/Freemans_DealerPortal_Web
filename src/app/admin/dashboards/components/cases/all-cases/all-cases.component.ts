import { AuthTokenService } from './../../../services/auth-token.service';
import { MatDialog } from '@angular/material/dialog';
import { CasesDialogComponent } from './../../../dialogs/cases-dialog/cases-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from './../../../../../models/appState';
import { Store } from '@ngrx/store';
import { ICase } from './../../../models/iCase';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.scss']
})
export class AllCasesComponent implements OnInit {
  @Input() casesRecords: ICase[] = [];
  public allCases: ICase[] = [];
  dataSource: MatTableDataSource<ICase>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns = ['CaseNumber',
    'CreatedDate',
    'Type',
    'Status',
    'ClosedDate',
    'Age__c',
    'Rating__c',
    'LastModifiedBy.Name',
    'LastModifiedDate',
   ];

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: AuthTokenService) { }
  getAllCases() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.allCases = data.homeRecord.Cases;
        this.dataSource = new MatTableDataSource(this.allCases);
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

  openCasesDialog(val) {
    const dialogRef = this.dialog.open(CasesDialogComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }

  ngOnInit() {
    this.allCases = this.casesRecords;
    this.dataSource = new MatTableDataSource(this.allCases);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
