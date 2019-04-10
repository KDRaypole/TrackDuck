import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { CallbackComponent } from './components/callback/callback.component'
import { Routes, RouterModule } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/callback', component: CallbackComponent
  },
];
