import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'frond-end';
  user: User;
  currentUser: any;
  isLogin:boolean=false ;
  userinfo:User;
  tokenStore:any;
  constructor(
    private authService:AuthenticationService,
    private router:Router,
  ) {
    debugger;
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
  }
   }

  ngOnInit(): void {
    let info= this.authService.getUserInfo();
    this.userinfo= <User>JSON.parse(info??"");
    this.tokenStore=this.authService.getToken();
  }
}
