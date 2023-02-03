import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGuideDialogComponent } from 'src/app/components/add-guide-dialog/add-guide-dialog.component';
import { IGuide } from 'src/app/models/iguide';
import { UserService } from 'src/app/user/services/user.service';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from 'src/app/firebase';
import { UpdateGuideDialogComponent } from 'src/app/components/update-guide-dialog/update-guide-dialog.component';


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
    this.userService.userNameObservable.subscribe({next: res => this.userName = res})

    this.getData()
   }

  logout(){
    this.userService.handleLogout()
  }

  async getData(){
    const q = query(collection(db, 'guides'), orderBy('title', 'asc'))
    onSnapshot(q, (docs) => {
      this.guides = []
      docs.forEach(doc => this.guides?.push({id: doc.id, ...doc.data()} as IGuide))
    });

  }


  openDialogAddGuide() {
    this.dialog.open(AddGuideDialogComponent, {width: '80vw'});
  }


  async deleteGuide(id: string = ''){
    await deleteDoc(doc(db, "guides", id));
  }

  async updateGuide(guide: IGuide){
    this.dialog.open(UpdateGuideDialogComponent, {width: '80vw', data: guide});
  }

}
