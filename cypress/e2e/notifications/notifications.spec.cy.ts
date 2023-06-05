import { General } from "../../pages/general";
import { Notifications } from "../../pages/notifications";

describe('Notifications Page', function () {
    beforeEach(function () {
        cy.task('db:seed');
        cy.fixture('users.json').as('users').then(function(users){
            cy.loginApi(users.userEdgar.username, users.userEdgar.password);
        });
        cy.fixture('notifications.json').as('notifications');
        cy.fixture('alerts.json').as('alerts');
        cy.visit('/notifications');
    })
    it('shows all notifications on the list', function () {
        Notifications.assertAllNotifications(this.notifications.list);
    })
    it('can be opened from bell icon', function () {
        cy.visit('/');
        Notifications.clickBellIcon();
        Notifications.assertAllNotifications(this.notifications.list);
        Notifications.getNumberOfNotifications()
            .should('contain', this.notifications.list.length);
    })
    it('allows to dismiss a notification', function () {
        Notifications.dismiss(this.notifications.list[2]);
        Notifications.getList()
            .should('not.contain', this.notifications.list[2]);
    })
    it('shows message for no notifications', function () {
        Notifications.dismissAll(this.notifications.list);
        General.getMainPage().should('contain', this.alerts.noNotifications);
    })
})