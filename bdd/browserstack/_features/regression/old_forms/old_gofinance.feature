Feature: Finance Form OLD
  In order to get finance for a car
  I want to ensure the finance form works

  @smoke_regression @regression @old_form @old_finance
  Scenario: User can land on Finance form from homepage
    Given I am on a homepage
    When I click on the button with id "homePageFinance"
    Then I should be on "gofinance"
    And I wait a maximum of "5000" ms
    And I should see element with id "financeForm"
    And I should see element with a classname "page-title title"
    And I should see "Apply for car finance online at BuyaCar.co.uk | BuyaCar" in title

  @smoke_regression @regression @old_form @old_finance
  Scenario: Check the finance form labels are correct
    Given I am on a "/gofinance" page
    Then I should wait "5000" ms for element with id "block-system-main"
    Then I should see "What is your title?" in the "tap-buttons-title__text" element
    And I should see "What is your first name" in the "form-label-title" element
    And I should see element with name "middleName"
    And I should see element with name "lastName"

  @regression @old_form @old_finance
  Scenario: Check the finance form is populating values
    Given I am on a "/gofinance" page
    Then I should wait "5000" ms for element with class "container--finance-form"
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    And I should see a "//input[@name='firstName'][@value='Joe']" element
    And I should see a "//input[@name='middleName'][@value='Middleton']" element
    And I should see a "//input[@name='lastName'][@value='Bloggs']" element

  @regression @old_form @old_finance
  Scenario: Check the finance form labels are correct
    Given I am on a "/gofinance" page
    Then I should wait "5000" ms for element with class "container--finance-form"
    Then I should see element by xpath "//div[text()='What is your title?']"
    And I should see element by xpath "//label[@for='firstName']"
    And I should see element by xpath "//label[@for='middleName']"
    And I should see element by xpath "//label[@for='lastName']"

  @smoke_regression @regression @old_form @old_finance
  Scenario: Check that the header and footer are hidden
    Given I am on a "gofinance" page
    Then I should wait "5000" ms for element with class "container--finance-form"
    And the "breadcrumb item-list" element should be invisible
    Then I should not see a "header.region-header" element
    Then I should not see a "footer.region-footer" element
    And I should see element with a classname "site-logo"
#   check that logo not clickable
    When I click on the element with class "logo-wrapper"
    Then I should be on "gofinance"

  @regression @old_form @old_finance
  Scenario: Check that the vehicledetails react component is rendered
    Given I am on a "/gofinance?productAdvertId=1639853&financeQuoteId=5980167&source=vd1&form_build_id=form-me6kQ9Lp9ScrGTdoAkq3BInj3aqUaZIqbTzbF9RM-6I&form_id=site_in_stock_button_form" page
    Then I should wait "5000" ms for element with class "vehicleinfo-card"
    And I should see element with a classname "vehicleinfo-card__title"
    And I should see element with a classname "vehicleinfo-card__price"
    And I should see element with a classname "vehicleinfo-card__list"

  @old_form @old_finance
  Scenario Outline: Check the body class has been added when param is present for gofinance EP
    Given I am on a "/gofinance?financePartner=<TEXT>" page
    Then I should wait "5000" ms for element with id "pid-gofinance"
    And I should see element with a classname "finance-partner--<TEXT>"

    Examples:
      | TEXT |
      | aex  |
      | cbuy |
      | evo  |

  @old_form @old_finance
  Scenario: Check the body class isn't added when param isn't present
    Given I am on a "/gofinance" page
    Then I should not see a "body.finance-partner--aex" element

  @old_form @old_finance
  Scenario: Check the body class isn't added when param is present on other pages
    Given I am on a "/?financePartner=aex" page
    Then I should not see a "body.finance-partner--aex" element
