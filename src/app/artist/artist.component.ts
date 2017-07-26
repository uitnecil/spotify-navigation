import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../sportify.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artistId: string;
  artist: Object;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private spotify: SpotifyService) {
    this.route.params.subscribe( (v: any) => {
      this.artistId = v['id'];
      console.log(`this.parameter: ${this.artistId}`);
    });
  }

  ngOnInit() {
    this.spotify.getArtist(this.artistId)
      .subscribe((v: any) => this.renderArtist(v));
  }
  
  goBack(): void {
    this.location.back();
  }

  renderArtist(v: any): void {
    this.artist = v;
  }

}
