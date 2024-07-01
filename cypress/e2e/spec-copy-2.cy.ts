describe('Language Change Functionality', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:4200/');
  });

  it('Should display the login page in Romanian by default', () => {
    // Verify that the page is initially in Romanian
    cy.contains('h1', 'Conectează-te').should('be.visible');
    cy.get('.form-container.sign-in input[placeholder="Email"]').should('be.visible');
    cy.get('.form-container.sign-in input[placeholder="Parolă"]').should('be.visible');
    cy.contains('button', 'Conectează-te').should('be.visible');
  });

  it('Should change the language to English and verify localization', () => {
    // Change the language to English
    cy.get('.form-select').select('en');

    // Verify that the text changes to English
    cy.contains('h1', 'Sign In').should('be.visible');
    cy.get('.form-container.sign-in input[placeholder="Email"]').should('be.visible');
    cy.get('.form-container.sign-in input[placeholder="Password"]').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });
});
