describe("6.0_Create-Story", function() {
    it("Try to comment without logging in", function() {
        cy.visit("http://localhost:3000/");
        cy.contains("Create your story").click();
    
    });




});