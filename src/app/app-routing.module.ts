import { UserRegistrationComponent } from './authentication/user-registration/user-registration.component';
import { LoginComponent } from './authentication/login/login.component';

import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: UserRegistrationComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'freemans', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) , MaterialModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
