import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { UserModule } from '../user/user.module';

import { LoginSignupComponent } from './login-signup/login-signup.component';


@NgModule({
  declarations: [
    LoginSignupComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    UserModule
  ]
})
export class PagesModule { }
