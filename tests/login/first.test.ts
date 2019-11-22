import { Builder, WebDriver, Capabilities } from "selenium-webdriver";
import { Page1 } from "../../pagesObject/main.po";
import { LoginPage } from "../../pagesObject/login.po";
import { App } from "../../pagesObject/config.po";
import { SeleniumUtils } from "../../utils/se.utils";
import { doesNotReject } from "assert";

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require("chromedriver");
const assert: IAssert = require("assert");

let capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: ["--lang=ru", "disable-infobars", "--disable-plugins",/* "--headless"*/]
});

describe("Bookvoed", function() {
  let driver: WebDriver;
  let page1: Page1;
  let page2: LoginPage;
  let browser: SeleniumUtils;

  before(async function() {
    driver = await new Builder().withCapabilities(capabilities).build();
    page1 = new Page1(driver);
    page2 = new LoginPage(driver);
    browser = new SeleniumUtils(driver);

  });

  it("Positive test", async function(done) {
    browser.go(App.url);
    await page1.isLoad();
    await browser.click(page1.profile());
    await page2.isLoad();
    await browser.keys(page2.email(), App.user.login);
    await browser.keys(page2.password(), App.user.password);
    await browser.click(page2.submit());
    done();
  });

  /*xit("Negative test", async function(done) {
    debugger;
    browser.go(App.url);
    await page1.isLoad();
    await browser.click(page1.profile());
    await page2.isLoad();
    await browser.keys(page2.email(), App.user.login);
    await browser.keys(page2.password(), "123");
    await browser.click(page2.submit());
    await page2.isLoad();
    await assert.equal(await page2.isPage(), true);
    done();
  });*/

  after(() => driver && driver.quit());

});
