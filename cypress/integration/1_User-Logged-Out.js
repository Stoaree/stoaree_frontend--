describe("1.0_User-Logged-Out", function() {
  it("Tests user logged out Navbar functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Home").click();
    cy.contains("Login").click();
    cy.contains("Sign up").click();
  });

  it("Buttons work when pressed multiple times (Home)", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Home").click();
    cy.contains("Home").click();
    cy.contains("Home").click();
    cy.contains("Home").click();
    cy.contains("Home").click();
  });

  it("Buttons work when pressed multiple times (Login)", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.contains("Login").click();
    cy.contains("Login").click();
    cy.contains("Login").click();
    cy.contains("Login").click();
  });

  it("Buttons work when pressed multiple times (Sign up)", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign up").click();
    cy.contains("Sign up").click();
    cy.contains("Sign up").click();
    cy.contains("Sign up").click();
    cy.contains("Sign up").click();
  });

  it("Tests user logged out searchbar (Story Titles) functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("My Grandfather Fought on Normandy Beach {enter}");
    cy.wait(500);
    cy.get("a[class=story-title-card]").should(
      "have.text",
      "My Grandfather Fought on Normandy Beach "
    );
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type(
      "My dad won the 1981 VFL Grand Final{enter}"
    );
    cy.wait(500);
    cy.get("a[class=story-title-card]").should(
      "have.text",
      "My dad won the 1981 VFL Grand Final "
    );
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type(
      "My Grandmother feeds he homeless on the streets of Sydney{enter}"
    );
    cy.wait(500);
    cy.get("a[class=story-title-card]").should(
      "have.text",
      "My Grandmother feeds he homeless on the streets of Sydney"
    );
    cy.get("input[name=searchInput]").clear();
  });

  it("Tests user logged out searchbar (Search by description) functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("ngoer{enter}");
   cy.wait(500);
    cy.get("p[class=description-text-card]").should("have.text",
      "ngoer",
    );
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("In 1982 my Father won the record for most goals kicked at a VFL Grand Final{enter}");
    cy.wait(500);
     cy.get("p[class=description-text-card]").should("have.text",
       "In 1982 my Father won the record for most goals kicked at a VFL Grand Final ",
     );
     cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("ths isa etc{enter}");
    cy.wait(500);
     cy.get("p[class=description-text-card]").should("have.text",
       "Ths isa etc",
     );
    cy.get("input[name=searchInput]").clear();
  });

  it("Tests user logged out Searchbar (Search by tags) functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("sport{enter}");
    cy.wait(500);
    cy.contains("Test").click();
    cy.get("p[class=descriptionText]").should("have.text", "Sport");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("sport{enter}");
    cy.wait(500);
    cy.contains("Test STORY Howie").click();
    cy.get("p[class=descriptionText]").should("have.text", "Sport");
    cy.get("input[name=searchInput]").clear();
    

  });

  it("Tests user logged out searchbar functionality", function() {
    cy.visit("http://localhost:3000/");

    cy.get("input[name=searchInput]").type("description{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("normandy{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("1982{enter}");
    cy.get("input[name=searchInput]").clear();
  });

  it("Tests user logged out searchbar (Story description text) functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("ngoer{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("stormed{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("record{enter}");
    cy.get("input[name=searchInput]").clear();
  });

  it("Tests user logged out searchbar (Story Tags) functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("Hero{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("Homeless{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("Sport{enter}");
    cy.get("input[name=searchInput]").clear();
  });

  it("Tests user logged out search functionality", function() {
    cy.visit("http://localhost:3000/");
    cy.get("input[name=searchInput]").type("john{enter}");
    cy.expect;
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("pizza{enter}");
    cy.get("a[story=title-card]").should("not.have.text");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("desk{enter}");
    cy.get("input[name=searchInput]").clear();
    cy.get("input[name=searchInput]").type("gun{enter}");
    cy.get("input[name=searchInput]").clear();
  });
});
