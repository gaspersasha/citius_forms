Feature:Product page back button
  In order to better
  As a User
  I would like to see a

   @smoke_regression @regression @product_page @product_page_block
   Scenario: Product page blocks
     Given I am on a "/ford/focus" page
     And I should wait "5000" ms for element with class "search_result"
     When I click on the element with xpath "//a[@class='link--button-forward']"
     And I should wait "5000" ms for element with class "tab-pricing-section"
     Then I should see element with a classname "page-header"
     And I should see element with a classname "breadcrumb item-list"
     And I should see element with a classname "title product-title-heading"
     And I should see element with a classname "title product-title-subHeading"
     And I should see element with a classname "image-gallery-image"
     And I should see element with a classname "tab-pricing-section"
     And I should see element with a classname "vehicle-key-info-list"
     And I should see element with a classname "tab-pricing-section-footer__rating-widget"
     And I should see element by xpath "//h2[text()='More details about this car']"
     And I should see element by xpath "//h4[text()='Technical specifications']"
     And I should see element by xpath "//h2[text()='Standard equipment']"
     And I should see element with a classname "whybuyacar-heading"
     And I should see element with a classname "whybuyacar-content"
     And I should see element with a classname "whybuyacar-usp"
     And I should see element with id "block-site-in-stock-site-in-stock-new-finance-calc"
     And I should see element with id "footer-wrapper"

#     Car detail
   @regression @product_page
   Scenario: Product page - Car detail info open/close functionality
     Given I am on a "/ford/focus" page
     And I should wait "5000" ms for element with class "search_result"
     When I click on the element with xpath "//a[@class='link--button-forward']"
     And I should wait "5000" ms for element with class "tab-pricing-section"
     Then I should see element with id "block-site-in-stock-site-in-stock-more-details"
     When I click on the element with xpath "//h2[text()='More details about this car']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed open"
     And I should see element with a classname "date-of-registration first"
     When I click on the element with xpath "//h2[text()='More details about this car']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed"
     When I click on the element with xpath "//h4[text()='Technical specifications']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed open"
     And I should see element with a classname "specs-cols"
     When I click on the element with xpath "//h4[text()='Technical specifications']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed"
     When I click on the element with xpath "//h2[text()='Standard equipment']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed open"
     And I should see element with a classname "specs-col-1 spec-column"
     When I click on the element with xpath "//h2[text()='Standard equipment']"
     Then I should see element with a classname "block block-site-in-stock block-accordion closed"

#     Why BuyaCar section
  @regression @product_page
  Scenario: Product page - Why BuyaCar section
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    When I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "whybuyacar-wrapper"
    Then I should see element by xpath "//div[text()='Why BuyaCar']"
    And I should see element with a classname "whybuyacar-list-item certified"
    And I should see element by xpath "//div[text()='This car is BuyaCar Certified!']"
    And I should see element by xpath "//div[text()[normalize-space()='Every car on BuyaCar has been sourced from our trusted dealer network, rigorously inspected and checked against the HPI database.']]"
    And I should see element by xpath "//div[text()='All cars come with:']"
    And I should see element by xpath "//li[text()='HPI check to verify the car mileage, history and outstanding finance']"
    And I should see element by xpath "//li[text()='At least six months MOT and service']"
    And I should see element by xpath "//li[text()='14-day money back guarantee']"
    And I should see element with a classname "whybuyacar-list-item delivered"
    And I should see element by xpath "//div[text()='Your new car will be delivered directly to your door']"
    And I should see element by xpath "//li[text()='Choose a preferred delivery date']"
    And I should see element by xpath "//li[text()='Our standard charge for driven delivery to England and Wales is included in your monthly payments']"
    And I should see element by xpath "//div[text()='Enhanced and longer-distance delivery options are available for an additional fee']"
    And I should see element with a classname "whybuyacar-usp"
    And I should see element by xpath "//div[text()='14-day money back guarantee']"
    And I should see element by xpath "//div[text()='30-day warranty always included']"
    And I should see element by xpath "//div[text()='with free collection']"

#    "Save car" popup
  @regression @pricing_section @question_popup
  Scenario: Product page "Save car"
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    When I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    And I click on the element with xpath "//span[text()='Save ']"
    Then I should wait "5000" ms for element with class "modal-container open"
    And I should see element by xpath "//h3[text()='Save a car']"
    And I should see element with a classname "container intro"
    And I should see element by xpath "//textarea[@placeholder='Ask your question...']"
    And I should see element by xpath "//input[@placeholder='Enter your first name']"
    And I should see element by xpath "//input[@placeholder='Enter your last name']"
    And I should see element by xpath "//input[@placeholder='Enter your email address']"
    And I should see element by xpath "//input[@placeholder='Enter your phone number']"
    And I should see element by xpath "//button[@class='link--button-forward']"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"
    And I should see element by xpath "//div[text()='Close ']"

#    "Ask a question" popup
  @regression @pricing_section @question_popup
  Scenario: Product page "Ask a question"
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    When I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    And I click on the element with xpath "//span[text()='Ask a question']"
    Then I should wait "5000" ms for element with class "modal-container open"
    And I should see element by xpath "//h3[text()='Ask a question']"
    And I should see element with a classname "container intro"
    And I should see element by xpath "//textarea[@placeholder='Ask your question...']"
    And I should see element by xpath "//input[@placeholder='Enter your first name']"
    And I should see element by xpath "//input[@placeholder='Enter your last name']"
    And I should see element by xpath "//input[@placeholder='Enter your email address']"
    And I should see element by xpath "//input[@placeholder='Enter your phone number']"
    And I should see element by xpath "//button[@class='link--button-forward']"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"
    And I should see element by xpath "//div[text()='Close ']"