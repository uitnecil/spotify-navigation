import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// generate additional token (valid 30 min) from here: https://developer.spotify.com/web-api/console/get-search-item/
export const SPOTIFY_TOKEN = 'BQDCEdwH4N1DuO5JTaXxVWG8jSBvlB54Kr-sz2nZ-JS95qnQbPXVQXekGZ2aNpWDPPgO1Eo2yrEuZ1t_6NjYekdJ' +
  'Z6mD97IDONb0zUv7W42HnLiBTb6wBkEkb2fCYxq1VdestWUHD9UNDO5xBSkd5DDM24DKyyVFXM3aVbzvPHvQ7G1HSvRVrJXWkcLMRSX1AwFmC8mG-xR' +
  '4hiSzP7-iulALONn8LvdVRNTb0IHy7FpGJijfd_sAlPbi22C1fuDbI7TnmQnAzb_HB-xVdROWLBfMpPM21hgHlAOgdQnRbBSryfX14yN24djnjCEJr_' +
  '7xip2GfgF-Nu08HZpiKn_wBg';

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
