import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";

export class MainPage {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);
    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }

    profile = () => this.find('#target_cbPopup');
    profileLogin = () => this.find('.Tib .Zib');
    baner = () => this.find('#cached_component_1-banners');


    async isPage() {
        return await this.seleniumUtils.existElement(this.baner())
    }

    isLoad = () => this.seleniumUtils.wait('#cached_component_1-banners');
}
