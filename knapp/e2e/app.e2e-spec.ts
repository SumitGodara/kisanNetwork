import { KnappPage } from './app.po';

describe('knapp App', function() {
  let page: KnappPage;

  beforeEach(() => {
    page = new KnappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
