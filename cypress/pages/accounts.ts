export class BankAccounts {
    static clickCreateButton() {
        cy.getByDataTest('bankaccount-new').click();
    }
    static clickDeleteButton(account) {
        cy.contains(account).parent().parent().getByDataTest('bankaccount-delete').click();
    }
    static getBankAccounts() {
        return cy.getByDataTest('bankaccount-list');
    }
    static getBankNameInput() {
        return cy.get('#bankaccount-bankName-input');
    }
    static clearBankNameInput() {
        return this.getBankNameInput().clear();
    }
    static typeBankName(bankName) {
        this.clearBankNameInput().type(bankName);
    }
    static getRoutingInput() {
        return cy.get('#bankaccount-routingNumber-input');
    }
    static clearRoutingInput() {
        return this.getRoutingInput().clear();
    }
    static typeRoutingNumber(routingNumber) {
        this.clearRoutingInput().type(routingNumber);
    }
    static getAccountInput() {
        return cy.get('#bankaccount-accountNumber-input');
    }
    static clearAccountInput() {
        return this.getAccountInput().clear();
    }
    static typeAccountNumber(accountNumber) {
        this.clearAccountInput().type(accountNumber);
    }
    static getSaveButton() {
        return cy.getByDataTest('bankaccount-submit');
    }
    static clickSaveButton() {
        this.getSaveButton().click();
    }
    static getCreateForm() {
        return cy.contains('Create Bank Account').parent();
    }
}
