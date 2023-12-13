/// <reference types="cypress" />

describe('FloorForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestorcampus@robdronego.com');
        cy.get('[id="password"]').type('pass123');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-floors"]').click();
    });

    it('should add a new floor', () => {

        // Intercept the API request to mock the response
        cy.intercept('POST', '/api/floors', {
            statusCode: 201,
            body: { success: true },
        }).as('addFloor');

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="floor-information-input"]').type('New Floor');
        cy.get('[data-testid="floor-number-input"]').type("1");


        // Wait for the building select box to be available
        cy.get('[id="building-sb"]').should('exist');
        // Select the first building option from the dynamically populated select box
        cy.get('[id="building-sb"]').then(($select) => {
            // Get the first option available in the select box
            const firstOptionValue = $select.find('option').eq(0).val();
            // Select the first option in the building select box
            cy.get('[id="building-sb"]').select(firstOptionValue);
        });

        
        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Wait for the API request to complete
        cy.wait('@addFloor').then((xhr) => {
            expect(xhr.response.statusCode).to.equal(201);
        });

        // Check if the new building is displayed in the list
        cy.contains('Floor added successfully');
    });
});

