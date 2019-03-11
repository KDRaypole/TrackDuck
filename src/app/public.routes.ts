import { LoginComponent } from './components/login/login.component'
import { CallbackComponent } from './components/callback/callback.component'
import { Routes, RouterModule } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/callback', component: CallbackComponent
  },
];
