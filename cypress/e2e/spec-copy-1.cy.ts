describe('Login Page', () => {
  it('Should load the login page and check form elements', () => {
    // Visit the login page
    cy.visit('http://localhost:4200/');
    // Check if the page contains the language selection dropdown
    cy.get('.form-select').should('be.visible');
    // Check if the sign-in form is present
    cy.get('.form-container.sign-in').should('be.visible');
    // Check the sign-in form elements
    cy.get('.form-container.sign-in input[name="email"]').should('be.visible');
    cy.get('.form-container.sign-in input[name="password"]').should('be.visible');
    cy.get('.form-container.sign-in button[type="submit"]').should('be.visible');
  });
  it('Should log in with valid credentials', () => {
    cy.visit('http://localhost:4200/');
    // Fill in the sign-in form
    cy.get('.form-container.sign-in input[name="email"]').type('popasebi122@gmail.com');
    cy.get('.form-container.sign-in input[name="password"]').type('123');
    // Submit the form
    cy.get('.form-container.sign-in button[type="submit"]').click();
    // Verify that the user is redirected to the dashboard or a success message is shown
    cy.url().should('include', '/home');
    cy.contains('h1', 'Acasă').should('be.visible');
  });

});
