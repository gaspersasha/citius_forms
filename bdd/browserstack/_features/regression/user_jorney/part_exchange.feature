@user_journey @partexchange @regression
Feature: React Part Exchange Journey
  In order to sell a car
  As a user
  I want to be able to get a quote of my car with price

  Scenario: New user gets vehicle valuation by direct link
    Given I am on a "part-exchange" page
    Then I should wait "5000" ms for element with class "partexchange-outer"
  # Plate
    And I fill in "plate" with "YK16TXY"
    When I click on the element with class "link--button-forward"
  # Car details
    And I should wait "5000" ms for element with class "partexchange__step-heading"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "autoconvert-input-group"
  # Mileage
    When I click on the element with class "link--button-forward"
    And I wait a maximum of '5000' ms
    Then I should see element with xpath "//h5[text()='Mileage']"
    When I fill in "mileage" with "27026"
    And I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
  # User Details
    Then I should see element with xpath "//h5[text()='User Details']"
    And I fill in "firstName" with "Lucy"
    And I fill in "middleName" with "Jr"
    And I fill in "lastName" with "Doh"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
  # User Contact
    Then I should see element with xpath "//span[contains(text(),'Post Code')]"
    And I fill in "postCode" with "LU7 2TY"
    And I fill in "email" with "BDD_partex_@example.com"
    And I fill in "telephone" with "07712281356"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
  # Get a quote
    Then I should see element with a classname "valuation_benefits"
    And I click on the element with xpath "//p[text()='Please tick to show you agree to us sending your information to the car buying group. You can see their']"
    When I click on the element with xpath "//div[@class='checkbox-inputs-wrapper']//input"
    Then I see selected checkbox with classname "checkbox-inputs-wrapper"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "8000" ms
  # Fin
    Then I should see element with a classname "part-exchange_price align-center valuation_value"
    And I should see element with xpath "//p[text()='Your estimated valuation']"
  # Review PX summary page with the right data
    Given I am on a "account/part-exchange" page
    And I wait a maximum of "5000" ms
    And I should see element with a classname "typography-component txt-darkgrey txt-left partx-subheading"
    # Able to start new flow from PX summary page
    When I click on the element with xpath "//a[@class='button-component txt-white shadow-pink fill-pink']"
    Then I wait a maximum of "5000" ms
    And I should be on "part-exchange"
