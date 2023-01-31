import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from 'src/app/firebase';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor(private formBuilder: FormBuilder, private router: Router) { }


  signUp(){
    if(this.signUpForm.valid){

      createUserWithEmailAndPassword(auth, this.signUpForm.value.email || '', this.signUpForm.value.password || '').then((userCredential) => {
        const user = userCredential.user
      }).catch( error => {
        console.log(error.code);
        console.log(error.message);
      })
    }
  }

}
