import {type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';

export class POManager {

    private readonly page: Page; // The page object where the locators will be used
    private readonly loginPage: LoginPage; // Locator for the profile icon
    private readonly dashboardPage: DashboardPage; // Locator for the dashboard title

    //============Variables =============

    //============Constructor============
    constructor(page: Page) {
        this.page = page; // Assign the page first!
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }
    //============Methods =============
    getLoginPage(): LoginPage {
        return this.loginPage; // Return the LoginPage object
    }
    getDashboardPage(): DashboardPage {
        return this.dashboardPage; // Return the DashboardPage object
    }

    //------------Validations------------


}