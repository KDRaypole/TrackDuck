import { PlaylistComponent } from './components/playlist/playlist.component'
import { SettingsComponent } from './components/settings/settings.component'
import { RecommendedComponent } from './components/recommended/recommended.component'
import { Routes, RouterModule } from '@angular/router';

export const SECURE_ROUTES: Routes = [
  {
    path: 'recommended', component: RecommendedComponent
  },
  {
    path: 'playlist', component: PlaylistComponent
  },
  {
    path: 'settings', component: SettingsComponent
  }
];
