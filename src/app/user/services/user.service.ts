import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth, db } from 'src/app/firebase';
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userName = new Subject<string>()
  public userName = this._userName.asObservable()

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  handleLogin(email: string, password: string){
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      this._userName.next(userCredentials.user.email?.split('@')[0] || '')
      this.router.navigate(['/home'])
    }).catch( error => {
      this.showMessage(`Erro ${error.code}: ${error.message}`, true);
    })
  }

  handleLoginWithFacebook(){
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider).then(result => {
      this._userName.next(result.user.displayName || '')
      this.router.navigate(['/home'])

      // const credentials = FacebookAuthProvider.credentialFromResult(result)
      // const accessToken = credentials?.accessToken
    }).catch( error => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.customData.email);
      console.log(FacebookAuthProvider.credentialFromError(error));
    })
  }

  handleLogout(){
    signOut(auth).then(() => {
      this.showMessage("Usuário deslogado com sucesso!")
      this.router.navigate([''])
    }).catch(error => {
      this.showMessage(`Ocorreu um erro. ${error.message}`, true)
    })
  }

  checkAuthStateChanged(){
    onAuthStateChanged(auth ,user => {
      if(user){
        this._userName.next(user.displayName || user.email?.split('@')[0] || '')
      }
      else{
        this.router.navigate([''])
      }
    })
  }

  async getDataFromDatabase(collectionName: string){
    return await getDocs(collection(db, collectionName));
  }

  showMessage(msg: string, isError: boolean = false){
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
     })
  }
}
