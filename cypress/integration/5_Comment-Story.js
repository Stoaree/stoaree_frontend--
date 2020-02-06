describe("5.0_Comment-Story", function() {
    it("Try to comment without logging in", function() {
        cy.visit("http://localhost:3000/");
        cy.contains("My Dad broke a record in 1982 Grand Final").click();
        cy.get("textarea[name=text]").type("My Grandfather Fought on Normandy Beach tooooooo!!!!!"); 
        cy.contains("Post Comment").click();

    });
    it("Logged in - Comment on a story", function() {
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