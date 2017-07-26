import { SpotifyLicePage } from './app.po';

describe('spotify-lice App', () => {
  let page: SpotifyLicePage;

  beforeEach(() => {
    page = new SpotifyLicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
