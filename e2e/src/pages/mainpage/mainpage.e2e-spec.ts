import { MainPage as MainPage } from './Mainpage.po'
import { browser, by, element } from 'protractor'

describe('Main page', () => {
  let page: MainPage

  beforeEach(() => {
    page = new MainPage()
  })

  afterEach(async () => {
    await page.expectNoBrowserErrors()
  })

  it('should display suggested personas', async () => {
    await page.navigateTo()
    await page.waitForPersonasToLoad()
    expect(page.discoveryPersonas.count()).toBeGreaterThanOrEqual(3)
  })

  it('should redirect to persona profile when clicking name', async () => {
    // Main page
    await page.navigateTo()
    await page.waitForPersonasToLoad()
    const name = await page.firstSuggestedPersonaName.getText()
    await page.firstSuggestedPersonaName.click()

    // Persona
    expect(browser.driver.getCurrentUrl()).toContain('/personas')
    expect(element(by.tagName('body')).getText()).toContain(name)
  })

})
