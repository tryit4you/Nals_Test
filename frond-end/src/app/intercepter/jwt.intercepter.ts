import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private accountService:AuthenticationService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        if(req.url.includes(`${this.accountService.host}/account/login`)){
            return next.handle(req);
        }
        if(req.url.includes(`${this.accountService.host}/account/register/`)){
            return next.handle(req);
        }
        if(req.url.includes(`${this.accountService.host}/account/resetPassword/`)){
            return next.handle(req);
            
        }
        if(req.url.includes(`${this.accountService.host}/api/shared/common/testconnect`)){
            return next.handle(req);
            
        }
      
        this.accountService.loadToken();
        const token=this.accountService.getToken()??"";
        const request=req.clone({setHeaders:{Authorization:token}})
        return next.handle(request);
    }
}