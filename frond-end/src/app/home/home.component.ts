import { User } from './../model/user.model';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'frond-end';
  users: User[]=[];
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
   this.authService.getUserLst().subscribe((res)=>{
     debugger;
     console.log(res)
     this.users=res.value;
   })
  }

}
