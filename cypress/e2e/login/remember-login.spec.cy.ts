import { Login } from "../../pages/login";
import { Sidebar } from "../../pages/sidebar";

describe('Remember Me', function() {
    beforeEach(function() {
        cy.task("db:seed");
        cy.fixture("users.json").as("users");
        cy.visit("/signin");
    });
    it('It remembers username and password', function() {
        Login.typeUsername(this.users.userDevon.username);
        Login.typePassword(this.users.userDevon.password);
        Login.clickSignIn();
        Sidebar.clickMenu('Logout');

        Login.getUsername().should('contain', this.users.userDevon.username);
        Login.getPassword().should('contain', this.users.userDevon.password);
    });
});