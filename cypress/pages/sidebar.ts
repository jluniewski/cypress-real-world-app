export class Sidebar {
    static getSidebar(){
        return cy.getByDataTest('sidenav');
    };
    static clickMenu(menuItem) {
        cy.getByDataTest('sidenav').contains(menuItem).click();
    }
}