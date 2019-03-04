import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { CallbackComponent } from './callback/callback.component'
import { PlaylistComponent } from './playlist/playlist.component'
import { SettingsComponent } from './settings/settings.component'
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: '/playlist', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/callback', component: CallbackComponent
  },
  {
    path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
