import { BankAccounts } from '../../pages/accounts';

let invalidRoutingNumber = 'test';
let shortAccountNumber = '123';
let longAccountNumber = '1234567890987654321';

describe('Bank Accounts page', function () {
    beforeEach(function () {
        cy.task('db:seed');
        cy.fixture('users.json')
            .as('users')
            .then(function (users) {
                cy.loginApi(users.userEdgar.username, users.userEdgar.password);
            });
        cy.fixture('alerts.json').as('alerts');
        cy.fixture('accounts.json').as('accounts');
        cy.visit('/bankaccounts');
    });
    it('shows list of accounts', function () {
        BankAccounts.getBankAccounts().should('contain', this.accounts.EdgarAccount.name);
    });
    it('allows user to create new account', function () {
        BankAccounts.clickCreateButton();
        BankAccounts.typeBankName(this.accounts.TestBankAccount.name);
        BankAccounts.typeRoutingNumber(this.accounts.TestBankAccount.routingNumber);
        BankAccounts.typeAccountNumber(this.accounts.TestBankAccount.accountNumber);
        BankAccounts.clickSaveButton();

        BankAccounts.getBankAccounts().should('contain', this.accounts.TestBankAccount.name);
    });
    it('allows user to delete an existing account', function () {
        BankAccounts.clickDeleteButton(this.accounts.EdgarAccount.name);

        BankAccounts.getBankAccounts().should(
            'contain',
            `${this.accounts.EdgarAccount.name} (Deleted)`
        );
    });
    it('validates empty inputs for Create Bank Account form', function () {
        BankAccounts.clickCreateButton();
        BankAccounts.clearBankNameInput();
        BankAccounts.clearRoutingInput();
        BankAccounts.clearAccountInput();
        BankAccounts.clearRoutingInput();

        BankAccounts.getCreateForm()
            .should('contain', this.alerts.emptyBankName)
            .and('contain', this.alerts.emptyRoutingNumber)
            .and('contain', this.alerts.emptyAccountNumber);
        BankAccounts.getSaveButton().should('be.disabled');
    });
    it('validates incorrect routing and account numbers', function () {
        BankAccounts.clickCreateButton();
        BankAccounts.typeRoutingNumber(invalidRoutingNumber);
        BankAccounts.typeAccountNumber(shortAccountNumber);

        BankAccounts.getCreateForm()
            .should('contain', this.alerts.invalidRoutingNumber)
            .and('contain', this.alerts.shortAccountNumber);

        BankAccounts.typeAccountNumber(longAccountNumber);
        BankAccounts.getCreateForm().should('contain', this.alerts.longAccountNumber);
    });
});
