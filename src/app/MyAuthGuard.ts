import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth/services/auth.service";
import {map} from "rxjs";

@Injectable()
export class MyAuthGuard implements CanActivate {

  constructor(private router: Router, private authServices: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authServices.user.pipe(
      map((user) => {
        if (user != null) {
          return true
        } else {
          this.router.navigateByUrl('/login');
          return false
        }
      })
    );
  }
}
