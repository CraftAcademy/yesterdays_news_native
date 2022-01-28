describe("A user ", () => {
  describe("can see the main view of the application", () => {
    before(() => {
      cy.intercept("GET", "/api/articles", { fixture: "articleIndex.json" }).as(
        "getArticles"
      );
      cy.viewport('samsung-s10');
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
  describe("can see an info message if no articles are available", () => {
    before(() => {
      cy.intercept("GET", "/api/articles", {
        body: { articles: [] },
        statusCode: 401,
      }).as("emptyResponse");

      cy.visit("/");
    });

    it("is expected to make a GET request to the API", () => {
      cy.wait("@emptyResponse").its("request.method").should("eq", "GET");
    });

    it("is expected to display info message", () => {
      cy.get("[data-testid=flash-message]").should(
        "contain.text",
        "We don't have articles available at the moment, please try again later."
      );
    });
  });
});
