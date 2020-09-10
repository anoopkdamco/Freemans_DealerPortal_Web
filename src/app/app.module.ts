import { UserRegistrationComponent } from './authentication/user-registration/user-registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { RatingModule } from 'ng-starrating';
import { SalesforceHashLocationStrategyService } from './salesforce-hash-location-strategy.service';
import { MaterialModule } from './material.module';
import { HomeEffects } from './ngrx/effects/home.effects';
import { reducers, metaReducers } from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { LocationStrategy } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';





@NgModule({
  declarations: [AppComponent, LoginComponent, UserRegistrationComponent, ForgotPasswordComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbRatingModule,
    AngularFontAwesomeModule
   
    // StoreModule.forRoot({reducers, homeState: homeReducer}, {metaReducers}),
    // StoreDevtoolsModule.instrument({
    //   name: "Freemans",
    //   maxAge: 25,
    // }),
    // EffectsModule.forRoot([HomeEffects]),
  ],
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
               { provide: LocationStrategy, useClass: SalesforceHashLocationStrategyService }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
