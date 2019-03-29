import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  private user:any;

  constructor( private router: Router,
    private _spotify: SpotifyService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  userLoggedIn() : Observable<boolean>{
    return this._spotify.getCurrentUser().map(data => {
      return !!data
    })
  }
}
