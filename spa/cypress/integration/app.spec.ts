describe('My Next.js App', () => {
    it('should load the home page', () => {
      cy.visit('/');
      cy.get('h1').should('contain', 'Welcome to My Next.js App');
    });
  
    it('should navigate to about page', () => {
      cy.visit('/');
      cy.get('a').contains('About').click();
      cy.url().should('include', '/about');
      cy.get('h1').should('contain', 'About Us');
    });
  });
  