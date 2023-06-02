export class Login {
	static getUsername() {
		return cy.getByDataTest('signin-username');
	}
	static typeUsername(username) {
		this.getUsername().type(username);
	}
	static typePassword(password) {
		cy.getByDataTest('signin-password').type(password);
	}
	static getPassword() {
		return cy.getByDataTest('signin-password');
	}
	static clickSignIn() {
		cy.getByDataTest('signin-submit').click();
	}
	static checkRememberMe() {
		cy.get('input[name="remember"]').check();
	}
	static gotoSignUp() {
		cy.getByDataTest('signup').click();
	}
	static getSignInTitle() {
		return cy.contains('Sign in');
	}
	static getSignUpTitle() {
		return cy.getByDataTest('signup-title');
	}
	static getFirstName() {
		return cy.get('#firstName');
	}
	static typeFirstName(firstName) {
		this.getFirstName().type(firstName);
	}
	static getLastName() {
		return cy.get('#lastName');
	}
	static typeLastName(lastName) {
		this.getLastName().type(lastName);
	}
	static getSignUpUsername() {
		return cy.get('#username');
	}
	static typeSignUpUsername(username) {
		this.getSignUpUsername().type(username);
	}
	static getSignUpPassword() {
		return cy.get('#password');
	}
	static typeSignUpPassword(password) {
		this.getSignUpPassword().type(password);
	}
	static getConfirmPassword() {
		return cy.get('#confirmPassword');
	}
	static typeConfirmPassword(password) {
		this.getConfirmPassword().type(password);
	}
	static getSignUpButton() {
		return cy.getByDataTest('signup-submit');
	}
	static clickSignUpButton() {
		this.getSignUpButton().click();
	}
	static getSignUpForm() {
		return this.getSignUpTitle().parent().get('form');
	}
}
