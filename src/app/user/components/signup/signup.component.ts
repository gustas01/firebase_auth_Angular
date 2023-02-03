import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      this.userService.handleSignUp(this.signUpForm.value.email || '', this.signUpForm.value.password || '')
    }
  }

}
