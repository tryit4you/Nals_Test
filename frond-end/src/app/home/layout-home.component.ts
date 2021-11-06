import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({ templateUrl: 'layout-home.component.html' })
export class LayoutHomeComponent { 
    constructor(
        private authService:AuthenticationService,
      ) {
       }

    logout(){
        this.authService.logOut();
      }
}