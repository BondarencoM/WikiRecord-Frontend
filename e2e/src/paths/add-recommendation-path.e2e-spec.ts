import { MainPage } from '../pages/mainpage/Mainpage.po'
import { browser, by, $, element, ExpectedConditions, until } from 'protractor'
import { AddRecommendationPage } from '../pages/add-recommendation/AddRecommendation.po'
import { LoginPage } from '../pages/LoginPage.po'
import { ViewRecommendationPage } from '../pages/view-recommendation/ViewRecommendation.po'

describe('A journey to add a recommendation', () => {
    const mainpage = new MainPage()
    const recommendations = new AddRecommendationPage()
    const loginpage = new LoginPage()
    const commend = new ViewRecommendationPage()


    afterEach(() => {
    mainpage.expectNoBrowserErrors()
  })

    it('support adding a persona, interest and then persona', async () => {
    await mainpage.navigateTo()
    await mainpage.addRecommendationButton.click()

    // Log in
    await browser.waitForAngularEnabled(false)
    await browser.wait(ExpectedConditions.urlContains(loginpage.pageUrl), 7000, 'Wait to open login page')
    await loginpage.usernameField.sendKeys('xtronik')
    await loginpage.passwordField.sendKeys('Pass123$')
    await loginpage.loginButton.click()


    // Add Persona
    await browser.wait(ExpectedConditions.urlContains(recommendations.pageUrl), 7000, 'Wait to open add recommendation page')
    await recommendations.inputField.sendKeys('Till')
    await recommendations.waitForSearchResults()

    const name = await recommendations.firstSearchResultName.getText()
    await recommendations.firstSearchResultButton.click()

    expect(recommendations.searchResults.count()).toEqual(0)
    recommendations.expectInPageText(name)
    recommendations.expectInPageText(/interest/i)

    // Add recommendation
    await recommendations.inputField.sendKeys('Moby Dick')
    await recommendations.waitForSearchResults()

    const interest = await recommendations.firstSearchResultName.getText()
    await recommendations.firstSearchResultButton.click()
    expect(recommendations.searchResults.count()).toEqual(0)
    recommendations.expectInPageText(interest)
    expect(recommendations.proofField.getAttribute('placeholder')).toBe('Proof')

    // Add proof
    await recommendations.proofField.sendKeys('https://example.com/proof')
    await recommendations.registerButton.click()

    // View recommendation
    await commend.waitToLoad()
    commend.expectInPageText(name)
    commend.expectInPageText(/recommends/i)
    commend.expectInPageText(interest)

  })

})
