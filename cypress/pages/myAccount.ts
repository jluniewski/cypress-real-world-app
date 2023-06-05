export class MyAccount {
    static getUserSettingsForm() {
        return cy.contains('User Settings').parent();
    }
    static getName() {
        return cy.getByDataTest('user-settings-firstName-input');
    }
    static clearName() {
        return this.getName().clear();
    }
    static typeName(name) {
        this.clearName().type(name);
    }
    static getLastName() {
        return cy.getByDataTest('user-settings-lastName-input');
    }
    static clearLastName() {
        return this.getLastName().clear();
    }
    static typeLastName(lastName) {
        this.clearLastName().type(lastName);
    }
    static getEmail() {
        return cy.getByDataTest('user-settings-email-input');
    }
    static clearEmail() {
        return this.getEmail().clear();
    }
    static typeEmail(email) {
        this.clearEmail().type(email);
    }
    static getPhone() {
        return cy.getByDataTest('user-settings-phoneNumber-input');
    }
    static clearPhone() {
        return this.getPhone().clear();
    }
    static typePhone(phone) {
        this.clearPhone().type(phone);
    }
    static getSaveButton() {
        return cy.getByDataTest('user-settings-submit');
    }
    static clickSaveButton() {
        this.getSaveButton().click();
    }
}