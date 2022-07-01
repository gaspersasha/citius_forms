  @finance_form @smoke @e2e @user_journey
  Feature: Finance Form OLD
    In order to get finance for a car
    I want to ensure the finance form works

  Scenario: User can land on Finance form from homepage (without car)
      Given I am on a "account" page
      And I should wait "5000" ms for element with class "link--button-forward"
      When I click on the button with class "link--button-forward"
      And I should wait "5000" ms for element with class "modal-container--react modal--auth"
      Then I should see element with xpath "//span[text()='Enter your email address and password']"
#    Creating new user
      When I click on the element with xpath "//b[text()='Sign up']"
      Then I should see element with xpath "//h6[text()='Create a BuyaCar account']"
      And I fill in "email" with "Test@test.com"
      And I fill in "firstName" with "TestFirstName"
      And I fill in "lastName" with "TestLastName"
      And I fill in "password" with "Test123*"
      When I click on the element with xpath "//button[@type='submit']"
      And I wait a maximum of "8000" ms
      Then I should see element with xpath "//span[text()='My Account']"
      Given I am on a "/finance" page
      And I wait a maximum of "5000" ms
      Then I select element with xpath "//input[@value='SEPARATED']"
      And I wait a maximum of "1000" ms
      And I fill in "dateOfBirth" with "12121987"
      And I fill in "phone" with "0123456789"
      And I fill in "country-select" with "United Kingdom"
      When I click on the element with class "button-forward"
      And I wait a maximum of "2000" ms
      And I fill in "dependants" with "1"
      And I click on the element with class "button-forward"
      And I click on the element with class "button-forward"
      And I select element with xpath "//input[@value='EUROPEAN']"
      When I click on the element with class "button-forward"
      And I wait a maximum of "8000" ms
      Then I should see element with xpath "//span[text()='Address']"
      When I click on the element with class "loqate-address-link__text"
      And I fill in "postCode" with "SW9 0HP"
      And I fill in "street" with "Clapham Road"
      And I fill in "town" with "London"
      When I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      And I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      And I select element with xpath "//span[text()='3+ Years']/following::input"
      And I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      When I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      And I fill in "employer" with "Test"
      And I fill in "jobTitle" with "Test"
      When I click on the element with class "button-forward"
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//span[text()='Address']"
      When I click on the element with class "loqate-address-link__text"
      And I fill in "postCode" with "SW9 0HP"
      And I fill in "street" with "Clapham Road"
      And I fill in "town" with "London"
      When I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      Then I should see element with xpath "//span[text()='Annual income']"
      And I fill in "salary" with "12345"
      When I click on the element with class "button-forward"
      And I wait a maximum of "3000" ms
      And I select element with xpath "//span[text()='3+ Years']/following::input"
      When I click on the element with class "button-forward"
      And I wait a maximum of "5000" ms
      And I fill in "accountNumber" with "11111111"
      And I fill in "sortCode" with "123345"
      When I click on the element with class "button-forward"
      And I wait a maximum of "5000" ms
      And I select element with xpath "//span[text()='4+ Year(s)']/following::input"
      When I click on the element with class "button-forward"

      #    Last page
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//h3[text()='Almost done!']"
      And I select element with xpath "//input[@value='send-to-lender']"
      When I click on the element with xpath "//button[@type='submit']"