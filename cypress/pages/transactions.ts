import { recurse } from "cypress-recurse";

export class Transactions {
	static getTransaction(fromId, toId, amount) {
		return cy
			.get('li[data-test*="transaction-item"]')
			.contains(amount)
			.parentsUntil('li')
	}
	static openTransaction(fromId, toId, amount) {
		this.getTransaction(fromId, toId, amount).click();
	}
	static getSender(fromId, toId, amount) {
		return this.getTransaction(fromId, toId, amount).get('[data-test*="transaction-sender"]');
	}
	static getReceiver(fromId, toId, amount) {
		return this.getTransaction(fromId, toId, amount).get('[data-test*="transaction-receiver"]');
	}
	static selectTab(tabName) {
		var tabs = {
			Everyone: '/',
			Friends: '/contacts',
			Mine: '/personal',
		};
		cy.visit(tabs[tabName]);
	}
  static checkIfDateExists(month, date){
    if (Cypress.$(`[data-date=${date}]`).length > 0) {
      return true;
    } else {
      return false;
    }
  }
	static selectDate(date){
    recurse(
      () => {
        return cy.scrollDatePicker(); 
      },
      (n) => {
        return this.checkIfDateExists(n, date);
      },
      {
        limit: 30,
        timeout: 30000,
        delay: 200,
        log: true
      }
    );
  }
  static selectDates(startDate, endDate) {
    cy.getByDataTest('transaction-list-filter-date-range-button').click({force: true});
    this.selectDate(startDate);
    this.selectDate(endDate);
  }
  static selectAmount(min, max) {
    cy.getByDataTest('transaction-list-filter-amount-range-button').click({force: true});
    cy.getByDataTest('transaction-list-filter-amount-range-slider').click(min,0);
    cy.getByDataTest('transaction-list-filter-amount-range-slider').click(max,0);
  }
  static scrollUp() {
    cy.get('main').scrollTo('top');
  }
  static getTransactionDetails() {
    return cy.getByDataTest('transaction-detail-header').parent()
  }
  static getDetailsAvatars(){
    this.getTransactionDetails().within(function(){
      cy.get('img[class="MuiAvatar-img"]').as('avatars');
    })
    return cy.get('@avatars');
  }
  static getLikesButton() {
    return cy.get('button[data-test*=transaction-like-button]');
  }
  static clickLikesButton() {
    this.getLikesButton().click();
  }
  static getLikesCount() {
    return cy.get('[data-test*="transaction-like-count"]');
  }
  static addComment(comment) {
    cy.get('input[data-test*="transaction-comment-input"]').type(comment).type('{enter}');
  }
  static newTransaction() {
    cy.getByDataTest('nav-top-new-transaction').click();
  }
  static typeNewContactSearch(user) {
    cy.getByDataTest('user-list-search-input').type(`${user.name} ${user.lastname}`);
  }
  static getUsersList() {
    return cy.getByDataTest('users-list');
  }
  static selectUser(user) {
    cy.contains('li[data-test*=user-list-item]', `${user.name} ${user.lastname}`).click();
  }
  static typeAmount(amount) {
    cy.get('#amount').type(amount);
  }
  static typeNote(note) {
    cy.get('#transaction-create-description-input').type(note);
  }
  static clickAmount() {
    cy.get('#amount').click();
  }
  static clickNote() {
    cy.get('#transaction-create-description-input').click();
  }
  static getPaymentForm() {
    return cy.getByDataTest('transaction-create-form').parent().parent();
  }
  static getRequestButton() {
    return cy.getByDataTest('transaction-create-submit-request');
  }
  static getPayButton() {
    return cy.getByDataTest('transaction-create-submit-payment');
  }
  static clickRequestButton() {
    this.getRequestButton().click();
  }
  static clickPayButton() {
    this.getPayButton().click();
  }
  static clickReturnToTransactions() {
    cy.getByDataTest('new-transaction-return-to-transactions').click();
  }
  static clickCreateAnother() {
    cy.getByDataTest('new-transaction-create-another-transaction').click();
  }
  static getCompleteForm() {
    return cy.getByDataTest('new-transaction-return-to-transactions')
      .parentsUntil('main[data-test="main"]')
      .last();
  }
}
