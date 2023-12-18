/// <reference types="cypress" />

describe('TaskTypeForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestortarefas@isep.ipp.pt');
        cy.get('[id="password"]').type('Pa$$w0rd!!');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-tasktypes"]').click();
    });

    it('should add a new task type', () => {

        // Intercept the API request to mock the response
        cy.intercept('POST', '/api/tasktypes', {
            statusCode: 201,
            body: { success: true },
        }).as('addTT');

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="tt-name-input"]').type('New Task Type name');
        cy.get('[data-testid="tt-description-input"]').type('New Task Type description');

        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Wait for the API request to complete
        cy.wait('@addTT').then((xhr) => {
            expect(xhr.response.statusCode).to.equal(201);
        });

        // Check if the new building is displayed in the list
        cy.contains('Task Type added successfully');
    });
});
