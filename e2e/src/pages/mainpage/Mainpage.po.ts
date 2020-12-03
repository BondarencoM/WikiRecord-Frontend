import {
    browser, by, element, ElementArrayFinder, ElementFinder,
    ExpectedConditions, promise, until, $, $$
} from 'protractor'
import { BasePage } from '../Basepage.po'

export class MainPage extends BasePage {

    waitToLoad(): promise.Promise<unknown> {
        return browser.wait(until.urlIs(browser.baseUrl), 5000, 'Wait to load MainPage')
    }

    get discoveryPersonas(): ElementArrayFinder {
        return element.all(by.tagName('app-persona-recommendations-card'))
    }

    get firstSuggestedPersonaName(): ElementFinder {
        return this.discoveryPersonas.first().$('.card-title')
    }

    get addRecommendationButton(): ElementFinder {
        return element(by.partialButtonText('Add Recommendation'))
    }

    get signUpLink(): ElementFinder {
        return element(by.partialLinkText('Sign up'))
    }

    get userDropdown(): ElementFinder {
        return $('#userAccountDropdown')
    }

    get logoutbutton(): ElementFinder {
        return element(by.buttonText('Log out'))
    }

    waitForPersonasToLoad(timeout = 5000): promise.Promise<unknown> {
        return browser.wait(
            ExpectedConditions.presenceOf(this.firstSuggestedPersonaName),
            timeout,
            'Wait to load first suggested persona'
        )
    }

}
