describe("6.0_Create-Story", function() {
  it("User not logged in cannot create story", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Create your story").should("not.exist");
  });

  it("User creates a story", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("jared@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.wait(500);
    cy.contains("Create your story").click();
    cy.get("input[name=title]").type("New Story");
    cy.get("input[name=description]").type("A new story that is interesting and cool");
    cy.get("input[name=interviewee").type("Interview@interview.interview");
    cy.contains("Add Tag").click();
    cy.contains("Add Tag").click();
    cy.contains("Add Tag").click();
    cy.get("input[name=isPublic]").click()
    cy.get("input[name=isPublic]").click()
    cy.contains("Save Story").click();
  });
});

