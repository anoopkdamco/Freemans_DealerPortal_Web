import { UserAuthService } from './../user-auth.service';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public submitted: boolean;
  public erpCode;
  public loginType;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar, 
              private logUser: UserAuthService) {
    this.submitted = false;
   }

  loginFn() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else if (this.loginForm.valid) {
      const userName = this.loginForm.controls.userName.value;
      const password = this.loginForm.controls.password.value;
     // this.soapCall(userName, password);
      this.userLogin(userName, password);
    }

  }
  
  userLogin(user, pass) {
    const payload = {
      username: user,
      password: pass
    };
    this.logUser.loginUser(payload).subscribe((resp) => {
        const result = resp.Body.IsAccountExistResponse.IsAccountExistResult;
        if (result == 'login failed') {
                  this.openSnackBar('Your User Name or Password are incorrect ', 'OK');
                } else {
                  const obj = result.slice(1, result.length - 1);
                  const brk = obj.search(',');
                  const compErp = obj.slice(0, brk);
                  const erpSearch = compErp.search(':');
                  this.erpCode = compErp.slice(erpSearch + 1, compErp.length);
                  const compType = obj.slice(brk + 1, obj.length);
                  const typeSearch = compType.search(':');
                  this.loginType = compType.slice(typeSearch + 1, compType.length);
                  if (this.loginType == 'old') {
                    sessionStorage.setItem('erpId', this.erpCode);
                    this.router.navigate(['/freemans/dashboard/home']);
                  } else if (this.loginType == 'new') {
                    this.router.navigate(['/forgot-password'], {state: {data: {erp: this.erpCode, type: this.loginType}}});
                  }

        }
    }, err => {
      this.openSnackBar('Something went wrong. Contact your Administrator', 'OK');
    });

  }

  soapCall(user, pass) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://fmiworld.in/FMI.asmx', true);
    const admin = user;
    const pwd = pass;
    // The following variable contains the xml SOAP request.
    const sr =
        `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <IsAccountExist xmlns="http://fmiworld.in//">
              <UserName>`+ admin +`</UserName>
              <Password>`+ pwd +`</Password>
            </IsAccountExist>
          </soap:Body>
        </soap:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                const xml = xmlhttp.responseXML;
                const result = xml.getElementsByTagName('IsAccountExistResult')[0].innerHTML;
                if (result == 'login failed') {
                  this.openSnackBar('Your User Name or Password are incorrect ', 'OK');
                } else {
                  const obj = result.slice(1, result.length - 1);
                  const brk = obj.search(',');
                  const compErp = obj.slice(0, brk);
                  const erpSearch = compErp.search(':');
                  this.erpCode = compErp.slice(erpSearch + 1, compErp.length);
                  const compType = obj.slice(brk + 1, obj.length);
                  const typeSearch = compType.search(':');
                  this.loginType = compType.slice(typeSearch + 1, compType.length);
                  if (this.loginType == 'old') {
                    sessionStorage.setItem('erpId', this.erpCode);
                    this.router.navigate(['/freemans/dashboard/home']);
                  } else if (this.loginType == 'new') {
                    this.router.navigate(['/forgot-password'], {state: {data: {erp: this.erpCode, type: this.loginType}}});
                  }

                }
            }
        }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(sr);
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

  ngOnInit() {
    this.loginFn();
  }

}
