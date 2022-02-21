describe("delivery infor page", () => {
  it("disables/enables buttons accordingly depending on delivery status", () => {
    let test_ids_for_idle_deliveries = [18, 39]; // <- Pass 2 custom id here for orders which you know are in idle status, please note once you run this test, data for the first id will be updated

    cy.visit(`/details/${test_ids_for_idle_deliveries[0]}`);

    //When Status os Idle, button to Mark delivery as active should be enabled
    if (cy.get("body").contains(/Status: Idle/i)) {
      cy.get("[ data-testid='mark-active']").should("be.enabled");

      //Mark the Current Delivery as Active
      cy.get('[data-testid="mark-active"]').click(); // <-- Comment this out and the test will fail

      //try marking another delivery as active
      cy.visit(`/details/${test_ids_for_idle_deliveries[1]}`); //Navigate to another idle delivery

      //Mark active buttton here should be disabled
      cy.get('[data-testid="mark-active"]').should("be.disabled");

      //Go back to our initial Delivery, note we dont use the cy.visit() but instead use a link provided in the navbar
      cy.get('[data-testid="view_active_delivery"]').click();

      //Ensure we were brought back to the correct delivery information page
      cy.url().should("contain", `/details/${test_ids_for_idle_deliveries[0]}`);

      // An explicit statement denoting the delivery as active should now appear
      cy.findByText("Current Active Delivery").should("be.visible");

      //Buttons to mark the deliveries as delivered/not should now be visible
      cy.get('[data-testid="mark-delivered"]').should("be.visible");
      cy.get('[data-testid="mark-undelivered"]').should("be.visible");

      //Try Marking the Delivery as Undelivered
      cy.get('[data-testid="mark-undelivered"]').click();

      cy.wait(5000); // Wait for about 5 Seconds, to give time for the API REQUEST TO FINISH

      //Go to home page to ensure that the delivery is no longer marked as 'idle', but instead is in 'undelivered'
      cy.get('[data-testid="go_home"]').click();

      cy.wait(5000); // Wait for about 5 Seconds, to give time for the API REQUEST TO FINISH
      cy.get(`[data-id="${test_ids_for_idle_deliveries[0]}"]`).should(
        "have.attr",
        "data-status",
        "delivery_not_done"
      );
      //Go back to the delivery page of the order we marked active
      cy.get(`[data-id="${test_ids_for_idle_deliveries[0]}"]`).click();
      //Buttons to mark the deliveries as delivered/not should now be invisible
      cy.get('[data-testid="mark-delivered"]').should("be.hidden");
      cy.get('[data-testid="mark-undelivered"]').should("be.hidden");

      //The Mark active button should now be disabled
      cy.get('[data-testid="mark-active"]').should("be.disabled");
    } else {
      cy.get("[ data-testid='mark-active']").should("be.disabled");
    }
  });
});
