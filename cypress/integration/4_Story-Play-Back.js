describe("4.0_Story-Play-Back", function() {
it("Logs in successfully", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("james@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.wait(500);
    cy.get("div[class=user-div]").should("have.text", "James19991");
    cy.getCookie("stoaree").should("exist");
});
it("Playback logged in", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("james@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.wait(500);
    cy.get("div[class=user-div]").should("have.text", "James19991");
    cy.getCookie("stoaree").should("exist");
    cy.contains("My Grandfather Fought on Normandy Beach").click();
    cy.contains("Play").click();
    cy.wait(1500); 
    cy.contains("Pause").click();
    cy.wait(1500); 
    cy.contains("Play").click();
    cy.wait(1500); 
    cy.contains("Pause").click();



});
});
