import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public baseUrl = 'https://freemansgroup.secure.force.com/dealers/services/apexrest';

  constructor(private http: HttpClient) { }

  loginUser(payload): Observable<any> {
    const password = payload.password;
    const username = payload.username;
    return this.http.get<any>(`${this.baseUrl}/LoginHelper?username=${username}&&password=${password}`)
    .pipe(catchError(this.handleError));
  }

  resetPassword(payload): Observable<any> {
    const username = payload.username;
    const SecurityQuestion = payload.SecurityQuestion;
    const SecurityAnswer = payload.SecurityAnswer;
    const NewPassword =  payload.NewPassword;
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(`${this.baseUrl}/UpdatePassword?username=${username}&&SecurityQuestion=${SecurityQuestion}&&SecurityAnswer=${SecurityAnswer}&&NewPassword=${NewPassword}`)
    .pipe(catchError(this.handleError));
  }

  updateSecurityQuestion(payload): Observable<any> {
    const ErpCode = payload.ErpCode;
    const username = payload.username;
    const SecurityQuestion = payload.SecurityQuestion;
    const SecurityAnswer = payload.SecurityAnswer;
    const NewPassword =  payload.NewPassword;
    const OldPassword = payload.OldPassword;
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(`${this.baseUrl}/UpdateSecurityQuestion?ErpCode=${ErpCode}&&username=${username}&&OldPassword=${OldPassword}&&SecurityQuestion=${SecurityQuestion}&&SecurityAnswer=${SecurityAnswer}&&NewPassword=${NewPassword}`)
    .pipe(catchError(this.handleError));
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
 // window.alert(errorMessage);
  // this.openSnackBar(errorMessage, 'OK');
  return throwError(errorMessage);
}
}
