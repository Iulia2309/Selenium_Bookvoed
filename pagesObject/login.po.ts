import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";



export class LoginPage {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);
    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }
    email = () => this.find('#auth_form-login-input');
    password = () => this.find('#auth_form-password-input');
    submit = () => this.find('#auth_form [type="submit"]');
    authForm = () => this.find('#auth_form [type="submit"]');
    

    async isPage() {
        return await this.seleniumUtils.existElement(this.authForm());
    }

    isLoad = () => this.seleniumUtils.wait('#auth_form');
}