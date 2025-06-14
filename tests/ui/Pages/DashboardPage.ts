import { expect, type Locator, type Page } from '@playwright/test';
export class DashboardPage {
    //=========== Locators = ===========
    private readonly page: Page; // The page object where the locators will be used
    private readonly orangeHRM: Locator; // Locator for the profile icon
    private readonly dashboard_text: Locator; // Locator for the dashboard title

    //============Variables =============
    private readonly dashboard_url: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'; // URL of the dashboard page
    private readonly orangeHRMPics: string = "client brand banner"; // Alt text for the profile icon
    private readonly dashboardtext: string = "//h6[normalize-space()='Dashboard']"; // Title of the dashboard page
    //============Constructor============
    constructor(page: Page) {
        this.page = page; // Initialize the page object
        this.orangeHRM = page.getByAltText(this.orangeHRMPics); // Initialize the profile icon locator
        this.dashboard_text = page.locator(this.dashboardtext); // Initialize the dashboard title locator
    }

    //============Methods =============
        //------------Actions------------
        public async navigateToDashboard(): Promise<this> {
        // Navigate to the dashboard page
        await this.page.goto(this.dashboard_url); // Use the page object to navigate to the dashboard URL
        return this; // Return the instance for method chaining
        }

    //------------Validations------------

   public async validateOrangeHRM() {
        await expect(this.orangeHRM).toBeVisible(); 
    }
    public async validateDashboardTitle() {
        await expect(this.dashboard_text).toBeVisible(); // Validate that the dashboard title is visible
    }
}