import { browser, by, WebElementPromise, until } from 'protractor'
import { BasePage } from './Basepage.po'

export class RegisterPage extends BasePage {

    pageUrl = 'Account/Register'
    baseHref = 'https://localhost:5000/'

    navigateTo(): Promise<unknown> {
        return browser.get(this.baseHref + this.pageUrl) as Promise<unknown>
    }

    async waitToLoad(timeout = 5000): Promise<unknown> {
        await browser.wait(until.urlContains(this.baseHref), timeout, 'Wait to move to different origin')
        return await browser.wait(until.urlContains(this.pageUrl), timeout, 'Wait for RegisterPage to load')
    }

    get usernameField(): WebElementPromise {
        return browser.driver.findElement(by.name('Input.Username'))
    }

    get emailField(): WebElementPromise {
        return browser.driver.findElement(by.name('Input.Email'))
    }

    get passwordField(): WebElementPromise {
        return browser.driver.findElement(by.name('Input.Password'))
    }

    get confirmPasswordField(): WebElementPromise {
        return browser.driver.findElement(by.name('Input.ConfirmPassword'))
    }

    get consentCheckBox(): WebElementPromise {
        return browser.driver.findElement(by.name('Input.Consent'))
    }

    get loginButton(): WebElementPromise {
        return browser.driver.findElement(by.css('.col-md-4 button.btn-primary'))
    }
}
