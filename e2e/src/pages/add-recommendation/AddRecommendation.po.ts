import { browser, by, element, $, $$, ElementArrayFinder,
    ElementFinder, ExpectedConditions as Condition, promise } from 'protractor';
import { BasePage } from '../Basepage.po';

export class AddRecommendationPage extends BasePage {

    pageUrl = 'recommendations/add'

    get inputField(): ElementFinder {
        return $('app-wiki-entity-selector input')
    }

    get searchResults(): ElementArrayFinder {
        return $$('.card-deck .card')
    }

    get firstSearchResult(): ElementFinder{
        return this.searchResults.first()
    }

    get firstSearchResultButton(): ElementFinder {
        return this.firstSearchResult.element(by.partialButtonText('Select'))
    }

    get firstSearchResultName(): ElementFinder{
        return this.firstSearchResult.$('.card-title')
    }

    get proofField(): ElementFinder{
        return element(by.name('context'))
    }

    get registerButton(): ElementFinder{
        return element(by.partialButtonText('Register'))
    }

    waitForSearchResults(timeout = 5000): promise.Promise<unknown>{
        return browser.wait(
            Condition.presenceOf(this.firstSearchResultButton),
            timeout,
            'Wait for search results to be loaded')
    }

}
