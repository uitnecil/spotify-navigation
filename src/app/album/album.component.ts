import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../sportify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  // GET https://api.spotify.com/v1/artists/{id}/albums
  albums: Object;
  artistId: string;

  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService,
              private location: Location,
              private router: Router) {
    this.route.params.subscribe( (params: any) => this.artistId = params['id']);
  }

  getAlbums(): void {
    this.spotify.query(`/artists/${this.artistId}/albums?limit=10&market=US`).
      subscribe( (res: any) => {
        this.renderResults(res);
        console.log(res);
      });
  }

  renderResults(res: any): void {
    this.albums = res.items;
  }

  goBack() {
    // if (!this.location.back()) {
    //   this.router.navigate(['artists'], {queryParams: {id: 'a'}})
    //     .then(_ => console.log('backed'));
    // };
    this.location.back();

  }

  ngOnInit() {
    this.getAlbums();
  }
}
