import { browser, by, element, ElementArrayFinder, ElementFinder, logging, ExpectedConditions as Condition, promise } from 'protractor';
import { BasePage } from '../Basepage.po';

export class MainPage extends BasePage {

    get discoveryPersonas(): ElementArrayFinder {
        return element.all(by.tagName('app-persona-recommendations-card'))
    }

    get firstSuggestedPersonaName(): ElementFinder {
        return this.discoveryPersonas.first().$('.card-title')
    }

    get addRecommendationButton(): ElementFinder{
        return element(by.partialButtonText('Add Recommendation'))
    }

    waitForPersonasToLoad(timeout = 5000): promise.Promise<unknown> {
        return browser.wait(Condition.presenceOf(this.firstSuggestedPersonaName), timeout)
    }

}
