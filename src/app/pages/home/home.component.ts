import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userName?: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.checkAuthStateChanged()
    this.userService.userName.subscribe({
      next: res => this.userName = res
    })

   }

  logout(){
    this.userService.handleLogout()
  }

}
