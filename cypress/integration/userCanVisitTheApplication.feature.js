describe("A user can see the main view of the application", () => {
  before(() => {
    cy.visit("/");
  });

  it('is expected to display "Hello world" message', () => {
    cy.get("[data-testid=header]").should("contain.text", "Hello world");
  });
});
