describe('Wikipedia Acciones', () => {

  beforeEach(() => {
    cy.visit('https://www.wikipedia.org/');
  });

  it('Deberia buscar un tema y verificar resultados de búsqueda.', () => {
    cy.get('input[name="search"]').type('Cypress (testing framework)');
    cy.get('button[type="submit"]').click();
    cy.contains('Cypress (testing framework)').should('be.visible');
  });

  it('Verifica que un artículo contiene imagenes', () => {
    cy.get('input[name="search"]').should('not.be.disabled').type('JavaScript');
    cy.get('button[type="submit"]').click();
  
    cy.contains('JavaScript').click({ force: true });
    cy.url().should('include', 'JavaScript');
    // Verifica al menos una imagen
    cy.get('img').should('have.length.greaterThan', 0);
  });
  
  it('Verifica el cambio de idioma a inglés', () => {
    cy.contains('English').click();
    cy.url().should('include', 'en.wikipedia.org');
  });

});
