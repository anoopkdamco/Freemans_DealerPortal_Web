import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  userData: any;

  constructor() { }
  setUserData(val: any){
    this.userData = val;
  }

  getUserData(){
    return this.userData;
  }
}
