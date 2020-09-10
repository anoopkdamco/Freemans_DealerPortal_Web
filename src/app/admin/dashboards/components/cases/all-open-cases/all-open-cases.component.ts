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
  selector: 'app-all-open-cases',
  templateUrl: './all-open-cases.component.html',
  styleUrls: ['./all-open-cases.component.scss']
})
export class AllOpenCasesComponent implements OnInit {
  public allClosedCases: ICase[] = [];
  public allCases: ICase[] = [];
  public allOpenCases: ICase[] = [];
  @Input() casesRecords: ICase[] = [];
  public allOpenCase: ICase[] = [];
  dataSource: MatTableDataSource<ICase>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns = ['CaseNumber',
    'CreatedDate',
    'Type',
    'Status',
    'Age__c',
    'LastModifiedBy.Name',
    'LastModifiedDate',
   ];

  constructor(private store: Store<AppState>, public dialog: MatDialog, private authService: AuthTokenService) { }
  getAllCases() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading == 'Home_Records_Success') {
        this.allCases = data.homeRecord.Cases;
        for(let i = 0; i< this.allCases.length; i++) {
          const closeUR = 'Closed - Unresolved';
          const closeR = 'Closed - Resolved';
          if ((this.allCases[i].Status == closeR) ||  (this.allCases[i].Status == closeUR)) {
            this.allClosedCases.push(this.allCases[i]);
          } else {
            this.allOpenCases.push(this.allCases[i]);
            this.dataSource = new MatTableDataSource(this.allOpenCases);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      }
    });
  }

  openCasesDialog(val) {
    const dialogRef = this.dialog.open(CasesDialogComponent, {width: '900px', data: val});

    dialogRef.afterClosed().subscribe(result => {
   });
 }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.allCases = this.casesRecords;
    for(let i = 0; i< this.allCases.length; i++) {
          const closeUR = 'Closed - Unresolved';
          const closeR = 'Closed - Resolved';
          if ((this.allCases[i].Status == closeR) ||  (this.allCases[i].Status == closeUR)) {
            this.allClosedCases.push(this.allCases[i]);
          } else {
            this.allOpenCases.push(this.allCases[i]);
            this.dataSource = new MatTableDataSource(this.allOpenCases);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
  }

}













