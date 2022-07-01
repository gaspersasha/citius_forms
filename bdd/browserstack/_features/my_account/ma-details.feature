@my_account @my-details
Feature: My Detail page
  As a user I want to able to see & use new My Details page in MA

  Scenario: My Detail page on MA general items
#    Login
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    When I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    Then I should see element with xpath "//span[text()='Enter your email address and password']"
    And I fill in "email" with existed user data "my-details@test.com"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "8000" ms
    Then I should see element with xpath "//span[text()='My Account']"
#    My details general fields
    Given I am on a "/account/my-details" page
    And I wait a maximum of "5000" ms
#    Your sign in details
    Then I should see element with xpath "//h1[contains(text(),'Edit your personal details')]"
    And I should see element with xpath "//h6[text()='These details control how you sign-in to your buycar.co.uk account. Your email address is the address we will use to send any email correspondence to, whether we are responding to your question or sending you an update on your order.']"
    And I should see element with xpath "//h4[text()='Your sign in details']"
    And I should see element with xpath "//span[text()='Email']"
    And I should see element with xpath "//input[@value='my-details@test.com']"
    And I should see element with xpath "//span[text()='Confirm email']"
    And I should see element with xpath "//p[text()='If you wish to change your password enter the new one here, otherwise leave it blank to keep your current password.']"
    And I should see element with xpath "//span[text()='Password']"
    And I should see element with xpath "//span[text()='Confirm password']"

  #    Your profile information 1. About you
    And I should see element with xpath "//h4[text()='Your profile information']"
    And I should see element with xpath "//p[text()='1. About you']"
    And I should see element with xpath "//span[text()='Title']"
    And I should see element with xpath "//span[text()='First name']"
    And I should see element with xpath "//input[@value='TheFirstName']"
    And I should see element with xpath "//span[text()='Middle name']"
    And I should see element with xpath "//span[text()='Last name']"
    And I should see element with xpath "//input[@value='LastName']"
    And I should see element with xpath "//input[@placeholder='As on your driving license']"
#    2. Date of birth and contact
    And I should see element with xpath "//p[text()='2. Date of birth and contact']"
    And I should see element with xpath "//span[text()='Date of birth']"
    And I should see element with xpath "//div[text()='You must be at least 18 to apply for finance']"
    And I should see element with xpath "//input[@value='12/12/1999']"
    And I should see element with xpath "//span[text()='Telephone number']"
    And I should see element with xpath "//div[text()='To keep you updated on your purchase']"
    And I should see element with xpath "//input[@value='0987654321']"
    And I should see element with xpath "//span[text()='Alternative telephone number']"
#    3. Address details
    And I should see element with xpath "//p[text()='3. Address details']"
    And I should see element with xpath "//span[text()='Postcode']"
    And I should see element with xpath "//input[@value='SW9 0HP']"
    And I should see element with xpath "//span[text()='House name']"
    And I should see element with xpath "//input[@value='119']"
    And I should see element with xpath "//span[text()='House number']"
    And I should see element with xpath "//span[text()='Street']"
    And I should see element with xpath "//input[@value='Clapham Road']"
    And I should see element with xpath "//span[text()='District']"
    And I should see element with xpath "//span[text()='Town']"
    And I should see element with xpath "//input[@value='London']"
    And I should see element with xpath "//span[text()='Сounty']"
#  4. Additional details
    And I should see element with xpath "//p[text()='4. Additional details']"
    And I should see element with xpath "//span[text()='Сompany']"
    And I should see element with xpath "//input[@value='BAC']"
    And I should see element with xpath "//span[text()='Marital status']"
    And I should see element with xpath "//span[text()='Number of dependants']"
    And I should see element with xpath "//div[text()='How many people rely on your for financial support? Such as children']"
    And I should see element with xpath "//span[text()='Driving licence']"
    And I should see element with xpath "//span[text()='Valid UK passport']"
    And I should see element with xpath "//div[text()='Please select if you have a valid British passport']"
#    Unsubscribe block
    And I should see element with xpath "//p[text()='Unsubscribe']"
    And I should see element with xpath "//p[text()='As described in our Privacy Policy we will use the information you have shared to send you communications about such products and services. If you do not wish to receive these communications from us then please check here and you will be unsubscribed from this activity.']"
    And I should see element with xpath "//p[text()='If you’d like to know more about how your details are stored, please view our ']"
    And I should see element with xpath "//input[@data-id='input_checkbox']"
    And I should see element with xpath "//button[@type='submit']"

  Scenario: User can edit account detail
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
    And I wait a maximum of "3000" ms
    Then I should see element with xpath "//span[text()='My Account']"
    Given I am on a "/account/my-details" page
    And I wait a maximum of "5000" ms
#  Editing existed data and adding new
    Then I should see element with xpath "//input[@value='TestFirstName']"
    And I should see element with xpath "//input[@value='TestLastName']"
    And I fill in "firstName" with "NotTheFirstName"
    And I fill in "lastName" with "NotTheLastName"
    And I select element with xpath "//select[1]/option[2]"
    And I fill in "postcode" with "BS5 0UQ"
    And I fill in "houseName" with "119, Rawnsley House"
    And I fill in "street" with "Goodhind Street"
    And I fill in "town" with "Bristol"
    And I fill in "dateOfBirth" with "12/12/1999"
    And I fill in "phone" with "0987654321"
    When I click on the element with xpath "//button[@type='submit']"
    And I wait a maximum of "8000" ms
    And I should not see a element with class "error-input-border"
    And I should see element with xpath "//input[@value='BS5 0UQ']"
    And I should see element with xpath "//input[@value='Goodhind Street']"
    And I should see element with xpath "//input[@value='Bristol']"
    And I should see element with xpath "//input[@value='12/12/1999']"
    And I should see element with xpath "//input[@value='0987654321']"

  Scenario: Account detail page service messages
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
    And I wait a maximum of "3000" ms
    Then I should see element with xpath "//span[text()='My Account']"
    Given I am on a "/account/my-details" page
    And I wait a maximum of "5000" ms
#  Error & service messages
    When I click on the element with xpath "//button[@type='submit']"
    And I wait a maximum of "3000" ms
    Then I should see element with a classname "error-input-border"

    Scenario: My Details page not available to use for not logged user
      Given I am on a "/account/my-details" page
      When I wait a maximum of "8000" ms
      Then I should see element with id "__next"
      Then I should see element with xpath "//h2[text()='Please log in']"
      And I should see element with xpath "//p[text()='You need to be logged in to access this page, please log in via the link below']"
      Then I should see element with xpath "//button[text()='Log in']"