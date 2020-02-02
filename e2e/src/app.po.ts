import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTitleText() {
    return element(by.css('pm-root .content span')).getText() as Promise<string>;
  }
}
