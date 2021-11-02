import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Custom Components
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgetPasswordComponent } from './Components/ForgetPassword/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/ResetPassword/reset-password/reset-password.component';

//Angular-Material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { NoteComponent } from './Components/note/note.component';
import { GetnotecomponentComponent } from './Components/getnotecomponent/getnotecomponent.component';
import { IconComponent } from './Components/icon/icon.component';
import { NotesdialogComponent } from './Components/notesdialog/notesdialog.component';
import { GetTrashComponent } from './Components/get-trash/get-trash.component';
import { GetArchiveComponent } from './Components/get-archive/get-archive.component'



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,    
    DashBoardComponent,
    NoteComponent,      
    GetnotecomponentComponent,
    IconComponent,
    NotesdialogComponent,
    GetTrashComponent,
    GetArchiveComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    //Angular Materials
    MatCardModule,
    MatFormFieldModule,    
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
   
  ],
  exports: [    
    MatCardModule,
    MatFormFieldModule,    
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    
    FormsModule   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }