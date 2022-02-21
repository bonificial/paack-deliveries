describe("delivery infor page", () => {
  it("disables/enables buttons accordingly depending on delivery status", () => {
    let test_ids_for_delivered_deliveries = [9]; // <- Pass a custom id here for an order which you are sure is undelivered, for other statuses, the test will fail

    cy.visit(`/details/${test_ids_for_delivered_deliveries[0]}`);

    //When Status os Idle, button to Mark delivery as active should be enabled
    if (cy.get("body").contains(/Status: undelivered/i)) {
      //The Mark active button should now be disabled
      cy.get('[data-testid="mark-active"]').should("be.disabled");

      //Buttons to mark the deliveries as delivered/not should now be hidden
      cy.get('[data-testid="mark-delivered"]').should("be.hidden");
      cy.get('[data-testid="mark-undelivered"]').should("be.hidden");
    }
  });
});
