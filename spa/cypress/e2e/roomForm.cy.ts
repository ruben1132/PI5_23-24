/// <reference types="cypress" />

describe('RoomForm Component', () => {
    beforeEach(() => {
        // Log in before running the tests
        cy.visit('/login'); // Replace with your login page URL
        cy.get('[id="email"]').type('gestorcampus@robdronego.com');
        cy.get('[id="password"]').type('pass123');
        cy.get('[id="login-btn"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('[id="open-sidebar"]').click();
        cy.get('[id="sidebar-rooms"]').click();
    });

    it('should add a new room', () => {

        // Intercept the API request to mock the response
        cy.intercept('POST', '/api/rooms', {
            statusCode: 201,
            body: { success: true },
        }).as('addRoom');

        // Open modal
        cy.get('[data-testid="open-modal"]').click();

        // Fill in the form fields
        cy.get('[data-testid="room-number-input"]').type('1');


        // Wait for the floor select box to be available
        cy.get('[data-testid="room-floor-input"]').should('exist');
        // Select the first floor option from the dynamically populated select box
        cy.get('[data-testid="room-floor-input"]').then(($select) => {
            // Get the first option available in the select box
            const firstOptionValue = $select.find('option').eq(0).val();
            // Select the first option in the floor select box
            cy.get('[data-testid="room-floor-input"]').select(firstOptionValue);
        });

        
        // Click the "Add" button in the form
        cy.get('[data-testid="add-button"]').click();

        // Wait for the API request to complete
        cy.wait('@addRoom').then((xhr) => {
            expect(xhr.response.statusCode).to.equal(201);
        });

        // Check if the new building is displayed in the list
        cy.contains('Room added successfully');
    });
});

