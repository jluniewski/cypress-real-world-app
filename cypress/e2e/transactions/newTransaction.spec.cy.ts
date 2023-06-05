import { Transactions } from "../../pages/transactions";
import { General } from "../../pages/general";

describe('New Transaction', function() {
    beforeEach(function () {
        cy.task('db:seed');
        cy.fixture('users.json').as('users').then(function(users){
            cy.loginApi(users.userEdgar.username, users.userEdgar.password);
        });
        cy.fixture('transactions.json').as('transactions');
        cy.fixture('alerts.json').as('alerts');
        cy.visit('/');
        Transactions.newTransaction();
    })
    it('can be added with Request action', function () {
        Transactions.selectUser(this.users.userArely);
        Transactions.typeAmount(this.transactions.newTransactionRequest.amount);
        Transactions.typeNote(this.transactions.newTransactionRequest.note);
        Transactions.clickRequestButton();

        General.getAlert().should('contain', this.alerts.transactionAdded);
        Transactions.getCompleteForm()
        .should('contain', this.users.userArely.name)
        .and('contain', this.users.userArely.lastname)
        .and('contain', this.transactions.newTransactionRequest.amount)
        .and('contain', this.transactions.newTransactionRequest.note);

        Transactions.clickReturnToTransactions();
        Transactions.getTransaction(
			this.users.userEdgar.userId,
			this.users.userArely.userId,
			this.transactions.newTransactionRequest.amount
		).should('be.visible');
    })
    it('searches for a user in Select Contact section', function () {
        Transactions.typeNewContactSearch(this.users.userArely);
       
        Transactions.getUsersList()
            .should('contain', this.users.userArely.name)
            .and('contain', this.users.userArely.lastname)
            .and('contain', this.users.userArely.username)
            .and('contain', this.users.userArely.email)
            .and('contain', this.users.userArely.phone)
    })
    it('validates Payment section form', function () {
        Transactions.selectUser(this.users.userKaylin);
        Transactions.clickAmount();
        Transactions.clickNote();
        Transactions.clickAmount();
        
        Transactions.getPaymentForm()
            .should('contain', this.alerts.emptyAmount)
            .and('contain', this.alerts.emptyNote);
    })
    it('can be added with Pay action', function () {
        Transactions.selectUser(this.users.userIbrahim);
        Transactions.typeAmount(this.transactions.newTransactionPay.amount);
        Transactions.typeNote(this.transactions.newTransactionPay.note);
        Transactions.clickPayButton();

        General.getAlert().should('contain', this.alerts.transactionAdded);
        Transactions.getCompleteForm()
        .should('contain', this.users.userIbrahim.name)
        .and('contain', this.users.userIbrahim.lastname)
        .and('contain', this.transactions.newTransactionPay.amount)
        .and('contain', this.transactions.newTransactionPay.note);

        Transactions.clickReturnToTransactions();
        
        Transactions.getTransaction(
			this.users.userEdgar.userId,
			this.users.userIbrahim.userId,
			this.transactions.newTransactionPay.amount
		).should('be.visible');
    })
    it('can be added multiple times in a row', function () { 
        Transactions.selectUser(this.users.userKaylin);
        Transactions.typeAmount(this.transactions.newTransactionMultiple.amount);
        Transactions.typeNote(this.transactions.newTransactionMultiple.note);
        Transactions.clickPayButton();
        Transactions.clickCreateAnother();

        Transactions.selectUser(this.users.userKaylin);
        Transactions.typeAmount(this.transactions.newTransactionMultiple2.amount);
        Transactions.typeNote(this.transactions.newTransactionMultiple2.note);
        Transactions.clickPayButton();
        Transactions.clickReturnToTransactions();

        //Transactions are not shown only in Cypress, manually it works correctly
        Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userKaylin.userId,
			this.transactions.newTransactionMultiple.amount
		).should('be.visible');
        Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userKaylin.userId,
			this.transactions.newTransactionMultiple2.amount
		).should('be.visible');
    })
})