const { setWorldConstructor } = require("cucumber");
const webdriver = require('selenium-webdriver');
const path = require('chromedriver').path;
const geckodriverpath = require('geckodriver').path;
const chrome = require('selenium-webdriver/chrome');
const { Channel, Options } = require('selenium-webdriver/safari');

/*var safariOptions = new Options() ;
safariOptions.setTechnologyPreview(true);*/

class CustomWorld {
  constructor() {
    this.driver = new webdriver.Builder()
    .setChromeOptions(new chrome.Options().headless())
    .forBrowser('chrome')
    .build();
  }
}

setWorldConstructor(CustomWorld);