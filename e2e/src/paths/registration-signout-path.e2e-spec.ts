import { browser, by, element, ExpectedConditions } from 'protractor'
import { AddRecommendationPage } from '../pages/add-recommendation/AddRecommendation.po'
import { MainPage } from '../pages/mainpage/Mainpage.po'
import { RegisterPage } from '../pages/RegisterPage'


describe('A journey to create and account, access the system and log out', () => {

    const mainPage = new MainPage()
    const registerPage = new RegisterPage()
    const recommendationPage = new AddRecommendationPage()

    beforeEach(async () => {
        await browser.restart()
    })

    afterEach(async () => {
        await registerPage.expectNoBrowserErrors()
    })

    const sampleUsername = 'testof' + Date.now()
    const sampleEmail = sampleUsername + '@mymail.me'
    const samplePassword = 'LettersNumb3rs!'


    it('allows me to create an account and use it', async () => {
        // Main page
        await mainPage.navigateTo()
        await mainPage.signUpLink.click()
        await browser.waitForAngularEnabled(false)

        // Register page
        await registerPage.waitToLoad()
        await registerPage.usernameField.sendKeys(sampleUsername)
        await registerPage.emailField.sendKeys(sampleEmail)
        await registerPage.passwordField.sendKeys(samplePassword)
        await registerPage.confirmPasswordField.sendKeys(samplePassword)
        await registerPage.consentCheckBox.click()

        await registerPage.loginButton.click()

        // Main page
        await mainPage.waitToLoad()
        expect(mainPage.userDropdown.getText()).toContain(sampleUsername)
        expect(await mainPage.signUpLink.isPresent()).toBe(false)

        // Try to load AddRecommendationPage
        await mainPage.addRecommendationButton.click()
        await recommendationPage.waitToLoad()

        // Logout and return to Main page
        await mainPage.userDropdown.click()
        await mainPage.logoutbutton.click()
        await browser.sleep(1500)
        await mainPage.waitToLoad()
    })

})
