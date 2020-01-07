describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  it('user can login', function () {
    cy.contains('Log in')
      .click()
    cy.get('input:first')
      .type('sztxr')
    cy.get('input:last')
      .type('test')
    cy.contains('Login')
      .click()
    cy.contains('logged in')
  })  
})