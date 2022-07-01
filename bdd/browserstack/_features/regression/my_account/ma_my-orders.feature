@my_account @ma_my-orders @regression
Feature: My Account My Orders page
  In order to be able check my orders
  As a User
  I would like to have MA My Orders page

  Scenario: Check the user can land on the My Orders page.
    Given I am on a "account" page
    And I wait a maximum of "8000" ms
    Then I should see element with xpath "//h2[text()='Please log in']"
    And I should see element with xpath "//p[text()='You need to be logged in to access this page, please log in via the link below']"
    And I should see element with a classname "info-box info-box--center"
    And I should wait "5000" ms for element with class "link--button-forward"
    And I click on the element with xpath "//div[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    And I fill in "email" with "bdd_testing@dennis.co.uk"
    And I fill in "password" with "Test123@*"
    When I click on the element with xpath "//button[@class='authentication-typo authentication-submit']"
    And I wait a maximum of "5000" ms
    When I am on a "account/orders" page
    And I wait a maximum of "8000" ms
    Then I should see element with xpath "//h1[text()='View orders and invoices']"


