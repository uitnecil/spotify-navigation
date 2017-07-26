/*
* Angular Imports
 */
import { Routes } from '@angular/router';

/*
* Internal Imports
 */
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';

export const CustomRoutes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent },
  {path: 'tracks/:id', component: TrackComponent},
  {path: 'artists/:id', component: ArtistComponent},
  {path: 'albums/:id', component: AlbumComponent},
  {path: '*', redirectTo: '/', pathMatch: 'full'}
];

