/// <reference types="cypress" />

describe('BuildingForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestorcampus@robdronego.com');
        cy.get('[id="password"]').type('pass123');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-buildings"]').click();
      

    });

    it('should add a new building', () => {
        // Visit the page where the BuildingForm component is rendered
        
        const code = generateRandomValue(); // gen random code

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="building-name-input"]').type('New Building');
        cy.get('[data-testid="building-code-input"]').type(code);
        cy.get('[data-testid="building-dimensions-input"]').type('10x20');

        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Check if the new building is displayed in the list
        cy.contains('Building added successfully');
    });
   
});

function generateRandomValue() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  let result = '';
  const length = Math.floor(Math.random() * 5) + 1; // Random length between 1 and 5

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}