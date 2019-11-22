import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";
import { url } from "inspector";

export class Page1 {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);
    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }
    profile = () => this.find('[class = "Zib"]');

    async isPage() {
        this.browser.sleep(3000);
        let url = await this.browser.getCurrentUrl();
        return url == 'https://www.bookvoed.ru/';
    }

    isLoad = () => this.seleniumUtils.wait('#index_map-map_map');
}
