/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
        loginApi(username: string, password: string): Chainable<JQuery<HTMLElement>>;
        loginViaLoginPage(username: string, password: string): Chainable<JQuery<HTMLElement>>;
        scrollDatePicker(): Chainable<JQuery<HTMLElement>>;
    }
}