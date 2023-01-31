import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from 'src/app/firebase';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  handleLogin(){
    if(this.loginForm.valid){
      signInWithEmailAndPassword(auth, this.loginForm.value.email || '', this.loginForm.value.password || '').then((userCredentials) => {
        this.userService.showMessage(`Usuário ${userCredentials.user.email} criado com sucesso`);
      }).catch( error => {
        this.userService.showMessage(`Erro ${error.code}: ${error.message}`);
      })
    }
  }

  loginWithFacebook(){
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider).then(result => {
      console.log(result.user);
      const credentials = FacebookAuthProvider.credentialFromResult(result)
      const accessToken = credentials?.accessToken

    }).catch( error => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.customData.email);

    })
  }

}
