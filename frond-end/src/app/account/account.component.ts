import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  users: User[] = [];
  currentUser: any;
  isLogin: boolean = false;
  userinfo: User;
  tokenStore: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    debugger;
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit(): void {
    this.authService.getUserLst().subscribe((res) => {
      this.users = res;
    });
  }
}
