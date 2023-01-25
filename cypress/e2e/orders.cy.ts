describe('orders page', () => {
  it('the h3 contains the correct text', () => {
    cy.visit('http://localhost:4200')
    cy.get('h3').contains('All Orders')
  })
})

it.only('the order table columns on the orders page are correct', () => {
  cy.visit('http://localhost:4200')
  cy.get('.p-datatable-thead > tr > th').eq(0).contains('order ID')
  cy.get('.p-datatable-thead > tr > th').eq(1).contains('Sender Name')
  cy.get('.p-datatable-thead > tr > th').eq(2).contains('Email')
  cy.get('.p-datatable-thead > tr > th').eq(3).contains('Phone Number')
  cy.get('.p-datatable-thead > tr > th').eq(4).contains('Actions')
})