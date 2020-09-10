import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    console.log(control);
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  signUp() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required, Validators.minLength(6), passwordMatchValidator('password')]]
    });
  }


  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else if (this.registerForm.valid) {
      this.router.navigate(['/login']);
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}


  ngOnInit() {
    this.signUp();
  }

}
