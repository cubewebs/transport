/// <reference types="cypress" />

Cypress.Commands.add('getByField', (selector) => {
    return cy.get(`${selector}`)
})