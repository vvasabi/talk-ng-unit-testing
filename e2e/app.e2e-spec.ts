import { TalkNgUnitTestingPage } from './app.po';

describe('talk-ng-unit-testing App', () => {
  let page: TalkNgUnitTestingPage;

  beforeEach(() => {
    page = new TalkNgUnitTestingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
