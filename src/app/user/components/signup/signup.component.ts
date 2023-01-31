import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from 'src/app/firebase';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }


  signUp(){
    if(this.signUpForm.valid){
      createUserWithEmailAndPassword(auth, this.signUpForm.value.email || '', this.signUpForm.value.password || '').then((userCredentials) => {
        this.userService.showMessage(`Usuário ${userCredentials.user.email} criado com sucesso`);
      }).catch( error => {
        this.userService.showMessage(`Erro ${error.code}: ${error.message}`);
      })
    }
  }

}
