describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Eszter',
      username: 'sztxr',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in')
        .click()
      cy.get('input:first')
        .type('sztxr')
      cy.get('input:last')
        .type('test')
      cy.contains('Login')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Eszter')
    })

    it('user can log out', function () {
      cy.contains('logout')
        .click()
      cy.contains('Log in')
    })

    describe('Blog posts', function () {
      beforeEach(function () {
        cy.contains('Add a new blog')
          .click()
        cy.get('#blog-title')
          .type('E2E testing with Cypress')
        cy.get('#blog-author')
          .type('Cypress.io')
        cy.get('#blog-url')
          .type('https://www.cypress.io/')
        cy.get('#blog-submit')
          .click()
      })

      it('new blog was successfully created', function () {
        cy.contains('E2E testing with Cypress')
      })

      it('like blog', function () {
        cy.get('#blog-link')
          .click()
        cy.get('#blog-like')
          .click()
        cy.contains('likes: 1')
      })

      it('comment can be added', function () {
        cy.get('#blog-link')
          .click()
        cy.get('input:first')
          .type('This is a comment added by Cypress')
        cy.contains('add comment')
          .click()
        cy.contains('This is a comment added by Cypress')
      })

      // it('blog can be deleted', function () {
      //   cy.get('#blog-link')
      //     .click()
      //   cy.contains('Delete')
      //     .click()
      // })

      it('users page can be visited', function () {
        cy.contains('users')
          .click()
        cy.contains('Eszter')
      })
    })
  })
})