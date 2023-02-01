import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.checkAuthStateChanged()
  }

  login(){
    if(this.loginForm.valid){
      this.userService.handleLogin(this.loginForm.value.email || '', this.loginForm.value.password || '')
    }
  }

  loginWithFacebook(){
    this.userService.handleLoginWithFacebook()

  }

}
