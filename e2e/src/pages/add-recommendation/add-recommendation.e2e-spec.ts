import { browser, by, element, ExpectedConditions } from 'protractor'
import { AddRecommendationPage } from './AddRecommendation.po'

describe('Add recommendation page', () => {
  const page = new AddRecommendationPage()

  afterEach(async () => {
    page.expectNoBrowserErrors()
  })


})
