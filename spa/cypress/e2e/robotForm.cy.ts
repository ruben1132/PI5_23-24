/// <reference types="cypress" />

describe('RobotForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestorfrota@robdronego.com');
        cy.get('[id="password"]').type('pass123');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-robots"]').click();
    });

    it('should add a new robot', () => {

        // Intercept the API request to mock the response
        cy.intercept('POST', '/api/robots', {
            statusCode: 201,
            body: { success: true },
        }).as('addRobot');

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="robot-designation-input"]').type('New Robot');
        cy.get('[data-testid="robot-nickname-input"]').type('New Robot');
        cy.get('[data-testid="robot-sn-input"]').type('New Robot');

        // Wait for the robotType select box to be available
        cy.get('[id="robotType-sb"]').should('exist');
        // Select the first robotType option from the dynamically populated select box
        cy.get('[id="robotType-sb"]').then(($select) => {
            // Get the first option available in the select box
            const firstOptionValue = $select.find('option').eq(0).val();
            // Select the first option in the robotType select box
            cy.get('[id="robotType-sb"]').select(firstOptionValue);
        });

        cy.get('[data-testid="robot-description-input"]').type('New Robot');

        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Wait for the API request to complete
        cy.wait('@addRobot').then((xhr) => {
            expect(xhr.response.statusCode).to.equal(201);
        });

        // Check if the new building is displayed in the list
        cy.contains('Robot added successfully');
    });
});
