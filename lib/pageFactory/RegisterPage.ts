import { BrowserContext, Locator, Page, expect } from "@playwright/test";
import { solve } from "recaptcha-solver";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly FIRST_NAME_INPUT: Locator;
    readonly LAST_NAME_INPUT: Locator;
    readonly USERNAME_INPUT: Locator;
    readonly PASSWORD_INPUT: Locator;
    readonly CAPTCHA_CHECKBOX: Locator;
    readonly REGISTER_BUTTON: Locator;
    readonly BACK_TO_LOGIN: Locator;
    username: string;
    password: string;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.page = page;
        this.context = context;
        this.FIRST_NAME_INPUT = page.getByPlaceholder('First Name');
        this.LAST_NAME_INPUT = page.getByPlaceholder('Last Name');
        this.USERNAME_INPUT = page.getByPlaceholder('UserName');
        this.PASSWORD_INPUT = page.getByPlaceholder('Password');
        this.CAPTCHA_CHECKBOX = page.frameLocator('iframe[title="reCAPTCHA"]').getByLabel('I\'m not a robot');
        this.REGISTER_BUTTON = page.getByRole('button', {name: 'Register'});
        this.BACK_TO_LOGIN = page.getByRole('button', {name: 'Back to Login'})
        this.username = 'user' + Date.now();
        this.password = 'the_most_secure_passworD!4';
    }

    /**
     * Method for filling registration form in Register page and clicking on "Register" button
     * Uses hardcoded first and last names, password values. Username is generated by user + Date.now().
     */
    async createNewUser() {
        await this.FIRST_NAME_INPUT.fill('Marko');
        await this.LAST_NAME_INPUT.fill('Polo');
        await this.USERNAME_INPUT.fill(this.username);
        await this.PASSWORD_INPUT.fill(this.password);
        await this.page.mouse.wheel(0, 150);
        await this.CAPTCHA_CHECKBOX.click();
        //TODO Need to update very unstable solving
        await solve(this.page, {delay: 400});
        await this.REGISTER_BUTTON.click();
    }

    /**
     * Method for checking that Register page is opened
     */
    async isOpened() {
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(/.*register/);
    }

    /**
     * Method for returning to Loging page by clicking "Back to login" button
     */
    async returnToLoginPage() {
        //TODO Need to check
        const request = await Promise.all([
            this.page.waitForResponse(response => response.url().includes("login") && response.status() === 200),
            this.BACK_TO_LOGIN.click(),
        ]);
        //await this.BACK_TO_LOGIN.click();
    }

    protected async getUrl(): Promise<string> {
        return '/register';
    }
}