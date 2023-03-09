import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private formBuilder: FormBuilder, private router:Router, private authSer:AuthServiceService){}

  ngOnInit():void{}

  signUpForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(12)]),
  });

  
  register(){
    if(this.signUpForm.getRawValue().password != this.signUpForm.getRawValue().confirmPassword){
      alert("password and confirm password should match");
    }
    else{
      this.authSer.register({
        "email":this.signUpForm.getRawValue().email?.toLowerCase(),
        "password":this.signUpForm.getRawValue().password
      }).subscribe(r => {console.log(r);})
      if (this.authSer.isUserRegistered == true) {
        alert("Registered Successfully");
        this.router.navigateByUrl('/');
      }
      this.signUpForm.reset();
    }
    
    
  }
}
