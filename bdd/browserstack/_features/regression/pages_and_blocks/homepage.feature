Feature: Homepage block
  In order to allow users to see the relevant Content on the homepage
  as a PM
  I want to implement Blocks of Content

  @regression @smoke_regression @homepage @trustpilot
 Scenario:Check that all the required elements are available on homepage.
    Given I am on a homepage
    And I should wait "5000" ms for element with class "homepage-banner__plate"
    # Check that all elements are in site
    Then I should see element with id "block-boxes-why-choose-buyacar"
    And I should see element with id "block-boxes-body-styles"
    And I should see element with id "block-boxes-top-brands"
    And I should see element with id "block-boxes-who-are-bac-box"
    And I should see element with id "block-site-trustpilot-trustpilot"
    And I should see a "//div[@class='boxes-box-content']" element
    #Make sure the "Why choose BuyaCar?" block will appear on the homepage
    And I should see element with id "boxes-box-why_choose_buyacar"
    And I should see a "//div[text()='All our cars come from UK main dealers and go through rigorous checks and tests before they arrive at your door']" element
    And I should see a "//div[text()='Whether buying outright or with an affordable monthly payment plan, we’ve travelled the UK for the best deals - so you don’t have to']" element
    And I should see a "//div[text()='Along with 1000s of cars to choose from, you can apply for finance online and value your existing car all from the comfort of your favourite armchair']" element
    # Check that used cars search block is appear.
    And I should see element with a classname "homepage-banner__background"
    And I should see element with a classname "homepage-banner__buttons"
    # Check trust pilot block in footer
    And I should see element with id "block-site-trustpilot-mini"
    And I should see element with a classname "trustpilot-widget"
    And I should see element with id "boxes-box-who_are_bac_box"
    #Make sure the "Select Car Make Model Menu" block will appear on the homepage
    And I should see element with a classname "car-sidebar"

  @regression @smoke_regression @homepage
 Scenario: Redirect to the search page from home page banner
    Given I am on a homepage
    And I should see element with id "block-site-homepage-homepage-header"
    And I should wait "5000" ms for element with class "homepage-banner__buttons"
    When I click on the button with id "homePageSearch"
    And I wait a maximum of "5000" ms
    Then I should be on "cars"

  @regression @smoke_regression @homepage
  Scenario: Redirect buyer to the financeapplication from home page banner
    Given I am on a homepage
    And I should see element with id "block-site-homepage-homepage-header"
    And I should wait "5000" ms for element with class "homepage-banner__buttons"
    And I click on the button with id "homePageFinance"
    Then I should be on "gofinance"

  @regression @homepage
  Scenario: Check is body styles block available on the Home Page
    Given I am on a homepage
    And I should wait "5000" ms for element with class "vehicle-search-list"
    When I click on the element with xpath "//a[@href='/cars/family-cars/saloon-cars']"
    Then I should be on "cars/family-cars/saloon-cars"

  @regression @homepage
  Scenario: Check is body styles block available on the Home Page
    Given I am on a homepage
    And I should wait "5000" ms for element with class "vehicle-search-list"
    When I click on the element with xpath "//a[@href='/audi']"
    Then I should be on "audi"

  @regression @homepage
  Scenario: Check is body styles block available on the Home Page
    Given I am on a homepage
    And I should wait "5000" ms for element with class "vehicle-search-list"
    And I click on the element with xpath "//button[text()='View all available brands']"
    Then I should wait "5000" ms for element with class "vehicle-search-otherVehicles"
    And I click on the element with xpath "//a[@href='/toyota']//span[1]"
    Then I should be on "toyota"
