import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ]
})
export class UserModule { }
