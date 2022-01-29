describe("Visitor can see a single article", () => {
  before(() => {
    cy.intercept("GET", "/api/articles", { fixture: "articleIndex.json" }).as(
      "getArticles"
    );
    cy.intercept("GET", "/api/articles/**", {
      fixture: "articleShowResponse.json",
    }).as("getArticle");

    cy.visit("/");
    cy.wait("@getArticles");
    cy.get("[data-testid=article-0]").click();
  });

  it("is expected to make a GET request to the API", () => {
    cy.wait("@getArticle").its("request.method").should("eq", "GET");
  });

  it("is expected to display article title", () => {
    cy.get("[data-testid=article-title]").should(
      "contain",
      "The Grapes of Wrath"
    );
  });

  it("is expected to display article body", () => {
    cy.get("[data-testid=article-body]").should(
      "contain",
      "Often people, especially computer engineers, focus on the machines. But in fact we need to focus on humans, on how humans care about doing programming or operating the application of the machines."
    );
  });

  it("is expected to display article published date", () => {
    cy.get("[data-testid=article-created]").should(
      "contain",
      "January 26, 2022 16:30"
    );
  });

  it("is expected to display article author", () => {
    cy.get("[data-testid=article-author]").should("contain.text", "Gayle Bosco");
  });
});