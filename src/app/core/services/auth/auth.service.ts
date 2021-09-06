import { map, switchMap, take, tap } from 'rxjs/operators';

import { Login } from './../../models/login.interface';
import { CustomStorageService } from './../custom-storage/custom-storage.service';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { authEndpoints } from '../../configs/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenStore: BehaviorSubject<any> = new BehaviorSubject(null);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;
  constructor(private reqS: RequestService,private router: Router, private customS: CustomStorageService, private routerS: Router,) {
    // this.user = this.userSubject.asObservable();
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(loginData:  {
    username: string;
    password: any;
    aRoute: string | ActivatedRoute;
  }){
    const credentials: Login = {
      username: loginData.username,
      password: loginData.password,
    };
    return this.reqS.post(authEndpoints.auth, credentials).pipe(map((user: User) => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      user.authdata = window.btoa(loginData.username + ':' + loginData.password);
      // this.customS.setItem('user',  JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
  }));
    // .pipe(
    //   switchMap((res: any) =>this.saveToken(res.token).pipe(
    //      switchMap(() =>res.token)
    //    ).pipe(take(1),tap((value) =>{
    //      console.log(res)
    //      console.log(value)
    //     let redirectUrl: any = '/selectie-spatiuome';
    //     if (loginData.aRoute instanceof ActivatedRoute) {
    //       redirectUrl = this.redirectUrlTree(
    //         loginData.aRoute ? loginData.aRoute.snapshot : null
    //       );
    //     } else if (typeof loginData.aRoute === 'string') {
    //       redirectUrl = loginData.aRoute;
    //     } else if (loginData.aRoute === null) {
    //       redirectUrl = null;
    //     }
    //     if (redirectUrl) {
    //       Promise.resolve(this.routerS.navigateByUrl(redirectUrl));
    //     }
    //    }) ))
    // );
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
  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
