import { switchMap, take, tap } from 'rxjs/operators';

import { Login } from './../../models/login.interface';
import { CustomStorageService } from './../custom-storage/custom-storage.service';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { authEndpoints } from '../../configs/endpoints';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenStore: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private reqS: RequestService, private customS: CustomStorageService, private routerS: Router,) { }

  login(loginData:  {
    username: string;
    password: any;
    aRoute: string | ActivatedRoute;
  }){
    const credentials: Login = {
      username: loginData.username,
      password: loginData.password,
    };
    return this.reqS.post(authEndpoints.auth, credentials).pipe(
      switchMap((res: any) =>this.saveToken(res.token).pipe(
         switchMap(() =>res.token)
       ).pipe(take(1),tap((value) =>{
        let redirectUrl: any = '/selectie-spatiuome';
        if (loginData.aRoute instanceof ActivatedRoute) {
          redirectUrl = this.redirectUrlTree(
            loginData.aRoute ? loginData.aRoute.snapshot : null
          );
        } else if (typeof loginData.aRoute === 'string') {
          redirectUrl = loginData.aRoute;
        } else if (loginData.aRoute === null) {
          redirectUrl = null;
        }
        if (redirectUrl) {
          Promise.resolve(this.routerS.navigateByUrl(redirectUrl));
        }
       }) ))
    );
  }
  saveToken(token) {
    this.tokenStore.next(token);
    return this.customS.setItem('token', token);
  }
  redirectUrlTree(snapshot: ActivatedRouteSnapshot): UrlTree {
    if (snapshot) {
      const qP = snapshot.queryParams;
      const rUk = 'returnUrl';
      if (qP.hasOwnProperty(rUk) && qP[rUk]) {
        return this.routerS.createUrlTree([qP[rUk]]);
      }
    }
    return this.routerS.createUrlTree(['/']);
  }
}
