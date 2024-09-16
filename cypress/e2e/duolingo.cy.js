describe('Duolingo Tests', () => {
  const username = Cypress.env('email');
  const password = Cypress.env('password');

  function login() {
    cy.visit('https://www.duolingo.com');
    cy.url().then((url) => {
      if (url.includes('/learn')) {
        cy.log('Already logged in');
        return;
      }
      
      cy.contains('button', 'I ALREADY HAVE AN ACCOUNT', { timeout: 10000 }).click();
      
      cy.get('input[data-test="email-input"], [data-test="login-username"]', { timeout: 10000 }).type(username);
      cy.get('input[data-test="password-input"], [data-test="login-password"]', { timeout: 10000 }).type(password, { log: false });
      cy.get('button[data-test="register-button"], [data-test="login-button"]', { timeout: 10000 }).click();
      
      cy.url({ timeout: 20000 }).should('include', '/learn');
    });
  }

  beforeEach(() => {
    cy.session('duolingo', login);
  });

  it('Estar logeado', () => {
    cy.visit('https://www.duolingo.com/learn');
    cy.get('[data-test="more-nav"]', { timeout: 10000 }).should('be.visible');
  });

  it('Presionar en una lección', () => {
    cy.visit('https://www.duolingo.com/learn');
    cy.get('div[role="button"]', { timeout: 10000 }).first().click();
    cy.get('button[data-test*="skill-path-level"]', { timeout: 10000 }).first().click();
    cy.get('div:contains("EMPEZAR"), div:contains("START")', { timeout: 10000 }).should('be.visible');
    // cy.get('div:contains("EMPEZAR"), div:contains("START")', { timeout: 10000 }).first().click();
  });

  it('Ver el leaderboard', () => {
    cy.visit('https://www.duolingo.com/leaderboard');
    cy.get('[data-test="leaderboard"], ._1_p4S', { timeout: 10000 }).should('be.visible');
  });
});