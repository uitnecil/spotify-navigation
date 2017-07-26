import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// generate additional token (valid 30 min) from here: https://developer.spotify.com/web-api/console/get-search-item/
export const SPOTIFY_TOKEN = 'BQDegBSBonYADxoUFo1tmtF7gLN6lt8YsyyNxiI9ywiqhTAdCskFvzd8_e6YWm9ael2-GDPXeZU0ExzPjFB2qNwo' +
  'v0eLBIVWy6IqX_pZ40t_slsadw88921igGDlfJLJ4cHTEX17G4j0uNVNh-PkV7SL9upYZAty-1y1CZZbGubXPCIn0vik8z0jIluzfp869A_vDLDoLIS' +
  'l6DGs3jUKVO5HqPjFfzJGR3DpJcwa2R-dH4R3kxOR7ExiGVzyoGuTUbbzIRA43cIiYa44ofJEAlOp-98uNJ8sNSjDNPogICz9jSlAJdg_VJ5L6VWt1h' +
  '7cSlJYb9Th081FeikqumZDmg';

// export const

@Injectable()
export class SpotifyService {
  static URL = 'https://api.spotify.com/v1';

  constructor(private http: Http,
              @Inject(SPOTIFY_TOKEN) private apiToken: string) {}

  search(searchString: string, type: string): Observable<any> {
    const searchParams: string[] = [
      `q=${searchString}`,
      `type=${type}`
    ];
    console.log('here');
    return this.query('/search', searchParams);
  }

  query(link: string, params?: Array<string>): Observable<any> {
    let queryApi = `${SpotifyService.URL}${link}`;
    if (params) {
      queryApi += '?' + params.join('&');
    }

    console.log(queryApi);
    // set request options - authorization
    const opts: RequestOptions = this.setParams();
    // perform query and return it
    return this.http.request(queryApi, opts)
      .map(res => res.json());
  }

  private setParams(): RequestOptions {
    const header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + this.apiToken);
    const opts: RequestOptions = new RequestOptions();
    opts.headers = header;

    return opts;
  }

  getArtist(id?: string) {
    return this.query(`/artists/${id}`);
  }

}

export const INJECTABLE_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService },
  { provide: SPOTIFY_TOKEN, useValue: SPOTIFY_TOKEN }
];
