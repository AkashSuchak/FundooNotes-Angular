import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, EmailValidator } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm! : FormGroup;
  hide = true;
  message = "hello";

  constructor(
    private userService : UserServiceService    
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-zA-Z]{2,}'), Validators.minLength(3)]),
      lastName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-zA-Z]{2,}'),  Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')]),
      confirmPassword : new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')])
    });
  }
  Register(){
    this.userService.Register(this.registrationForm.value)
      .subscribe((result: any) =>{
        console.log(result)
      }              
      //localStorage.setItem("token", "aaa")
      )  
  };
}
