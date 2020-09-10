import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';
import { IAccount } from './../../../dashboards/models/iAccount';
import { AuthTokenService } from './../../../dashboards/services/auth-token.service';
import { HomeService } from './../../../dashboards/services/home.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Store, select } from '@ngrx/store';
import * as homeActions from '../../../../ngrx/actions/home.actions';
import { AppState } from './../../../../models/appState';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  public activeMenu = '';
  public accessToken: string;
  public loading: boolean;
  public accountInfo: IAccount;
  public accountId: string;
  public erpData;
  public dataVal: boolean;

  constructor(private layoutService: LayoutService, private homeService: HomeService, private aToken: AuthTokenService,
              private store: Store<AppState>, public snackBar: MatSnackBar, private router: Router) {
                this.loading = false;
                this.dataVal = false;
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return snackBarRef;
  }

  getUserRecord(value) {
    const obj = {erp: this.erpData, token: value};
    this.store.dispatch(new homeActions.LoadDashboardAction(obj));
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      this.showLoader();
      if (data.objectLoading === 'Home_Records_Success') {
       if (data.homeRecord.TheRecordStatus == 'No Data Found') {
        this.dataVal = false;
        this.hideLoader();
       } else if (data.homeRecord.TheRecordStatus == "") {
          this.dataVal = true;
          this.accountInfo = data.homeRecord.Accounts ? data.homeRecord.Accounts : '';
          this.accountId = this.accountInfo.Id ? this.accountInfo.Id : '';
          this.hideLoader();
         }
      }
    });
  }

  getAuthData() {
    this.homeService.getAuthData().subscribe((resp) => {
      this.accessToken = resp.access_token;
      this.aToken.setUserData(this.accessToken);
      if (this.accessToken) {
        this.getUserRecord(this.accessToken);
      }
    });
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  ngOnInit() {
    this.erpData = sessionStorage.getItem('erpId');
    if (this.erpData != undefined) {
      this.getAuthData();
    } else {
      this.router.navigate(['/login']);
    }
  }

  openItem(item: string) {
    if (this.activeMenu === item) {
      this.activeMenu = '';
    } else {
      this.activeMenu = item;
    }
  }

  getSignOut() {
    window.sessionStorage.clear();
    window.location.href = 'https://www.freemansgroup.com/';
  }

  toggleSmallMenu() {
    this.layoutService.toggleLeftBar();
  }
}
