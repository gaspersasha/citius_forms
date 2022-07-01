@my_account @ma_car_page
Feature: My Account Car Page
  In order to be able check my car
  As a User
  I would like to have MA Car page

  Scenario: Check that My Car Page available to the user
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    And I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    And I fill in "email" with "bdd_testing@dennis.co.uk"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h1[text()='My Account']"
    And I should see element with a classname "first leaf active-trail"
    And I should see element with xpath "//nav[@class='breadcrumb item-list']"
    And I should see element with a classname "list layout-grid"
#    card contains all necessary blocks 
    And I should see element with a classname "card--inner"
    And I should see element with a classname "img-wrapper"
    And I should see element with a classname "img-info"
    And I should see element with a classname "card-main"
    And I should see element with a classname "link--button-forward"
