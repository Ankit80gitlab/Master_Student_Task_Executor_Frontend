import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  isUserRegistered:boolean=false;
  isUserLoggedIn: boolean = false;
  userAuthFailed:boolean=false;
  isUserAdmin:boolean=false;

  register(userData:any){
    this.isUserRegistered=true;
    return this.httpClient.post('http://localhost:8062/app/auth/register', userData);
  }
 
  login(userData:any): Observable<any>{
    return this.httpClient.post('http://localhost:8062/app/auth/login',userData,{responseType:'json'}).pipe(catchError(this.handleError))
  }

  handleError(error:any){
    return throwError(error.message || "server error");
  }
}
