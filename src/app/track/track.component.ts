import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../sportify.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  tracks: Object;
  albumId: string;

  // GET https://api.spotify.com/v1/albums/{id}/tracks

  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService, private location: Location ) {
    this.route.params.subscribe( (params: any) => {
      this.albumId = params['id'];
      console.log(this.albumId);
    } );
  }

  getTracks() {
    this.spotify.query(`/albums/${this.albumId}/tracks`)
      .subscribe( (res: any) => {
        this.renderResults(res);
        console.log(res);
      });
  }

  renderResults(res: any): void {
    this.tracks = res.items;
  }

  goBack() {
    this.location.back();

  }

  ngOnInit() {
    this.getTracks();
  }


}
