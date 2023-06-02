import { Transactions } from '../../pages/transactions';

describe('Transactions', function () {
	beforeEach(function () {
		cy.task('db:seed');
		cy.fixture('users.json')
			.as('users')
			.then(function (users) {
				cy.loginApi(users.userEdgar.username, users.userEdgar.password);
			});
		cy.fixture('transactions.json').as('transactions');
		cy.visit('/');
	});
	it('showing Everyone list', function () {
		Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userArely.userId,
			this.transactions.everyone.amount
		).should('be.visible');
	});
	it('showing Friends list', function () {
		Transactions.selectTab('Friends');
		Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userArely.userId,
			this.transactions.friends.amount
		).should('be.visible');
	});
	it('showing Mine list', function () {
		Transactions.selectTab('Mine');
		Transactions.getTransaction(
			this.users.userEdgar.userId,
			this.users.userIbrahim.userId,
			this.transactions.personal.amount
		).should('be.visible');
	});
	it.skip('filtered by date', function () {
		//TODO selecting date doesnt work correctly
		Transactions.selectDates('2020-04-13', '2020-04-15');
		Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userArely.userId,
			this.transactions.everyone.amount
		).should('be.visible');
	});
	it('filtered by amount', function () {
		Transactions.selectAmount(30, 150);
		Transactions.getTransaction(
			this.users.userKaylin.userId,
			this.users.userArely.userId,
			this.transactions.friends.amount
		).should('be.visible');
	});
});
