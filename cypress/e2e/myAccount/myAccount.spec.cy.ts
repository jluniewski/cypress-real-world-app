import { General } from "../../pages/general";
import { MyAccount } from "../../pages/myAccount";

let incorrectEmail = "test";
let incorrectPhone = "000";

describe('My Account', function() {
    beforeEach(function() {
        cy.task('db:seed');
        cy.fixture('users.json').as('users').then(function(users){
            cy.loginApi(users.userEdgar.username, users.userEdgar.password);
        });
        cy.fixture('alerts.json').as('alerts');
        cy.visit('/user/settings');
    })
    it('shows user settings', function () {
        MyAccount.getName().should('have.value', this.users.userEdgar.name);
        MyAccount.getLastName().should('have.value', this.users.userEdgar.lastname);
        MyAccount.getEmail().should('have.value', this.users.userEdgar.email);
        MyAccount.getPhone().should('have.value', this.users.userEdgar.phone);
    })
    it('allows user to edit settings', function () {
        MyAccount.typeName(this.users.userEdgarEdit.name);
        MyAccount.typeLastName(this.users.userEdgarEdit.lastname);
        MyAccount.typeEmail(this.users.userEdgarEdit.email);
        MyAccount.typePhone(this.users.userEdgarEdit.phone);
        MyAccount.clickSaveButton()
        General.reloadPage()

        MyAccount.getName().should('have.value', this.users.userEdgarEdit.name);
        MyAccount.getLastName().should('have.value', this.users.userEdgarEdit.lastname);
        MyAccount.getEmail().should('have.value', this.users.userEdgarEdit.email);
        MyAccount.getPhone().should('have.value', this.users.userEdgarEdit.phone);
    })
    it('validates empty user settings form', function () {
        MyAccount.clearName();
        MyAccount.clearLastName();
        MyAccount.clearEmail();
        MyAccount.clearPhone();

        MyAccount.getUserSettingsForm()
            .should('contain', this.alerts.accountEmptyFirstName)
            .and('contain', this.alerts.accountEmptyLastName)
            .and('contain', this.alerts.accountEmptyEmail)
            .and('contain', this.alerts.accountEmptyPhone);
        MyAccount.getSaveButton().should('be.disabled');
    })
    it('validates incorrect email and phone number', function () {
        MyAccount.typeEmail(incorrectEmail);
        MyAccount.typePhone(incorrectPhone);

        MyAccount.getUserSettingsForm()
            .should('contain', this.alerts.accountIncorrectEmail)
            .and('contain', this.alerts.accountIncorrectPhone);
        MyAccount.getSaveButton().should('be.disabled');
    })
})