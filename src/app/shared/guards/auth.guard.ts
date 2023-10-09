import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";

import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): any {
    if(this.authService.isAuthenticated()){
      return true
    } else {
      this.authService.logout()
      this.router.navigate(['/admin', 'login'])
    }
  }
}





export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
