import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { CallbackComponent } from './components/callback/callback.component'
import { PlaylistComponent } from './components/playlist/playlist.component'
import { SettingsComponent } from './components/settings/settings.component'
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { PublicComponent } from './layouts/public/public.component'
import { SecureComponent } from './layouts/secure/secure.component'
import { PUBLIC_ROUTES } from './public.routes'
import { SECURE_ROUTES } from './secure.routes'

const APP_ROUTES: Routes = [
    { path: '', component: PublicComponent, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, canActivate: [AuthGuardService], children: SECURE_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
