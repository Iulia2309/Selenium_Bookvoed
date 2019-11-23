import { Builder, WebDriver, Capabilities } from "selenium-webdriver";
import { MainPage } from "../../pagesObject/main.po";
import { LoginPage } from "../../pagesObject/login.po";
import { App } from "../../pagesObject/config.po";
import { SeleniumUtils } from "../../utils/se.utils";

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
  let mainPage: MainPage;
  let loginPage: LoginPage;
  let browser: SeleniumUtils;

  before(async function() {
    driver = await new Builder().withCapabilities(capabilities).build();
    mainPage = new MainPage(driver);
    loginPage = new LoginPage(driver);
    browser = new SeleniumUtils(driver);
  });

  it("Positive test", async function() {
    browser.go(App.url);
    await mainPage.isLoad();
    await browser.click(mainPage.profile());
    await loginPage.isLoad();
    await browser.keys(loginPage.email(), App.user.login);
    await browser.keys(loginPage.password(), App.user.password);
    await browser.click(loginPage.submit());
    let currentUser = await mainPage.profileLogin().getText();   
    assert.equal(currentUser.includes('Юлия'), true);
  });

  after(() => driver && driver.quit());

});
