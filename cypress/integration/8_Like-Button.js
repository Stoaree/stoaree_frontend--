describe("8.0_Like-Button", function() {

    it("Logged out- - Logged in Like button", function() {
        cy.visit("http://localhost:3000/");
        cy.contains("My Grandfather Fought on Normandy Beach").click();
    
    
    
    });

    it("Logged in - - Logged in Like button", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.get("input[name=email]").type("jared@test.com");
    cy.get("input[name=password]").type("password{enter}");
    cy.wait(500);
    cy.get("div[class=user-div]").should("have.text", "Jazz");
    cy.getCookie("stoaree").should("exist");
    cy.contains("My Grandfather Fought on Normandy Beach").click();
    cy.get("textarea[name=text]").type("My Grandfather Fought on Normandy Beach tooooooo!!!!!"); 
    cy.contains("Post Comment").click();


});
});
