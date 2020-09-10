import { AppState } from './../../../../models/appState';
import { Store } from '@ngrx/store';
import { IAccount } from './../../models/iAccount';
import { HomeService } from './../../services/home.service';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar} from '@angular/material';
import { AuthTokenService } from './../../services/auth-token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  public tokenVal: string;
  public accountId: string;
  public loading: boolean;
  public save: boolean;
  public dataVal: boolean;
  public accountInfo: IAccount;
  constructor(private fb: FormBuilder, private authService: AuthTokenService, private service: HomeService,
              public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,  private store: Store<AppState>) {
                this.loading = false;
                this.save = false;
                this.dataVal = false;
               }

  createForm() {
    this.contactForm = this.fb.group({
      sub: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public showLoader(): void {
    this.loading = true;
  }

  public hideLoader(): void {
    this.loading = false;
  }

  saveRequest() {
    this.save = true;
    if (this.contactForm.invalid) {
      this.openSnackBar('Please fill the required field', 'OK');
      this.save = false;
    } else {
      const payLoad = {
        Subject: this.contactForm.controls.sub.value,
        Body: this.contactForm.controls.message.value,
        AccountId: this.accountId
      };
      this.service.saveContactInfo(payLoad, this.tokenVal).subscribe((resp) => {
        if (resp == 'success'){
          this.openSnackBar('Your request has been sent successfully', 'OK');
          this.router.navigate(['/freemans/dashboard/home']);
        } else if (resp == 'Something went wrong. Contact your Administrator') {
          this.openSnackBar('Something went wrong. Contact your Administrator', 'OK');
        }
      }, err => {
        this.openSnackBar('Something went wrong. Contact your Administrator, Please contact to Administration', 'OK');
        this.save = false;
      });
    }
  }

   // display messages from top of the page
   openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return snackBarRef;
  }

  getDetail() {
    this.store.select(state => (state.homeState))
    .subscribe((data: any) => {
      if (data.objectLoading === 'Home_Records_Success') {
       if (data.homeRecord == null) {
        this.dataVal = false;
       } else if (data.homeRecord != null) {
          this.dataVal = true;
          this.accountInfo = data.homeRecord.Accounts ? data.homeRecord.Accounts : '';
          this.accountId = this.accountInfo.Id ? this.accountInfo.Id : '';
         }
      }
    });
  }

  ngOnInit() { 
    this.accountId = history.state.data;
    setTimeout(() => {
      const userData = this.authService.getUserData();
      this.tokenVal = userData;
      this.showLoader();
      if (userData) {
        this.getDetail();
        this.hideLoader();
      }
    }, 3000);
    this.createForm();
  }

}
