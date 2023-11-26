describe('UserForm Component', () => {
  it('should login with valid credentials', () => {
    // Visit the page where the UserForm component is rendered
    cy.visit('/login');

    // Interact with form elements
    cy.get('[id="email"]').type('gestorfrota@robdronego.com');
    cy.get('[id="password"]').type('pass123');

    // Click the Login button
    cy.get('[id="login-btn"]').click();

    // Assert that the page redirects to the dashboard
    cy.url().should('include', '/dashboard');
  });

  it('should display an error message with invalid credentials', () => {
    // Visit the page where the UserForm component is rendered
    cy.visit('/login');

    // Interact with form elements
    cy.get('[id="email"]').type('invalid@example.com');
    cy.get('[id="password"]').type('invalidpassword');

    // Click the Login button
    cy.get('[id="login-btn"]').click();

  });
});
