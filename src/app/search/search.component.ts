import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../sportify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;

  constructor( private route: ActivatedRoute,
               private spotify: SpotifyService,
               private router: Router) {
    this.route.queryParams.subscribe((params: any) => {
      this.query = params['query'];
      console.log(JSON.stringify(params));
    });
  }

  submit(searchValue?: string): void {
    if (!searchValue) {
      return;
    }

    this.router.navigate(['search'], {queryParams: {query: searchValue}})
      .then(() => {
        this.spotify
          .search(this.query, 'artist')
          .subscribe( (v) => this.renderResults(v));
      });

  }

  renderResults(v: any) {
    console.log(`search results`);
    console.log(v);
    if (v && v.artists && v.artists.items) {
      this.results = v.artists.items;
    }
  }


  ngOnInit() {
      this.submit(this.query);
  }

}
