/// <reference types="cypress" />

describe('RobotTypeForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestorfrota@isep.ipp.pt');
        cy.get('[id="password"]').type('Pa$$w0rd!!');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-robottypes"]').click();
    });

    it('should add a new robot types', () => {

        // Intercept the API request to mock the response
        cy.intercept('POST', '/api/robottypes', {
            statusCode: 201,
            body: { success: true },
        }).as('addRobotType');

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="rt-name-input"]').type('Name');
        cy.get('[data-testid="rt-brand-input"]').type('Brand');
        cy.get('[data-testid="rt-model-input"]').type('Model');

        // Wait for the taskType select box to be available
        cy.get('[id="taskType-sb"]').should('exist');
        // Select the first taskType option from the dynamically populated select box
        cy.get('[id="taskType-sb"]').then(($select) => {
            // Get the first option available in the select box
            const firstOptionValue = $select.find('option').eq(1).val();
            // Select the first option in the taskType select box
            cy.get('[id="taskType-sb"]').select(firstOptionValue);
        });

        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Wait for the API request to complete
        cy.wait('@addRobotType').then((xhr) => {
            expect(xhr.response.statusCode).to.equal(201);
        });

        // Check if the new building is displayed in the list
        cy.contains('Robot Type added successfully');
    });
});

