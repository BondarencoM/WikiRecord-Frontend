import { browser, $, $$, element, ElementFinder, logging, ExpectedConditions, promise } from 'protractor';

export class BasePage {

    public pageUrl = ''

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + this.pageUrl) as Promise<unknown>
  }

  waitToLoad(): promise.Promise<unknown>{
    return browser.wait(ExpectedConditions.urlContains(this.pageUrl))
  }

  get body(): ElementFinder{
    return $('body')
  }

  public expectInPageText(expected: string | RegExp): void{
    if (expected instanceof String){
      expect(this.body.getText()).toContain(expected)
    }else if (expected instanceof RegExp){
      expect(this.body.getText()).toMatch(expected)
    }
  }

  async expectNoBrowserErrors(): void {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
    } as logging.Entry));
 }

}
