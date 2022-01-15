/// <reference types="cypress" />
describe('Main', () => {
  it('should display header text', () => {
    cy.visit('/about')
    cy.contains('p', 'Welcome to the about page')
  })
})
