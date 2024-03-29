import { BrowserContext, Locator, Page, expect} from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly SEARCH_INPUT: Locator;
    readonly USERNAME_LABEL: Locator;
    readonly LOGOUT_BUTTON: Locator;
    readonly GO_TO_BOOK_STORE_BUTTON: Locator;
    readonly DELETE_ACCOUNT_BUTTON: Locator;
    readonly DELETE_ALL_BOOKS: Locator;

    constructor(page: Page, context: BrowserContext){
        super(page);
        this.page = page;
        this.context = context;
        this.SEARCH_INPUT = page.getByPlaceholder('Type to search');
        this.USERNAME_LABEL = page.getByLabel('User Name');
        this.LOGOUT_BUTTON = page.getByRole('button', {name: 'Log out'});
        this.GO_TO_BOOK_STORE_BUTTON = page.getByRole('button', {name: 'Got To Book Store'});
        this.DELETE_ACCOUNT_BUTTON = page.getByRole('button', {name: 'Delete Account'});
        this.DELETE_ALL_BOOKS = page.getByRole('button', {name: 'Delete All Books'});
    }

    /**
     * Method for checking that Profile page is opened
     */
    async isOpened() 
    {
        await this.page.waitForLoadState('domcontentloaded', {timeout: 1000});
        await expect(this.page).toHaveURL(/.*profile/);
    }

    protected async getUrl(): Promise<string> {
        return '/profile';
    }
}