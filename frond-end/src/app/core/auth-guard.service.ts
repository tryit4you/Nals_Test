
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth:AuthService,public route:Router) { }
  canActivate(): boolean{    
    debugger;
    if(!this.auth.isAuthenticated()){
      this.route.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
