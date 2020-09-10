import { UserAuthService } from './../user-auth.service';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface SecurityQuestion {
  value: string;
  viewValue: string;
}

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public changePass: FormGroup;
  submitted = false;
  public pageInfo;
  public erpInfo;
  public typeInfo;

  questions: SecurityQuestion[] = [
    {value: 'What is your mothers maiden name ?', viewValue: 'What is your mothers maiden name ?'},
    {value: 'What is the name of your first pet ?', viewValue: 'What is the name of your first pet ?'},
    {value: 'What was your first car ?', viewValue: 'What was your first car ?'},
    {value: 'What elementary school did you attend ?', viewValue: 'What elementary school did you attend ?'},
    {value: 'What is the name of the town where you were born ?', viewValue: 'What is the name of the town where you were born ?'},
    {value: 'What was your first company Name ?', viewValue: 'What was your first company Name ?'},
    {value: 'My Born City ?', viewValue: 'My Born City ?'}
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar,  
              private logUser: UserAuthService) { }
  resetPassword() {
    this.resetPasswordForm = this.fb.group({
      userName: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('password')]],
      secQuestion: ['',  Validators.required],
      answer: ['', Validators.required]
    });
  }

  changePasswordForm() {
    this.changePass = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('password')]],
      secQuestion: ['',  Validators.required],
      answer: ['', Validators.required]
    });

  }

  get f() { return this.resetPasswordForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    } else if (this.resetPasswordForm.valid) {
      if (this.typeInfo == 'new') {
        this.changeSecurityQ(this.resetPasswordForm);
      }
    }
}

changeSecurityQ(val) {
  const payload = {
    ErpCode: this.erpInfo,
    username: this.resetPasswordForm.controls.userName.value,
    OldPassword: this.resetPasswordForm.controls.oldPassword.value,
    SecurityQuestion: this.resetPasswordForm.controls.secQuestion.value,
    SecurityAnswer: this.resetPasswordForm.controls.answer.value,
    NewPassword: this.resetPasswordForm.controls.password.value,
  };

  this.logUser.updateSecurityQuestion(payload).subscribe((resp) => {
    const result = resp.Body.UpdateSecurityQuestionResponse.UpdateSecurityQuestionResult;
    if (result == 'user not found') {
      this.openSnackBar('User Not Found ', 'OK');
    }  else if (result == 'success') {
      this.openSnackBar('Security Questions Updated Successfully', 'OK');
      this.router.navigate(['/login']);
    }

  });
}




get cf() { return this.changePass.controls; }
onSubmitChange() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.changePass.invalid) {
    return;
  } else if (this.changePass.valid) {
    if (this.typeInfo == 'reset') {
      this.resetPass(this.changePass);
    }
  }
}

resetPass(val) {
  const payload = {
     username: this.changePass.controls.userName.value,
     SecurityQuestion: this.changePass.controls.secQuestion.value,
     SecurityAnswer: this.changePass.controls.answer.value,
     NewPassword: this.changePass.controls.password.value
  };
  this.logUser.resetPassword(payload).subscribe((resp) => {
    const result = resp.Body.ChangePasswordResponse.ChangePasswordResult;
    if (result == 'user not found') {
      this.openSnackBar('User Not Found ', 'OK');
    } else if (result == 'success') {
      this.openSnackBar('Your Password Updated Successfully', 'OK');
      this.router.navigate(['/login']);
    }
  });
}


resetSecurityQuestion(user) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://fmiworld.in/FMI.asmx', true);
  const erpVal = this.erpInfo;
  const name = this.resetPasswordForm.controls.userName.value;
  const oldP = this.resetPasswordForm.controls.oldPassword.value;
  const secQ = this.resetPasswordForm.controls.secQuestion.value;
  const secAns = this.resetPasswordForm.controls.answer.value;
  const newP = this.resetPasswordForm.controls.password.value;
  // The following variable contains the xml SOAP request.
  const sr =
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <UpdateSecurityQuestion xmlns="http://fmiworld.in//">
          <ErpID>`+ erpVal +`</ErpID>
          <UserName>`+ name +`</UserName>
          <OldPassword>` + oldP +`</OldPassword>
          <SecurityQuestion>`+ secQ +`</SecurityQuestion>
          <SecurityAnswer>`+ secAns +`</SecurityAnswer>
          <NewPassword>`+ newP +`</NewPassword>
        </UpdateSecurityQuestion>
      </soap:Body>
    </soap:Envelope>`;

  xmlhttp.onreadystatechange =  () => {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              const xml = xmlhttp.responseXML;
              const result = xml.getElementsByTagName('UpdateSecurityQuestionResult')[0].innerHTML;
              if (result == 'user not found') {
                this.openSnackBar('User Not Found ', 'OK');
              }  else if (result == 'success') {
                this.openSnackBar('Security Questions Updated Successfully', 'OK');
                this.router.navigate(['/login']);
              }
          }
      }
  };
  // Send the POST request.
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.responseType = 'document';
  xmlhttp.send(sr);
}

changePassword(user) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://fmiworld.in/FMI.asmx', true);
  const name = this.changePass.controls.userName.value;
  const secQ = this.changePass.controls.secQuestion.value;
  const secAns = this.changePass.controls.answer.value;
  const newP = this.changePass.controls.password.value;

  // The following variable contains the xml SOAP request.
  const sr =
      `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ChangePassword xmlns="http://fmiworld.in//">
        <UserName>`+ name +`</UserName>
        <SecurityQuestion>`+ secQ +`</SecurityQuestion>
        <SecurityAnswer>`+ secAns +`</SecurityAnswer>
        <NewPassword>`+ newP +`</NewPassword>
        </ChangePassword>
      </soap:Body>
    </soap:Envelope>`;

  xmlhttp.onreadystatechange =  () => {
      if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              const xml = xmlhttp.responseXML;
              const result = xml.getElementsByTagName('ChangePasswordResult')[0].innerHTML;
              if (result == 'user not found') {
                this.openSnackBar('User Not Found ', 'OK');
              } else if (result == 'success') {
                this.openSnackBar('Your Password Updated Successfully', 'OK');
                this.router.navigate(['/login']);
              }
          }
      }
  };
  // Send the POST request.
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.responseType = 'document';
  xmlhttp.send(sr);
}

resetForm() {
  this.changePass.reset();
  this.router.navigate(['/login']);
}


goBack() {
  this.resetPasswordForm.reset();
  this.router.navigate(['/login']);
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
    this.pageInfo = window.history.state.data;
    if (this.pageInfo == undefined) {
      this.router.navigate(['/login']);
    } else if (this.pageInfo != undefined) {
      this.erpInfo = this.pageInfo.erp;
      this.typeInfo = this.pageInfo.type;
      if (this.typeInfo == 'new') {
        this.resetPassword();
      } else if(this.typeInfo == 'reset') {
        this.changePasswordForm();
      }
    }
  }
}
