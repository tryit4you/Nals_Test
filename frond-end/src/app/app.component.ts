import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { User } from './model/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthenticationService) {
    
  }
  ngOnInit(): void {
   
  }
  
  logout() {
    this.authService.logOut();
  }
}
