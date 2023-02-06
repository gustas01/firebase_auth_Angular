import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth, db } from 'src/app/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IGuide } from 'src/app/models/iguide';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userName = new Subject<string>()
  public userNameObservable = this._userName.asObservable()

  private _userId = new Subject<string>()
  public userIdObservable = this._userId.asObservable()
  private userId: string = ''


  constructor(private snackBar: MatSnackBar, private router: Router) {
    this.userIdObservable.subscribe({next: res => this.userId = res})
   }



  handleSignUp(email: string, password: string){
    createUserWithEmailAndPassword(auth, email, password || '').then((userCredentials) => {
      this.showMessage(`Usuário ${userCredentials.user.email} criado com sucesso`);
    }).catch( error => {
      this.showMessage(`Erro ${error.code}: ${error.message}`);
    })
  }

  handleLogin(email: string, password: string){
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      this._userName.next(userCredentials.user.email?.split('@')[0] || '')
      this._userId.next(userCredentials.user.uid)
      this.router.navigate(['/home'])
    }).catch( error => {
      this.showMessage(`Erro ${error.code}: ${error.message}`, true);
    })
  }

  handleLoginWithFacebook(){
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider).then(result => {
      this._userName.next(result.user.displayName || '')
      this._userId.next(result.user.uid)
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
      this.router.navigate([''])
      this.showMessage("Usuário deslogado com sucesso!")
    }).catch(error => {
      this.showMessage(`Ocorreu um erro. ${error.message}`, true)
    })
  }

  checkAuthStateChanged(){
    onAuthStateChanged(auth ,user => {
      if(user){
        this._userName.next(user.displayName || user.email?.split('@')[0] || '')
        this._userId.next(user.uid)
      }
      else{
        this.router.navigate([''])
      }
    })
  }


  async createGuide(guide: IGuide){
    try {
      guide.userId = this.userId
      await addDoc(collection(db, "guides"), guide);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async updateGuide(guide: IGuide){
    await updateDoc(doc(db, 'guides', String(guide.id)), {...guide})
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
