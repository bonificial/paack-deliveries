describe("deliveries page", () => {
  it("is loading deliveries", () => {
    //Load Page
    // eslint-disable-next-line no-undef
    cy.visit("/");

    //select all delivery listing items to count

    /************   Test Filters *****************/

    /**** Disable All Filter Checkboxes  ********/

    cy.get('[data-testid^="check_enable"]').click({ multiple: true }); //Click Each Checkbox to Disable them

    cy.get(".single-delivery-list-item").should("have.length", 0); //  No delivery should be visible at this point

    /**** Enable Filters One By One and ensure only the deliveries with the respective statuses are shown  ********/

    cy.get('[data-testid="check_enable_delivered"]').click(); //Enable the "Delivered" Filter

    cy.get(".single-delivery-list-item")
      .its("length")
      .then((size) => {
        cy.get("[data-status='delivery_is_done']").should("have.length", size);
      });

    cy.get('[data-testid="check_enable_delivered"]').click(); //Disable the "Delivered" Filter
    cy.get('[data-testid="check_enable_undelivered"]').click(); //Enable the "unDelivered" Filter

    cy.get(".single-delivery-list-item")
      .its("length")
      .then((size) => {
        cy.get("[data-status='delivery_not_done']").should("have.length", size);
      });

    cy.get('[data-testid="check_enable_idle"]').click(); //Enable the "Idle" Filter
    cy.get('[data-testid="check_enable_undelivered"]').click(); //Disable the 'undelivered' filter
    cy.get(".single-delivery-list-item")
      .its("length")
      .then((size) => {
        cy.get("[data-status='delivery_is_idle']").should("have.length", size);
      });
  });

  /*******Test Redirects to Correct Delivery Details Page *******/

  let random_delivery_id = Math.floor(Math.random() * 101);
  it("is redirected to the details page on clicking any of the Individual Delivery Links", () => {
    /* Reenable all filters, to ensure any id value between 1 and 100 is not left out */
    cy.get('[data-testid="check_enable_undelivered"]').click(); //Enable the 'undelivered' filter
    cy.get('[data-testid="check_enable_delivered"]').click(); //Enable the 'undelivered' filter

    cy.get(`[data-id='${random_delivery_id}']`).click();

    cy.contains("Delivery Information").should("be.visible");

    cy.url().should("contain", `/details/${random_delivery_id}`);
  });
});
