describe("2.0_User-Signs-Up", function() {
  it("User signs up and clicks button", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign up").click();
    cy.get("input[name=firstName]").type("new");
    cy.get("input[name=lastName]").type("newstein");
    cy.get("input[name=displayName").type("new");
    cy.get("input[name=email]").type("new8@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.get("input[name=confirmPassword]").type("password{enter}");
    cy.get("button[class=signup-button]").click()
    cy.wait(500);
    cy.getCookie("stoaree").should("exist");
  });
});


describe("2.1_User-Sign-Up-Logs-Out-Signs-Up-Again", function() {
  it("User signs up and clicks button", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign up").click();
    cy.get("input[name=firstName]").type("new");
    cy.get("input[name=lastName]").type("newstein");
    cy.get("input[name=displayName").type("new");
    cy.get("input[name=email]").type("new9@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.get("input[name=confirmPassword]").type("password{enter}");
    cy.get("button[class=signup-button]").click()
    cy.wait(500);
    cy.getCookie("stoaree").should("exist");
    cy.contains("Sign out").click();
    cy.getCookie("stoaree").should("not.exist");
    cy.contains("Sign up").click();
    cy.get("input[name=firstName]").type("new");
    cy.get("input[name=lastName]").type("newstein");
    cy.get("input[name=displayName").type("new");
    cy.get("input[name=email]").type("new10@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.get("input[name=confirmPassword]").type("password{enter}");
    cy.get("button[class=signup-button]").click()
    cy.wait(500);
    cy.getCookie("stoaree").should("exist");
  });
});



