import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";



export class LoginPage {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);
    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }
    email = () => this.find('[id = "auth_form-login-input"]');
    password = () => this.find('[id = "auth_form-password-input"]');
    submit = () => this.find('[class = "span.gr"]');

    isPage() {
        this.browser.sleep(3000);
        let blockOnLoginPage = this.find('#auth_form');
        return this.seleniumUtils.existElement(blockOnLoginPage);
    }

    isLoad = () => this.seleniumUtils.wait('#auth_form');
}