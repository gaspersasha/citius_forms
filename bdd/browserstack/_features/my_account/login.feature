@smoke @new_header @react @new_login
  Feature: New login in a header
    As a user I want to able to see & use new login from header

  Scenario: New Login header contains all element on desktop
#    makes against MA 'cause login button is not interactable from header for some reason (currently investigation)
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    When I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    Then I should see element with xpath "//span[text()='Enter your email address and password']"
    And I should see element with xpath "//span[text()='Remember me']"
    And I see selected checkbox with id "authRememberMe"
    And I should see element with xpath "//span[text()='Show password']"
    And I should see element with xpath "//button[@type='submit']"
#  "//button[@data-id='submit_btn']"
    And I should see element with xpath "//span[text()='Forgot password?']"
#  "//span[@data-id='forgotPassword']"
#    And I should see element with xpath "//span[text()='Don’t have an account? ']"
#    And I should see element with xpath "//b[text()='Sign up']"

    When I click on the element with xpath "//button[@type='submit']"
#    When I click on the element with xpath "//button[@data-id='submit_btn']"
    And I wait a maximum of "1000" ms
    Then I should see element with xpath "//span[text()='Please enter your email and password']"

    When I click on the element with xpath "//span[text()='Forgot password?']"
#  "//span[@data-id='forgotPassword']"
    And I wait a maximum of "1000" ms
    Then I should see element with xpath "//h6[text()='Reset password']"
    And I should see element with xpath "//h6[text()='Reset password']/following-sibling::span"
    And I should see element with xpath "//span[text()='Back to login']"
#    And I should see element with xpath "//button[@data-id='submit_reset']"
    When I click on the element with xpath "//button[@type='submit']"
#  "//button[@data-id='submit_reset']"
    And I wait a maximum of "1000" ms
    Then I click on the element with xpath "//span[text()='Please enter your email']"

    When I click on the element with xpath "//span[text()='Back to login']"
    Then I click on the element with xpath "//h6[text()='Sign in to your BuyaCar account']"
    And I fill in "email" with "bdd_testing@dennis.co.uk"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//span[text()='My Account']"