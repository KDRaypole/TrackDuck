import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  private user:any;

  constructor(
    private router: Router,
    private _spotify: SpotifyService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this._spotify.getCurrentUser()
      .subscribe(data => {
        this.user = data
      })
    if (this.user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
