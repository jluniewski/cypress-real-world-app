import { Login } from '../../pages/login';

let shortPassword = 'abc';
let incorrectPassword = 'password';

describe('Sign Up form', function () {
	beforeEach(function () {
		cy.task('db:seed');
        cy.fixture('users.json').as('users');
		cy.fixture('alerts.json').as('alerts');
		cy.visit('/signup');
	});
	it('allows creating a new user account', function () {
		Login.typeFirstName(this.users.newUser.name);
		Login.typeLastName(this.users.newUser.lastname);
		Login.typeSignUpUsername(this.users.newUser.username);
		Login.typeSignUpPassword(this.users.newUser.password);
		Login.typeConfirmPassword(this.users.newUser.password);
		Login.clickSignUpButton();

		Login.getSignInTitle().should('contain', 'Sign in');
	});
	it('validates empty inputs', function () {
		Login.getFirstName().click();
		Login.getLastName().click();
		Login.getSignUpUsername().click();
		Login.getSignUpPassword().click();
		Login.getConfirmPassword().click();
		Login.getFirstName().click();

		Login.getSignUpForm().should('contain', this.alerts.firstNameValidation);
        Login.getSignUpForm().should('contain', this.alerts.lastNameValidation);
        Login.getSignUpForm().should('contain', this.alerts.usernameValidation);
        Login.getSignUpForm().should('contain', this.alerts.passwordValidation);
        Login.getSignUpForm().should('contain', this.alerts.confirmValidation);
	});
	it('validates too short password', function () {
        Login.typeSignUpPassword(shortPassword);

        Login.getSignUpForm().should('contain', this.alerts.shortPassword);
    });
	it('validates not matching passwords', function () {
        Login.typeSignUpPassword(incorrectPassword);
        Login.typeConfirmPassword(shortPassword);

        Login.getSignUpForm().should('contain', this.alerts.notMatchingPassword);
    });
});
