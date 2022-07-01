@smoke @react @login
Feature: New login in a header
  As a user I want to able to see & use new login from header

  Scenario: New Login header contains all element on desktop
    Given I am on a "/account" page
    When I click on the button "Log in"
    Then I should see modal "Login form"

  Scenario: New login without credentials
    Given I am on a "/account" page
    When I click on the button "Log in"
    And I should see modal "Login form"
    And I click on the button "Login"
    Then I should see error "Please enter your email and password"

  # works only with recapcha, which locally isn't working properly ://
  Scenario: Reset password without email
    Given I am on a "/account" page
    When I click on the button "Log in"
    And I click on "Forgot password?"
    And I click on the button "Send reset link"
    # issue with reCaptcha locally
    Then I should see error "Please enter your email"

  # Scenario: Login with valid user
  #   Given I am on a "account" page
  #   When I click on the button "Log in"
  #   And I enter "test_BDD" user data on "AuthPopup" page
  #   And I do click on "AuthPopup" page on "submitButton" element
  #   Then I expect "loginButton" element is not visible on "Account" page