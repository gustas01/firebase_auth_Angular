import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';



@NgModule({
  declarations: [
    LoginSignupComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class PagesModule { }
