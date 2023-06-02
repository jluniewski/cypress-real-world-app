import { Transactions } from "../../pages/transactions";

describe('New Transaction', function() {
    beforeEach(function () {
        cy.task('db:seed');
        cy.fixture('users.json').as('users').then(function(users){
            cy.loginApi(users.userEdgar.username, users.userEdgar.password);
        });
        cy.visit('/');
        Transactions.newTransaction();
    })
    it('can be added with Request action', function () {

    })
    it('searches for a user in Select Contact section', function () {
        Transactions.typeNewContactSearch(this.users.userArely)
    })
    it('can be added with Pay action', function () {

    })
    it('can be added multiple times in a row', function () {

    })
})