import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardGuard implements CanLoad {
  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  constructor(private _authService: AuthService, private _router: Router) { }
  badge : Number;
    CanLoad(): boolean {
    this._authService.badge$.subscribe(badge=> this.badge= badge )
    if(this.badge>0)
     return true;
     else {
              
      this._router.navigate(['/special'])
      return false
    }
  }
}
  

