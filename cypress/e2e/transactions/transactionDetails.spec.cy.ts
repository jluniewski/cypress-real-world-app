import { Transactions } from '../../pages/transactions';

describe('Transaction details', function () {
	beforeEach(function () {
		cy.task('db:seed');
		cy.fixture('transactions.json').as('transactions');
		cy.fixture('users.json')
			.as('users')
			.then(function (users) {
				cy.loginApi(users.userEdgar.username, users.userEdgar.password);
				cy.visit('/');
				Transactions.openTransaction(
					this.users.userEdgar.userId,
					this.users.userIbrahim.userId,
					this.transactions.everyoneComment.amount
				);
			});
	});
	it('allow user to see all all information about transaction', function () {
		Transactions.getDetailsAvatars()
			.eq(0)
			.should('have.attr', 'src', this.users.userEdgar.avatar);
		Transactions.getDetailsAvatars()
			.eq(1)
			.should('have.attr', 'src', this.users.userIbrahim.avatar);
		Transactions.getTransactionDetails().should(
			'contain',
			`${this.users.userEdgar.name} ${this.users.userEdgar.lastname}`
		);
		Transactions.getTransactionDetails().should(
			'contain',
			`${this.users.userIbrahim.name} ${this.users.userIbrahim.lastname}`
		);
		Transactions.getTransactionDetails().should(
			'contain',
			this.transactions.everyoneComment.amount
		);
		Transactions.getTransactionDetails().should(
			'contain',
			this.transactions.everyoneComment.likes
		);
		Transactions.getTransactionDetails().should(
			'contain',
			this.transactions.everyoneComment.comments.comm_1.text
		);
	});
	it('allow user to like a transaction', function () {
		Transactions.clickLikesButton();

		Transactions.getLikesCount().should('contain', this.transactions.everyoneComment.likes + 1);
		Transactions.getLikesButton().should('be.disabled');
		//TODO button can be clicked multiple times, but only in Cypress; in App it works fine
	});
	it('allow user to add a comment', function () {
		Transactions.addComment(this.transactions.newComment.comments.comm_1);

		Transactions.getTransactionDetails().should(
			'contain',
			this.transactions.newComment.comments.comm_1
		);
	});
});
