import { PlaylistComponent } from './components/playlist/playlist.component'
import { SettingsComponent } from './components/settings/settings.component'
import { Routes, RouterModule } from '@angular/router';

export const SECURE_ROUTES: Routes = [
  {
    path: 'playlist', component: PlaylistComponent
  },
  {
    path: 'settings', component: SettingsComponent
  }
];
