export class Notifications {
    static getList() {
        return cy.getByDataTest('notifications-list');
    }
    static dismiss(notification) {
        cy.contains(notification).parent().parent().within(function() {
            cy.get('[data-test*=notification-mark-read]').click();
        })
    }
    static dismissAll(notificationsTable) {
        cy.wrap(notificationsTable).each(function(notification) {
            Notifications.dismiss(notification);
        });
    }
    static clickBellIcon() {
        cy.getByDataTest('nav-top-notifications-link').click();
    }
    static getNumberOfNotifications() {
        return cy.getByDataTest('nav-top-notifications-count');
    }
    static assertAllNotifications(notificationsTable) {
        this.getList().as('NotificationsList');
        cy.wrap(notificationsTable).each(function(notification) {
            cy.get('@NotificationsList').should('contain', notification);
        })
    }
}