Feature: As a user
  In order to use all MA functional
  As a user
  I want to be able to use all extra functionality in my account

  Scenario: Check possibility to change/confirm user name.
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    And I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    And I fill in "email" with "bdd-test@test.com"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h1[text()='My Account']"
    Given I am on a "account/verify-id/confirm-name" page
    Then I wait a maximum of "5000" ms
    And I should see element with xpath "//h1[text()='Confirm your name']"
    And I should see element with xpath "//h4[text()='Confirm your name']"
    And I should see element with xpath "//div[text()='Is the name on your driving licence spelled exactly the same way as below?']"
    And I should see element with xpath "//div[text()='We use Onfido to easily and securely verify your identity online.']"
    And I should see element with xpath "//button[text()='Yes. Continue to identity verification']"
    And I should see element with xpath "//a[@role='button']"