describe("A user can see the main view of the application", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/articles", { fixture: "articleIndex.json" }).as(
      "getArticles"
    );
    cy.visit("/");
  });

  it("is expected to make a GET request to the API", () => {
    cy.wait("@getArticles").its("request.method").should("eq", "GET");
  });

  it("is expected to see article title", () => {
    cy.get("[data-testid=article-collection]")
      .children()
      .first()
      .within(() => {
        cy.get("[data-testid=article-title]").should(
          "contain",
          "The Doors of Perception"
        );
      });
  });
});
