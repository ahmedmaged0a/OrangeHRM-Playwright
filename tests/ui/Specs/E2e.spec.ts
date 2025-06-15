import { test } from '@playwright/test';
import { POManager } from '../Pages/poManager'; // Import the Page Object Manager
import TsData from '../../../testData/TestData';

test.describe.configure({ mode: 'parallel' }); // Configure tests to run in serial mode

//============== Page Object Manager ===============
    let poManager: POManager;

//==============Hooks ===============
    test.beforeAll(async () => {
        console.info("Starting OrangeHRM E2E Automation Tests");
    }
    );
    test.afterAll(async () => {
        console.info("Completed OrangeHRM Automation E2E Tests");
    });

//============== Test Suites ===============
    test.describe("OrangeHRM Login Tests", () => {

        test.beforeEach(async ({ page }) => {
            poManager = new POManager(page); // Initialize the Page Object Manager
            await poManager.getLoginPage().navigateLoginPage(); // Get the LoginPage object
        });


        test("Valid Login Test",{
            tag: ["@smoke", "@regression", "@ui"],
            annotation: {
                    type: "smoke",
                    description: "This test validates the login functionality with valid credentials.",
            },
        }, async ({ page }) => {
            await poManager.getLoginPage().login(
                    TsData.testData.loginData.validLogin.username,
                    TsData.testData.loginData.validLogin.password); // Use the LoginPage object to perform login
            await poManager.getDashboardPage().navigateToDashboard(); // Navigate to the dashboard page
            await poManager.getDashboardPage().validateOrangeHRM(); // Validate the presence of the OrangeHRM logo
        });

        test("Invalid Username and Valid Password Test",{
            tag: ["@regression", "@ui"],
            annotation: {
                type: "regression",
                description: "This test validates the login functionality with an invalid username and a valid password.",
            },
            
        }, async ({ page }) => {
            await poManager.getLoginPage().login(
                TsData.testData.loginData.invalidLogin.username, 
                TsData.testData.loginData.validLogin.password
            ); // Use the LoginPage object to perform login with invalid credentials
            await poManager.getLoginPage().validateInvalidLoginMessage(); // Validate the invalid login message
        });

            test("Valid Username and inValid Password Test", {
            tag: ["@regression", "@ui"],
            annotation: {
                type: "regression",
                description: "This test validates the login functionality with a valid username and an invalid password.",
            },
            },async ({ page }) => {
            await poManager.getLoginPage().login(
                TsData.testData.loginData.validLogin.username, 
                TsData.testData.loginData.invalidLogin.password
            ); // Use the LoginPage object to perform login with invalid credentials
            await poManager.getLoginPage().validateInvalidLoginMessage(); // Validate the invalid login message
        });
    }
    );



