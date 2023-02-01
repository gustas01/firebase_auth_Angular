import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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



  constructor(private userService: UserService, private router: Router) { }

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

}
