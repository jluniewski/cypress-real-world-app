import { General } from "../../pages/general";
import { Login } from "../../pages/login";
import { Sidebar } from "../../pages/sidebar";

let incorrectUsername = 'username';
let incorrectPassword = 'password';
let shortPassword = 'abc';

describe("Login via username and password", function () {
  beforeEach(function () {
    cy.task("db:seed");
    cy.fixture("users.json").as("users");
    cy.fixture("alerts.json").as("alerts");
    cy.visit("/signin");
  });
  it("Is logging in user", function () {
    Login.typeUsername(this.users.userEdgar.username);
    Login.typePassword(this.users.userEdgar.password);
    Login.clickSignIn();

    Sidebar.getSidebar()
      .should("contain", this.users.userEdgar.username)
      .and("contain", this.users.userEdgar.name)
      .and("contain", this.users.userEdgar.lastname[0]);
  });
  it("Validates incorrect username and password", function () {
    Login.typeUsername(incorrectUsername);
    Login.typePassword(incorrectPassword);
    Login.clickSignIn();

    General.getAlert().should('contain', this.alerts.invalidUsernamePassword);
  });
  it("Validates empty username and short password", function () {
    Login.getUsername().click();
    Login.typePassword(shortPassword);
    Login.checkRememberMe();
    
    Login.getUsername().should('contain', this.alerts.requiredUsername);
    Login.getPassword().should('contain', this.alerts.shortPassword);
  });
  it('Goes to Sign Up page', function() {
    Login.gotoSignUp();

    Login.getSignUpTitle().should('contain', 'Sign Up');
  });
});
