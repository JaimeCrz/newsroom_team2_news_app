describe("User Interface:", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays first header header", () => {
    cy.get("#tagline").should("contain", "A source of work / life inspiration for young professionals.");
  });
});