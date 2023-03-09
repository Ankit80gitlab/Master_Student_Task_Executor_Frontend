import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

declare const evaluateFunction: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private authSer: AuthServiceService) { }

  LIU=localStorage.getItem('userEmail');
  LIUR=localStorage.getItem('userRole');
  result: string = '';
  log: String = '';
  logsData: Array<String> = [];

  totalOperation:number=0;
  correctOperation:number=0
  blankOperation:number=0;
  invalidOperation:number=0;
  operationNo:number=0;
  operationQuery:string='';
  operationResult:String='';

  resetScreen() {
    this.result = '';
  }

  evaluateFun(f: any) {
    this.totalOperation++;
    if (f.length == 0) {
      alert("ERROR :- BLANK OPERATION");
      this.blankOperation++;
    }
    try {
      this.result = evaluateFunction(f);
      this.log = f + " : " + this.result;
      if (f.length != 0) {
        this.logsData.push(this.log);
        this.correctOperation++;
      }
    }
    catch (err) {
      alert("ERROR :- INVALID OPERATION");
      this.invalidOperation++;
    }
  }

  logInfoExtr(data:any){
    let count = 0;
    for(let i of this.logsData){
      if(i != data){
        count++;
      }
      else{
        this.operationNo=count+1;
        break;
      }
    }
    let arrOfData:Array<string> = data.split(":",2);
    this.operationQuery=arrOfData[0];
    this.operationResult=arrOfData[1];
  }

  clearLogs() {
    this.logsData.length = 0;
  }

  logout() {
      if(window.confirm("Are you sure, you will be logged out")) {
      localStorage.removeItem('jwtkey');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      this.authSer.userAuthFailed = false;
      this.authSer.isUserAdmin = false;
      this.authSer.isUserLoggedIn = false;
      this.router.navigateByUrl('/');
    }
  }





}
