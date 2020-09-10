import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { AuthToken } from './../models/authToken';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import jsonContents from '../../../../assets/home.json';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + '00D9D0000008hdN!AQMAQILk8yC609WbyizH1itFKdJ67e_DgEVGpWBfAUcK3U06b2eYEK7ckfYAiiMTuQmJ8ViGhtAF92pDnrwWxd58AbS7Bw9t'
  })
};


@Injectable({
  providedIn: 'root'
})

export class HomeService {
 // public baseUrl = '../../../../assets/home.json';
 public authData: Array<any> = [];
 public accessToken: string;
 public tokenData: string;
 public testUrl = `https://test.salesforce.com/services/oauth2/token`;
 opts = [];

 public baseUrl = 'https://freemansgroup.my.salesforce.com//services/apexrest';
 public authToken = 'https://freemansgroup.secure.force.com/dealers/services/apexrest/GetToken/';
 constructor(private http: HttpClient, private authService: AuthService,  public snackBar: MatSnackBar) {
      authService.getAuthData().subscribe((resp) => {
         this.accessToken = resp.access_token;
      });
 }

getAccessToken() {
  this.authService.getAuthData().subscribe((resp) => {
    this.accessToken = resp.access_token;
 });
}


getAllHomeRecords(payload): Observable<any> {
  this.tokenData = payload.token;
  const erpId = payload.erp;
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + this.tokenData
 });
 // ${erpId}
  return this.http.get<any>(`${this.baseUrl}/Account/${erpId}`,  { headers: reqHeader })
   .pipe(catchError(this.handleError));
 }

 getAuthData(): Observable<any> {
  return this.http.get<any>(`${this.authToken}`)
   .pipe(catchError(this.handleError));
 }

 getProductList(data): Observable<any>{
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + data
 });
  return this.http.get<any>(`${this.baseUrl}/Products`,  { headers: reqHeader })
   .pipe(catchError(this.handleError));
 }

 getProductData(val) {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + val
 });
  return this.opts.length ?
    of(this.opts) :
    this.http.get<any>(`${this.baseUrl}/Products`,  { headers: reqHeader }).pipe(tap(data => this.opts = data));
}

 getProductPrice(accountId: string, productId: string, acToken: string): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + acToken
  });
  return this.http.get<any>(`${this.baseUrl}/Product_Custom_Price?AccountId=${accountId}&&ProductId=${productId}`,  { headers: reqHeader });
 }

 saveOrderInfo(payload, token): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + token
  });
  return this.http.post<any>(`${this.baseUrl}/FMIOrder`, payload,  { headers: reqHeader })
  .pipe(catchError(this.handleError));
 }

 saveCaseInfo(payload, token): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + token
  });
  return this.http.post<any>(`${this.baseUrl}/Case`, payload,  { headers: reqHeader })
  .pipe(catchError(this.handleError));
 }

 saveContactInfo(payload, token): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + token
  });
  return this.http.post<any>(`${this.baseUrl}/ContactUs`, payload,  { headers: reqHeader })
  .pipe(catchError(this.handleError));
 }


 getRelatedInfo(id: string, authToken: string, objectName: string): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    Authorization: 'Bearer ' + authToken
  });
  return this.http.get<any>(`${this.baseUrl}/RelatedData?RecordId=${id}&&ObjectName=${objectName}`,  { headers: reqHeader })
  .pipe(catchError(this.handleError));
 }

 openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 6000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}


 handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
