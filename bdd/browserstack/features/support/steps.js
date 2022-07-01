const { By, until, Builder, Capabilities } = require('selenium-webdriver');
const { Given, Then, Before, After, setDefaultTimeout, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { expect } = require('chai');

require('chromedriver');

const { CONFIG_FILE, BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, TARGET_URL, TASK_ID, UI } = process.env;

const config_file = `../../${CONFIG_FILE || 'single'}.conf.js`;
const config = require(config_file).config;

const username = BROWSERSTACK_USERNAME || config.user;
const accessKey = BROWSERSTACK_ACCESS_KEY || config.key;

const URL = TARGET_URL || 'https://buyacar.test2.didev.co.uk';

// HOOKS
setDefaultTimeout(70 * 1000);

function createBrowserStackSession(config) {
  // const browserstackURL = `https://${config.server}/wd/hub`;
  const task_id = parseInt(TASK_ID || 0);
  const caps = config.capabilities[task_id];
  caps['browserstack.user'] = username;
  caps['browserstack.key'] = accessKey;

  const browserstackURL = `https://${username}:${accessKey}@${config.server}/wd/hub`;
  return new Builder()
    .usingServer(browserstackURL)
    .withCapabilities(caps)
    .build();
}

function createChromeSession() {
  const capabilities = Capabilities.chrome();
  const args = ['--no-sandbox'];
  // so tests could be run locally in browser easy
  if (UI == undefined) args.push('--headless');
  capabilities.set('chromeOptions', { 'w3c': false, args });
  return new Builder().withCapabilities(capabilities).build();
}

Before(async () => {
  // uncomment, when BS account issues are resolved
  // this.driver = createBrowserStackSession(config);
  this.driver = await createChromeSession();
  return;
});

After(async (scenario, callback) => {
  await this.driver.close();
  // this.driver.quit()
  callback();
});

// AfterAll(async () => {
//   await this.driver.quit();
//   return;
// });

// STEPS
Given('I am on a {string} page', (page) => {
  this.driver.get(`${URL}${page}`);
});

Then('I fill in {string} with {string}', (name, value) => {
  if (name === 'email') value += Math.round(Math.random(100000) * 100000);
  return this.driver.findElement({ name }).sendKeys(value);
})

Then('I click on the button {string}', (id) => {
  return this.driver.findElement({xpath: `//button[text()='${id}']`}).click();
})


Then('I should see modal {string}', (id) => {
  return this.driver.findElement(By.css(`*[data-id='${id}']`));
});

Then('I should see element with data-id {string}', (id) => {
  return this.driver.findElement(By.css(`*[data-id='${id}']`));
});

Then('I should see error {string}', (id) => {
  return this.driver.findElement(By.css(`*[data-id='with-error']`))
    .getText()
    .then(i => expect(i).to.eql(id));
})

Then('I click on {string}', (id) => {
  return this.driver.findElement({ xpath: `//*[text()='${id}']` }).click();
})

Then('I click on element with data-id {string}', (id) => {
  return this.driver.findElement(By.css(`*[data-id='${id}']`)).click();
})

Then('I should see {string} options', (title) => {
  return this.driver.findElement(By.css(`*[data-id='options']`))
    .getText()
    .then(i => expect(i).to.contain(title));
})

Then('I choose {string} option', (option) => {
  return this.driver.findElement(By.css(`input[data-id='${option}']`)).click();
})

Then('I should see {string} option', (option) => {
  return this.driver.findElement(By.css(`input[data-id='${option}']`));
})

Then('I should see label {string} with error', (label) => {
  return this.driver.findElement(By.css(`label[for=${label}]`));
})

Then('I should see {string} input', (name) => {
  return this.driver.findElement({ name });
})

Then('I should see {string} dropdown', (name) => {
  return this.driver.findElement(By.css(`[data-id='${name}']`));
})

Then('I should see {string} in {string} dropdown', (value, name) => {
  const $select = this.driver.findElement(By.css(`[data-id='${name}']`));
  return $select.findElement(By.css(`option[value='${parseInt(value)}']`));
})

Then('I select {string} in {string} dropdown', (value, name) => {
  const $select = this.driver.findElement(By.css(`[data-id='${name}']`));
  return $select.findElement(By.css(`option[value='${parseInt(value)}']`)).click();
})

Then('I should see text {string} on page', (text) => {
  return this.driver.findElement({ xpath: `//*[text()='${text}']` });
})

Then('I should be on {string} page', async (page) => {
  const url = await this.driver.getCurrentUrl();
  return expect(url).to.contain(page);
})


// TODO: doesn't work as expected for some reason ://
Then('I should not see label {string} with error', (label) => {
  try {
    this.driver.findElement(By.css(`label[for='${label}']`));
  } catch (e) {
    return true;
  }

  return false;
})

Then('I wait {string} seconds', (time) => {
  return this.driver.sleep(time * 1000);
})

Then('I clear {string}', (name) => {
  return this.driver.findElement({ name }).clear()
})

Then('I check {string} checkbox', (data) => {
  return this.driver.findElement(By.css(`input[type="checkbox"][data-id="${data}"`)).click();
})

Then("I should see {string} in title", function(titleText) {
  return this.driver.getTitle()
      .then(title => { expect(title).to.eql(titleText)} );
});

Then("I should see element with id {string}", function(id) {
  return this.driver.findElements({ id: id })
      .then(i => expect(i.length).to.not.eql(0));
});

Then("I should see element with a classname {string}", function(className) {
  return this.driver.findElement({ className: className })
      .then(i => expect(i.length).to.not.eql(0));
});

Then("I should see element by xpath {string}", function(xpath) {
  return this.driver.findElement({ xpath: xpath })
      .then(i => expect(i.length).to.not.eql(0));
});

Then("I should wait {string} ms for element with id {string}", function(sec, id) {
  return this.driver.wait(until.elementLocated(By.id(id)), Number(sec));
});


Then("I should wait {string} ms for element with class {string}", function(sec, className) {
  return this.driver.sleep(until.elementLocated(By.className(className)), Number(sec));
});

Then("I should see the link with name {string}", function (linkText) {
  return this.driver.findElements({linkText: linkText})
      .then(text => expect(text.length).to.not.eql(0));
});

Then("I should see the link with partial text {string}", function (linkText) {
  return this.driver.findElements({partialLinkText: linkText})
      .then(text => expect(text.length).to.not.eql(0));
});

Then("I should see element with name {string}",function (name) {
  return this.driver.findElements({name: name})
      .then(text => expect(text.length).to.not.eql(0));
})

Then("I click on the button with id {string}", function (buttonId) {
  return this.driver.findElement({id: buttonId})
      .click();
})

Then("I click on the button with class {string}", function (className) {
  return this.driver.findElement({className: className})
      .click();
})

Then("I click on the button with xpath {string}", function ([xpath]) {
  return this.driver.findElement({xpath: xpath})
      .click();
})

Then("I click on the element with class {string}", function (className) {
  return this.driver.findElement({className: className})
      .click();
})

Then("I click on the element with xpath {string}", function (xpath) {
  return this.driver.findElement({xpath: xpath})
      .click();
})

Then("I click on the element with name {string}", function (name) {
  return this.driver.findElement({name: name})
      .click();
})

Then("I should click the link with name {string}", function (linkText) {
  return this.driver.findElement({linkText: linkText})
      .click();
});

Then ("I should not see a {string} element", function (id) {
  return this.driver.findElements({id: id})
      .then(element => expect(element.length).to.eql(0));
})

Then ("I should not see a element with class {string}", function (className) {
  return this.driver.findElements({className: className})
      .then(element => expect(element.length).to.eql(0));
})

Then ("I should not see a element with xpath {string}", function (xpath) {
  return this.driver.findElements({xpath: xpath})
      .then(element => expect(element.length).to.eql(0));
})

Then ("the {string} element should be visible", function (id) {
  return this.driver.findElement({id: id})
      .isDisplayed();
})

Then("I see selected checkbox with classname {string}", function (className) {
  return this.driver.findElement({className: className})
      .isSelected();
})

Then("I see selected checkbox with id {string}", function (id) {
  return this.driver.findElement({id: id})
      .isSelected();
})

Then("I select element with xpath {string}", function (xpath) {
  return this.driver.findElement({xpath: xpath})
      .click();
})

Then("I select radiobutton with xpath {string}", function (xpath) {
  return this.driver.findElement({xpath: xpath})
      .click();
})

Then("I see unselected checkbox with classname {string}", function (className) {
  return this.driver.findElement({className: className})
      .isSelected()
      .then(selected =>
          expect(selected).to.not.true);
})

Then("I fill in {string} with static email {string}", function (elementName, value) {
  return this.driver.findElement({name: elementName})
      .sendKeys(value);
})

Then("I fill in element with id {string} value {string}", function (id, value) {
  return this.driver.findElement({id: id})
      .sendKeys(value);
})

Then ("the {string} element should be invisible", function (className) {
  return this.driver.findElement({className: className})
      .isDisplayed()
      .then(displayed =>
          expect(displayed).to.not.true);
})

Then ("I wait a maximum of {string} ms", function (time) {
  return this.driver
      .wait(time);
})

Then ("I should see {string} in the {string} element", function (text, className) {
  return this.driver.findElement({className:className})
      .getText()
      .then(element => expect(element).to.have.string(text));
})

Then ("I should see {string} in the element with id {string}", function (text, id) {
  return this.driver.findElement({id:id})
      .getText()
      .then(element => expect(element).to.eql(text));
})

Then("I should see {string} text in element with class {string}", function (text, className) {
  return this.driver.findElements({className:className})
      .getText()
      .then(i => expect(i).to.eql(text));
})

Then ("I should see {string} in the element with xpath {string}", function (text, xpath) {
  return this.driver.findElement({xpath:xpath})
      .getText()
      .then(element => expect(element).to.eql(text));
})

Then("I should see element with tagName {string}", function (tagName) {
  return this.driver.findElements({tagName: tagName})
      .then(i =>expect(i.length).to.not.eql(0));
})

Then("I should see a {string} element", function (xpath) {
  return this.driver.findElements({xpath:xpath})
      .then(i => expect(i.length).to.not.eql(0));
})

Then("I should see element with xpath {string}", function (xpath) {
  return this.driver.findElements({xpath:xpath})
      .then(i => expect(i.length).to.not.eql(0));
})

Then("I should see element form with a classname {string}", function (className) {
  return this.driver.findElements({className:className})
      .then(i => expect(i.length).to.not.eql(0))
})

Then("I should see {string} elements with class {string}", function (value, className) {
  return this.driver.findElements({className:className})
      .then(i => expect(i.length.toString()).to.eql(value));
})

Then("I should see {string} elements with id {string}", function (value, id) {
  return this.driver.findElements({id:id})
      .then(i => expect(i.length.toString()).to.eql(value));
})