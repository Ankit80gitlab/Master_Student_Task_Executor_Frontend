import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authservice:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    "email": new FormControl('', [Validators.required]),
    "password": new FormControl('', [Validators.required])
  })

  responseData: any;
  emailstore: any;
  status: any;
  isUserAdmin:boolean = this.authservice.isUserAdmin;
  userData: any;
  userEmail: any;
  userRole: any;
 

  login() {
    this.status = "";
    this.authservice.login(this.loginForm.value).subscribe((res) => {
      console.log(res);

      this.responseData = res; //initialising responseData
      localStorage.setItem('jwtkey', this.responseData.token);//using key and value pair

      this.userData = jwt_decode(this.responseData.token);

      this.userEmail = this.userData.userObject.email;
      localStorage.setItem('userEmail', this.userEmail);

      this.userRole = this.userData.userObject.role;
      localStorage.setItem('userRole', this.userRole);

      this.authCheck();
    }, (error) => {
      this.status = error;
      console.log(this.status)
      this.authCheck();
      this.loginForm.reset();
    })
  }

  authCheck() {
    if (this.status == "Http failure response for http://localhost:8062/app/auth/login: 404 OK") {
      this.authservice.isUserLoggedIn = false;
      alert("invalid email or password");
      this.router.navigateByUrl('/login');
      this.loginForm.reset();
    }
     else if(this.status=="Http failure during parsing for http://localhost:8062/app/auth/login"){
       this.authservice.isUserLoggedIn = false;
       alert("invalid email or password"); 
       this.router.navigateByUrl('/login');
       this.loginForm.reset();  
     }
    else {
      alert("WELCOME USER " + localStorage.getItem('userEmail')?.toUpperCase());
      this.authservice.isUserLoggedIn = true;
      if(localStorage.getItem('userRole')=="admin"){
        this.isUserAdmin=true;}
      this.router.navigateByUrl('/dashboard');
    }
  }

}
