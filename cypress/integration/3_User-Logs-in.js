describe("3.0_User-Logs-in", function() {
  it("Logs in incorrectly", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("Luke@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.get("div[class=error]").should(
      "have.text",
      "ERROR: Incorrect email or password"
    );
  });

  it("Logs in successfully", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("james@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.wait(500);
    cy.get("div[class=user-div]").should("have.text", "James19991");
    cy.getCookie("stoaree").should("exist");
  });

  it("Logs out successfully", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("luke@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.get("div[class=user-div]").should("have.text", "Dawso");
    cy.contains("Sign out").click();
    cy.getCookie("stoaree").should("not.exist");
  });

  it("Buttons work once logged in", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("jared@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.contains("Login").click();
    cy.contains("Home").click();
 
  });
});
