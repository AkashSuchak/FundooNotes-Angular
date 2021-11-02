import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';

import { ForgetPasswordComponent } from './Components/ForgetPassword/forget-password/forget-password.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/ResetPassword/reset-password/reset-password.component';

const routes: Routes = [
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'forgetPassword', component:ForgetPasswordComponent},
  {path: 'resetpassword/:token', component: ResetPasswordComponent },
  {path: 'dashboard', component: DashBoardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
