

describe('add-order page', () => {
  beforeEach("visit", () => {
    cy.visit('http://localhost:4200/add-order')
  })

  it("allows users to insert the form fields", () => {

    cy.getByField('#firstName').type('Juan')
    cy.getByField('#lastName').type('Rivera')
    cy.getByField('#email').type('rivera@test.email')
    cy.getByField('#phoneNumber').type('688231445')
    cy.getByField('#address').type('Calle La Rondita 3')
    cy.getByField('#city').type('Fuengirola')
    cy.getByField('#province').type('Granada')
    cy.getByField('#country').type('España')
    cy.getByField('#zipCode').type('34228')
    cy.getByField('p-button').click()
    
  })

})

