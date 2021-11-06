import { localstoreKey } from 'src/app/const/localstore_key';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 //public jwtHelper:JwtHelperService
 public loginListener: Subject<boolean>=new Subject();
  constructor(
    
  ) { 
  }
  public isAuthenticated():boolean{
    debugger;
    const token=localStorage.getItem(localstoreKey.token);
   debugger;
    if(token ==null||token == undefined)
      false;
    //check token expired
    
    return true;
  // return !this.jwtHelper.isTokenExpired(token);
  }
 
}
