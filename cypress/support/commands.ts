/// <reference types="cypress" />
///<reference path="../global.d.ts" />

import { first } from "cypress/types/lodash";

Cypress.Commands.add("getByDataTest", function (selector) {
  return cy.get(`[data-test=${selector}]`);
});
Cypress.Commands.add("loginApi", function (username, password) {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      type: "LOGIN",
      username: username,
      password: password,
    },
  });
  cy.fixture('authState.json').then(function(authState) {
    localStorage.setItem('authState', JSON.stringify(authState));
  });
});
Cypress.Commands.add('loginViaLoginPage', function (username, password) {
    cy.visit('/signin');
    cy.getByDataTest('signin-username').type(username);
    cy.getByDataTest('signin-password').type(password);
    cy.getByDataTest('signin-submit').click();
})
Cypress.Commands.add('scrollDatePicker', function() {
    return cy.get('[class="Cal__MonthList__root"]').then(function(month){
      cy.wrap(month).get('[data-date*=20]').first().scrollIntoView();
      return cy.wrap(month);
    });
})

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
