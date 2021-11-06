import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConst } from 'src/app/const/server-const';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { localstoreKey } from 'src/app/const/localstore_key';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ServerConst {
  public token: string | null = '';
  public logsInUsername: string | null = '';
  public redirectUrl: string = '';
  private jwtHelper = new JwtHelperService();

  get host(){
    return this.getHost;
  }
  get authApi(){
    return `${this.host}/api/user/`;
  }
  get curdApi(){
    return `${this.host}/api/usercurd/`;
  }
  constructor(private http: HttpClient,private router:Router) {
    super();
  
  }
  getProfile():Observable<User>{
    return this.http.get<User>(`${this.authApi}profile`);
  }
  getUserLst():Observable<any>{
    return this.http.get<any>(`${this.curdApi}getall`);
  }
  login(user: User): Observable<HttpErrorResponse | HttpResponse<any>> {
    return this.http.post<User>(`${this.authApi}authenticate`,{"username":user.username,"password":user.password},
      {
        observe: 'response',
      } 
    );
  }
  register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.curdApi}register`, user);
  }
 
  logOut(): void {
    this.token = null;
    localStorage.removeItem(localstoreKey.username);
    localStorage.removeItem(localstoreKey.token)
    localStorage.removeItem(localstoreKey.info);

    this.router.navigate(['/auth/login'])
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(localstoreKey.token, this.token);
  }
  saveUserInfo(userinfo:string){
    localStorage.setItem(localstoreKey.info,userinfo);
  }
  loadToken(): void {
    this.token = localStorage.getItem(localstoreKey.token);
  }
  saveUserName(username:any){
    localStorage.setItem(localstoreKey.username,username);
  }
  getUserName(){
    return  localStorage.getItem(localstoreKey.username);
  }
  getUserInfo(){
    return localStorage.getItem(localstoreKey.info);
  }
  getToken(){
    return this.token;
  }
  get UserName(){
    return localStorage.getItem(localstoreKey.username);
  }
  isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (!this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.logsInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
        return false;
      }
      return false;
    } else {
      this.logOut();
      return false;
    }
  }



}
