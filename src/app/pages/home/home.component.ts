import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGuideDialogComponent } from 'src/app/componenets/add-guide-dialog/add-guide-dialog.component';
import { IGuide } from 'src/app/models/iguide';
import { UserService } from 'src/app/user/services/user.service';
import { collection, getDocs, addDoc, onSnapshot, doc, query } from "firebase/firestore";
import { auth, db } from 'src/app/firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userName?: string
  public guides?: IGuide[] = []



  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.checkAuthStateChanged()
    this.userService.userName.subscribe({next: res => this.userName = res})

    this.getData()
   }

  logout(){
    this.userService.handleLogout()
  }

  async getData(){
    const q = query(collection(db, 'guides'))
    onSnapshot(q, (docs) => {
      this.guides = []
      docs.forEach(doc => this.guides?.push(doc.data() as IGuide))
    });

  }


  openDialogAddGuide() {
    this.dialog.open(AddGuideDialogComponent, {width: '80vw'});
  }

}
