import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddGuideDialogComponent } from 'src/app/componenets/add-guide-dialog/add-guide-dialog.component';
import { IGuide } from 'src/app/models/iguide';
import { UserService } from 'src/app/user/services/user.service';

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
    this.userService.getDataFromDatabase('guides').then(coll => coll.forEach(doc => this.guides?.push(doc.data() as IGuide)))
  }


  openDialogAddGuide() {
    const dialogRef = this.dialog.open(AddGuideDialogComponent, {width: '80vw'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
