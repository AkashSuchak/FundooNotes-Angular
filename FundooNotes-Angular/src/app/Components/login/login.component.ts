import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, EmailValidator } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm! : FormGroup;
  hide = true;

  constructor(private userService : UserServiceService,  private snackBar: MatSnackBar, private router: Router) 
    { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')])
    });
  }  
    
    Login() {
      this.userService.Login(this.LoginForm.value).subscribe(
      (result: any) => {
        //console.log(result)
        this.snackBar.open(result.message, '', { duration: 2500 });
        if (result.status == true) {
          const userData = JSON.stringify(result);
          localStorage.setItem('FundooUser', userData);
          this.router.navigateByUrl('/dashboard');
        }
        },
        (error: HttpErrorResponse) => {
          //console.log(error.error.message)
          this.snackBar.open(error.error.message, '', { duration: 2500 });
        }
    );
    }
  
    LocalStorage(data: any){
      var user = localStorage.getItem('FundooUser');
      if (user != null){
        localStorage.removeItem('FundooUser');
      }
      user = data;
      localStorage.setItem('FundooUser',JSON.stringify(user));
    }
  
    checkLocalStorage(){
      var user = localStorage.getItem('FundooUser');
      if(user != null){
        this.router.navigateByUrl('/dashboard');
      }
    }
}
