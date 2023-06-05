export class General {
  static getAlert() {
    return cy.get('[role="alert"]');
  }
  static reloadPage() {
    cy.reload();
  }
}
