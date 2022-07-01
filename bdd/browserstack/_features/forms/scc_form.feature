  @scc_form
  Feature: Soft credit check
    In order to get soft credit check
    I want to ensure the SCC form works

    Scenario: Soft credit check form in general detail
#      with car
      Given I am on a "/finance-eligibility?productAdvertId=3094078" page
      When I wait a maximum of "5000" ms
      Then I should see element with xpath "//h1[text()='Your finance eligibility']"
      And I should see element with xpath "//p[text()='Find out your finance eligibility, with no impact on your credit score']"
#      Title
      And I should see element with xpath "//div[text()='What is your title?']"
      And I should see element with xpath "//div[text()='Select from the list below']"
      And I should see element with xpath "//input[@value='MR']"
      And I should see element with xpath "//input[@value='MRS']"
      And I should see element with xpath "//input[@value='DR']"
      And I should see element with xpath "//input[@value='MS']"
      And I should see element with xpath "//input[@value='MISS']"
#   First name
      And I should see element with xpath "//span[text()='First name']"
      And I should see element with xpath "//div[text()='First name as it is on your driving licence']"
      And I should see element with xpath "//input[@placeholder='e.g. James']"
#   Middle name
      And I should see element with xpath "//span[text()='Middle name']"
      And I should see element with xpath "//div[text()='Middle name as it is on your driving licence']"
      And I should see element with xpath "//input[@placeholder='e.g. Anderson']"
#   Last name
      And I should see element with xpath "//span[text()='Last name']"
      And I should see element with xpath "//div[text()='Last name as it is on your driving licence']"
      And I should see element with xpath "//input[@placeholder='e.g. Balwin']"
#   Email
      And I should see element with xpath "//span[text()='Email']"
      And I should see element with xpath "//div[text()='Your email will be your username to login']"
      And I should see element with xpath "//input[@placeholder='e.g. email@email.com']"
#   Date of birth
      And I should see element with xpath "//span[text()='Date of birth']"
      And I should see element with xpath "//div[text()='You must be over 18']"
      And I should see element with xpath "//input[@placeholder='14/12/1990']"
#   Address
      And I should see element with xpath "//span[text()='Address']"
      And I should see element with xpath "(//div[@data-id='input_text_sub'])[4]"
      And I should see element with xpath "//input[@placeholder='Start typing your address to search']"
      And I should see element with xpath "//div[text()='Enter address manually']"
#      Address manually
      When I click on the element with xpath "//div[@data-id='enter_address_manually']"
      And I should see element with xpath "//span[text()='Postcode']"
      And I should see element with xpath "//input[@placeholder='Postcode']"
      And I should see element with xpath "//span[text()='House name']"
      And I should see element with xpath "//input[@placeholder='House name']"
      And I should see element with xpath "//span[text()='House number']"
      And I should see element with xpath "//input[@placeholder='House number']"
      And I should see element with xpath "//span[text()='Street']"
      And I should see element with xpath "//input[@placeholder='Street']"
      And I should see element with xpath "//span[text()='District']"
      And I should see element with xpath "//input[@placeholder='District']"
      And I should see element with xpath "//span[text()='Street']"
      And I should see element with xpath "//input[@placeholder='Street']"
      And I should see element with xpath "//span[text()='District']"
      And I should see element with xpath "//input[@placeholder='District']"
      And I should see element with xpath "//span[text()='Town']"
      And I should see element with xpath "//input[@placeholder='Town']"
      And I should see element with xpath "//span[text()='County']"
      And I should see element with xpath "//input[@placeholder='County']"
#   Phone
      And I should see element with xpath "//span[text()='Telephone number']"
      And I should see element with xpath "//div[text()='To keep you up to date with your purchase']"
      And I should see element with xpath "//input[@placeholder='e.g. 07712345678']"
#   Submit + Privacy Notice
      And I should see element with xpath "//button[text()='Submit']"
      And I should see element with xpath "//button[@type='submit']/following-sibling::p[1]"
      And I should see element with xpath "//h2[text()='Privacy Notice']"
      And I should see element with xpath "//div[text()='We will use the details you have shared to manage your car purchase. You agree to the processing, storage,  sharing and use of this information for the purpose of managing your car purchase as described in our ']"
      And I should see element with xpath "//div[text()='We believe that based on this purchase you may be interested in other related products and services we  offer. As described in our']"
      And I should see element with xpath "//a[@href='http://www.autovia.co.uk/brands']"
      And I should see element with xpath "//input[@data-id='input_checkbox']"
      And I see unselected checkbox with name "mailUnsubscriber"

#    Without car
      Given I am on a "/finance-eligibility" page
      When I wait a maximum of "5000" ms
#    Annual income
      Then I should see element with xpath "//span[text()='Annual income']"
      And I should see element with xpath "//div[text()='Enter your annual income before any tax and including commission payments']"
      And I should see element with xpath "//input[@data-id='annual_income']"

  Scenario: Error (service) messages for SCC form
    Given I am on a "/finance-eligibility" page
    And I wait a maximum of "5000" ms
    When I click on the element with xpath "//button[text()='Submit']"
    Then I should see element with a classname "error-input-border"
    And I should see element with xpath "//p[text()='*The email address you entered is not valid, please try again.']"
#    Error message will be updated as a part of BE-762
    And I should see element with xpath "//p[text()='Please enter your annual income. Your income must be great than or equal to £2000']"

  @smoke
  Scenario: Happy pass for SCC form without car
    Given I am on a "/finance-eligibility" page
    And I wait a maximum of "5000" ms
    And I fill in "firstName" with "First"
    And I should see element with xpath "//input[@value='First']"
    And I fill in "middleName" with "Test"
    And I should see element with xpath "//input[@value='Test']"
    And I fill in "lastName" with "Test"
    And I should see element with xpath "//input[@value='Test']"
    #    DoB fill step
    And I fill in "dateOfBirth" with "12121999"
    And I should see element with xpath "//input[@value='12/12/1999']"
    And I fill in "email" with "bdd1@test.com"
    When I click on the element with class "loqate-address-link__text"
    And I wait a maximum of "2000" ms
    Then I should see element with xpath "//span[text()='Postcode']"
    And I fill in "postCode" with "SW90HP"
    And I should see element with xpath "//input[@value='SW90HP']"
    And I fill in "houseName" with "London"
    And I should see element with xpath "//input[@value='London']"
    And I fill in "houseNumber" with "123"
    And I should see element with xpath "//input[@value='123']"
    And I fill in "street" with "Clapham Road"
    And I should see element with xpath "//input[@value='Clapham Road']"
    And I fill in "district" with "London area"
    And I should see element with xpath "//input[@value='London area']"
    And I fill in "town" with "London"
    And I should see element with xpath "//input[@value='London']"
    And I fill in "county" with "UK"
    And I should see element with xpath "//input[@value='UK']"
    And I fill in "telephone" with "0723456789"
    And I should see element with xpath "//input[@value='0723456789']"
    And I fill in "currentIncome" with "2500"
    When I click on the element with xpath "//button[text()='Submit']"
    And I should not see a element with class "error-input-border"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h4[text()='Hold on while we fetch your credit score results']"
    And I wait a maximum of "50000" ms
    And I should see element with a classname "page-title"
    Then I should see element with xpath "//h1[text()='Your finance eligibility']"


    @service_message @error_message
    Scenario: Service messages for mandatory fields (SCC form)
      Given I am on a "/finance-eligibility" page
      And I wait a maximum of "5000" ms
      When I click on the element with xpath "//button[text()='Submit']"
      And I should see element with a classname "error-input-border"
      Then I should see element with xpath "//p[text()='*The email address you entered is not valid, please try again.']"
      And I should see element with xpath "//p[text()='*Income must be greater or equal to £2000']"
      And I fill in "currentIncome" with "1500"
      When I click on the element with xpath "//button[text()='Submit']"
      And I should see element with xpath "//p[text()='*Income must be greater or equal to £2000']"

    @login_popup
    Scenario: Happy pass for SCC form with existed user
      Given I am on a "/finance-eligibility" page
      And I wait a maximum of "5000" ms
      And I fill in "email" with existed user data "bdd_testing@dennis.co.uk"
      And I fill in "firstName" with "First"
      And I should see element with xpath "//input[@value='First']"
      And I fill in "middleName" with "Test"
      And I fill in "lastName" with "Test"
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//h4[text()='Welcome back']"
      And I fill in element with id "user_password" value "Test123@*"
      When I click on the element with xpath "//button[@type='submit']"
      And I wait a maximum of "4000" ms
      And I should see element with xpath "//input[@value='NOTfirstName']"
      And I should see element with xpath "//input[@value='bdd_testing@dennis.co.uk']"
      When I click on the element with xpath "//button[text()='Submit']"
      And I should not see a element with class "error-input-border"
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//h4[text()='Hold on while we fetch your credit score results']"
      And I wait a maximum of "50000" ms
      And I should see element with a classname "page-title"
      Then I should see element with xpath "//h1[text()='Your finance eligibility']"

    @login_popup
    Scenario: Login popup (SCC form)
      Given I am on a "/finance-eligibility" page
      And I wait a maximum of "5000" ms
      And I fill in "email" with existed user data "bdd_testing@dennis.co.uk"
      And I fill in "firstName" with "First"
      And I should see element with xpath "//input[@value='First']"
      And I fill in "middleName" with "Test"
      And I fill in "lastName" with "Test"
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//h4[text()='Welcome back']"
      And I should see element with xpath "//h5[text()='From your email address it looks like you already have an account with us.']"