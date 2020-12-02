import { browser, by, element, ElementArrayFinder, ElementFinder, logging, ExpectedConditions as Condition, WebElementPromise, By } from 'protractor';
import { BasePage } from './Basepage.po';

export class LoginPage extends BasePage {

    pageUrl = 'Account/Login'

    navigateTo(): Promise<unknown>{
        return browser.get('https://localhost:5000/' + this.pageUrl) as Promise<unknown>
    }

    get usernameField(): WebElementPromise{
        return browser.driver.findElement(by.name('Input.Username'))
    }

    get passwordField(): WebElementPromise{
        return browser.driver.findElement(by.name('Input.Password'))

    }

    get loginButton(): WebElementPromise{
        return browser.driver.findElement(by.css('.col-md-4 button.btn-primary'))
    }
}
