import { expect, type Locator, type Page } from '@playwright/test';


export class LoginPage {
    //=========== Locators = ===========
         readonly page: Page; // The page object where the locators will be used
         readonly username_tb: Locator; // Locator for the username input field
         readonly password_tb: Locator; // Locator for the password input field
         readonly login_btn: Locator; // Locator for the login button
         readonly invalid_login_msg: Locator; // Locator for the invalid login message
         readonly invalid_username_msg: Locator; // Locator for the invalid username message

    //============Variables =============
         readonly url: string ="https://opensource-demo.orangehrmlive.com/"; // URL of the login page
         readonly invalid_login_msg_text: string = 'Invalid credentials'; // Expected text for invalid login message
        readonly invalid_username_msg_text: string = 'CSRF token validation failed'; // Expected text for invalid username message
    //============Constructor============
    constructor(page: Page) {
        this.page = page; // Initialize the page object
        this.username_tb = page.getByPlaceholder('Username'); // Initialize the username input field locator
        this.password_tb = page.getByPlaceholder('Password'); // Initialize the password input field locator
        this.login_btn = page.getByRole('button', { name: 'Login' }); // Initialize the login button locator
        this.invalid_login_msg = this.page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']"); // Initialize the invalid login message locator
        this.invalid_username_msg = this.page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text"); // Initialize the invalid username message locator
    }
    //============Methods =============
        //------------Actions------------
           async navigateLoginPage() {
            // Navigate to the login page
            await this.page.goto(this.url); // Use the page object to navigate to the login URL

        }
           async login(username: string, password: string) {
            // Fill in the username and password fields
            await this.username_tb.fill(username); // Fill in the username input field
            await this.password_tb.fill(password); // Fill in the password input field
            // Click the login button
            await this.login_btn.click(); // Click the login button
             }
        //------------Validations------------
        async validateInvalidLoginMessage() {
            // wait for the invalid login message to be visible
            await expect(this.invalid_login_msg).toBeVisible(); // Validate that the invalid login message is visible
        }
        async validateInvalidCTF() {
            // wait for the invalid username message to be visible
            await expect(this.invalid_username_msg).toBeVisible(); // Validate that the invalid username message is visible
            await expect(this.invalid_username_msg).toHaveText(this.invalid_username_msg_text); // Validate that the invalid username message contains the expected text
        }



}