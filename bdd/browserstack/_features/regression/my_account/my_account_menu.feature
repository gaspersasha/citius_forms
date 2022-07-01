@menus @my_account 
Feature: My Account Menu
  In order to navigate easily around the My Account area
  As a User
  I would like there to be an easily accessible navigation

  Scenario: Check the correct links are available when logged out and logged in.
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    When I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    Then I should see element with xpath "//h6[text()='Sign in to your BuyaCar account']"
    And I fill in "email" with "bdd_testing@dennis.co.uk"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    And I should not see a element with xpath "//h6[text()='Sign in to your BuyaCar account']"
    Then I should see element with xpath "//h1[text()='My Account']"
    And I should see element with xpath "//span[text()='Sign Out']"

  Scenario: Check the sub menu links.
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    And I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    And I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h1[text()='My Account']"
    And I should see element with xpath "//span[text()='My Cars']"
    And I should see element with xpath "//span[text()='My Details']"
    And I should see element with xpath "//span[text()='My Orders']"
    And I should see element with xpath "<//span[text()='My Part-exchange']"
    And I should see element with xpath "//span[text()='Sign Out']"
    And I should see element with xpath "<string>"
    
  
    

