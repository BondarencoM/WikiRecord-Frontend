import { browser, by, element, $, ElementArrayFinder, ElementFinder, logging, ExpectedConditions as Condition, $$, promise, WebElementPromise, until } from 'protractor';
import { BasePage } from '../Basepage.po';

export class ViewRecommendationPage extends BasePage {

    pageUrl = 'recommendations/'

    navigateTo(id?: number): Promise<unknown>{
        return browser.get(browser.baseUrl + this.pageUrl + id) as Promise<unknown>
    }

    waitToLoad(timeout = 5000): promise.Promise<unknown>{
        return browser.wait(
            until.urlMatches(/recommendations\/[0-9]{0,4}/i),
            timeout,
            'Waiting to load ViewRecommendation page')
    }

}
