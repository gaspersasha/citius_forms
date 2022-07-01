      @finance_form
      Feature: Finance Form NEW
        In order to get finance for a car
        I want to ensure the finance form works

    #    Most Detail form check
      @finance-form-detailed
      Scenario: Detail form check with all expected fields in it
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

    #  Check that the header and footer are hidden
        Then I should not see a "header.region-header" element
        Then I should not see a "footer.region-footer" element

    #    breadcrumb not implemented
    #    And the "breadcrumb item-list" element should be invisible

    #    Marital status
        Then I should see element with xpath "//div[text()='What is your marital status?']"
        Then I should see element with xpath "//span[text()='Single']/following::input"
        Then I should see element with xpath "//span[text()='Common law']/following::input"
        Then I should see element with xpath "//span[text()='Separated']/following::input"
        Then I should see element with xpath "//span[text()='Divorced']/following::input"
        Then I should see element with xpath "//span[text()='Widowed']/following::input"
        Then I should see element with xpath "//span[text()='Civil partnership']/following::input"
        Then I should see element with xpath "//span[text()='Dissolved civil partnership']/following::input"
        Then I should see element with xpath "//span[text()='Co-habiting']/following::input"
        And I select element with xpath "//input[@value='SEPARATED']"
        When I click on the element with class "button-forward"
        And I wait a maximum of "1000" ms
        Then I should see element with a classname "error-input-label"

        #  DoB, Country & telephone
        And I wait a maximum of "1000" ms
        And I fill in "dateOfBirth" with "12121987"
        And I fill in "phone" with "0123456789"
        And I fill in "country-select" with "United Kingdom"
        When I click on the element with class "button-forward"
        And I wait a maximum of "2000" ms

    #    Number of dependants
        Then I should see element with xpath "//div[text()='How many dependants do you have?']"
        And I should see element with xpath "//div[text()='How many people rely on your for financial support? Such as children']"
        And I fill in "dependants" with "1"
        When I click on the element with class "button-forward"

        #    UK passport
        Then I should see element with xpath "//div[text()='Do you have valid UK passport?']"
        And I should see element with xpath "//div[text()='Select from the list below']"
        And I should see element with xpath "//span[text()='Yes']/following::input"
        And I should see element with xpath "//span[text()='No']/following::input"
        When I click on the element with class "button-forward"

    #    driving licence
        Then I should see element with xpath "//div[text()='What type of your driving licence do you have?']"
        And I should see element with xpath "//div[text()='Select from the list below']"
        And I should see element with xpath "//span[text()='Full UK']/following::input"
        And I should see element with xpath "//span[text()='European']/following::input"
        And I should see element with xpath "//span[text()='Provisional']/following::input"
        And I should see element with xpath "//span[text()='International']/following::input"
        And I should see element with xpath "//span[text()='None']/following::input"
        And I select element with xpath "//input[@value='EUROPEAN']"
        When I click on the element with class "button-forward"

    #    Address block
       And I wait a maximum of "5000" ms
       Then I should see element with xpath "//span[text()='Address']"
       And I should see element with a classname "label-sub-title"
       And I should see element with a classname "loqate-address-link__text"
       When I click on the element with class "loqate-address-link__text"
       Then I should see element with xpath "//span[text()='Postcode']"
       And I should see element with xpath "//span[text()='House name']"
       And I should see element with xpath "//span[text()='House number']"
       And I should see element with xpath "//span[text()='Street']"
       And I should see element with xpath "//span[text()='District']"
       And I should see element with xpath "//span[text()='Town']"
       And I should see element with xpath "//span[text()='County']"
       And I fill in "postCode" with "SW9 0HP"
       And I fill in "street" with "Clapham Road"
       And I fill in "town" with "London"
       When I click on the element with class "button-forward"

    #    Residential status
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//div[text()='What is your residential status?']"
       And I should see element with xpath "//div[text()='Select from the list below']"
       And I should see element with xpath "//input[@value='HOME_OWNER']"
       And I should see element with xpath "//input[@value='COUNCIL_TENANT']"
       And I should see element with xpath "//input[@value='HOUSING_ASSOCIATION']"
       And I should see element with xpath "//input[@value='LIVING_WITH_FAMILY']"
       And I should see element with xpath "//input[@value='PRIVATE_TENANT']"
       And I should see element with xpath "//input[@value='STUDENT_ACCOMMODATION']"
       And I should see element with xpath "//input[@value='WORK_ACCOMMODATION']"
       And I should see element with xpath "//input[@value='MILITARY_ACCOMMODATION']"
       And I should see element with xpath "//input[@value='OTHER']"
       When I click on the element with class "button-forward"

    #    Years of living
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//div[text()='How many years have you lived at this address?']"
       And I should see element with xpath "//div[text()='Please provide how many years you have been staying at this address below']"
       And I should see element with xpath "//span[text()='0 Years']/following::input"
       And I should see element with xpath "//span[text()='1 Year']/following::input"
       And I should see element with xpath "//span[text()='2 Years']/following::input"
       And I should see element with xpath "//span[text()='3+ Years']/following::input"
       And I should see element with xpath "//span[text()='How many months did you live at this address?']"
       And I should see element with xpath "//div[text()='Please provide how many months you have been staying at this address below']"
       And I should see element with xpath "//select[@data-id='months_at_address']"
       And I select element with xpath "//span[text()='3+ Years']/following::input"
       When I click on the element with class "button-forward"

    #   Employment type
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//p[text()='We also need your ']"
       And I should see element with xpath "//div[text()='What is your employment type?']"
       And I should see element with xpath "//div[text()='Select from the list below']"
       And I should see element with xpath "//input[@value='FULL_TIME_PERMANENT']"
       And I should see element with xpath "//input[@value='PART_TIME_PERMANENT']"
       And I should see element with xpath "//input[@value='ARMED_SERVICES']"
       And I should see element with xpath "//input[@value='SELF_EMPLOYED']"
       And I should see element with xpath "//input[@value='RETIRED']"
       And I should see element with xpath "//input[@value='EDUCATION']"
       And I should see element with xpath "//input[@value='HOMEMAKER']"
       And I should see element with xpath "//input[@value='CARER']"
       And I should see element with xpath "//input[@value='BENEFITS']"
       And I should see element with xpath "//input[@value='UNEMPLOYED']"
       And I should see element with xpath "//input[@value='TEMPORARY_CONTRACT']"
       When I click on the element with class "button-forward"

    # Employer & job title
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//p[text()='We also need your ']"
       And I should see element with xpath "//span[text()='Who is your employer?']"
       And I should see element with xpath "//div[text()='Please provide your employer below']"
       And I should see element with xpath "//span[text()='What is your job title?']"
       And I should see element with xpath "//div[text()='Please provide your job title below']"
       And I fill in "employer" with "Test"
       And I fill in "jobTitle" with "Test"
       When I click on the element with class "button-forward"
       And I wait a maximum of "2000" ms

    #    Employer address
       Then I should see element with xpath "//div[text()='Please add your employment address details below']"
       And I should see element with xpath "//span[text()='Address']"
       When I click on the element with class "loqate-address-link__text"
       And I fill in "postCode" with "SW9 0HP"
       And I fill in "street" with "Clapham Road"
       And I fill in "town" with "London"
       When I click on the element with class "button-forward"

    #    Annual income
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//span[text()='Annual income']"
       And I should see element with xpath "//div[text()='Please enter your annual income before tax and including commission. This needs to be over £2,000 to continue']"
       And I fill in "salary" with "12345"
       When I click on the element with class "button-forward"

    #    Employment year
       And I wait a maximum of "3000" ms
       Then I should see element with xpath "//div[text()='How many years have you been working at this address?']"
       And I should see element with xpath "//div[text()='Please provide your employment information below']"
       And I should see element with xpath "//span[text()='0 Years']/following::input"
       And I should see element with xpath "//span[text()='1 Year']/following::input"
       And I should see element with xpath "//span[text()='2 Years']/following::input"
       And I should see element with xpath "//span[text()='3+ Years']/following::input"
       And I select element with xpath "//span[text()='3+ Years']/following::input"
       When I click on the element with class "button-forward"

    #    Account number
       And I wait a maximum of "5000" ms
       Then I should see element with xpath "//p[text()='Some']"
       And I should see element with xpath "//span[text()='What is your account number?']"
       And I should see element with xpath "//div[text()='Your bank account number is 8 digits long and can usually be found on your debit card, cheque book or online banking service']"
       And I should see element with xpath "//span[text()='What is your Sort Code?']"
       And I should see element with xpath "//div[text()='Your bank sort code is 6 digits long and can usually be found next to your account number']"
       And I fill in "accountNumber" with "11111111"
       And I fill in "sortCode" with "123345"
       When I click on the element with class "button-forward"

    #    Bank member
       And I wait a maximum of "5000" ms
       Then I should see element with xpath "//div[text()='How many years you are member of this bank?']"
       And I should see element with xpath "//div[text()='Please provide how many years you have a business with this bank']"
       And I should see element with xpath "//span[text()='0 Year(s)']/following::input"
       And I should see element with xpath "//span[text()='1 Year(s)']/following::input"
       And I should see element with xpath "//span[text()='2 Year(s)']/following::input"
       And I should see element with xpath "//span[text()='3 Year(s)']/following::input"
       And I should see element with xpath "//span[text()='4+ Year(s)']/following::input"
       And I select element with xpath "//span[text()='4+ Year(s)']/following::input"
       And I should see element with xpath "//span[text()='How many months you are member of this bank?']"
       And I should see element with xpath "//div[text()='Please provide how many months you have a business with this bank']"
       And I should see element with xpath "//select[@data-id='months_at_bank']"
       When I click on the element with class "button-forward"

    #    Last page
       And I wait a maximum of "5000" ms
       Then I should see element with xpath "//h3[text()='Almost done!']"
       And I should see element with xpath "//h3[text()='Choose your next steps:']"
       And I should see element with xpath "//label[@for='send-to-lender']"
       And I select element with xpath "//input[@value='send-to-lender']"
       When I click on the element with xpath "//button[@type='submit']"

        @SCC
      Scenario: Check that user can land on finance form from PP
       #    Login as a user with SCC
        Given I am on a "/account" page
        And I should wait "5000" ms for element with class "link--button-forward"
        When I click on the button with class "link--button-forward"
        And I should wait "5000" ms for element with class "modal-container--react modal--auth"
        Then I should see element with xpath "//span[text()='Enter your email address and password']"
        And I fill in "email" with existed user data "scc-true@test.bdd"
        And I fill in "password" with "Test123*"
        When I click on the button with class "authentication-typo authentication-submit"
        And I wait a maximum of "3000" ms
        Then I should see element with xpath "//span[text()='My Account']"
        Given I am on a "/ford/focus/focus-hatchback/1-0-ecoboost-125-st-line-5dr-auto-75624/deal-3724923" page
        And I wait a maximum of "8000" ms
        When I click on the button with id "tabPrSectionApplyForFin"
        And I wait a maximum of "5000" ms
        Then I should be on URL that contains "finance?productAdvertId=3724923&financeQuoteId=10743782"

      Scenario: Check the body class isn't added when param isn't present
        Given I am on a "/finance" page
        Then I should not see a "body.finance-partner--aex" element

      @form_privacy_notice
      Scenario: Check privacy notice on reserve form
        Given I am on a "finance" page
        And I wait a maximum of "5000" ms
        Then I should see "Privacy Notice" in the element with xpath "//h2[text()='Privacy Notice']"
        And I should see element with xpath "//div[text()='We will use the details you have shared to manage your car purchase. You agree to the processing, storage,  sharing and use of this information for the purpose of managing your car purchase as described in our ']"
        And I should see element with xpath "//div[text()='We believe that based on this purchase you may be interested in other related products and services we  offer. As described in our']"
        And I should see element with xpath "//a[contains(text(),'detailed here')]"
        And I should see the link with name "Privacy Policy"
        And I see unselected checkbox with name "mailUnsubscriber"
        And I should see the link with name "detailed here"

        @back_button
      Scenario: Back button functionality
          Given I am on a "finance" page
          And I wait a maximum of "5000" ms
          And I fill in "dateOfBirth" with "12121987"
          And I fill in "phone" with "0123456789"
          And I fill in "country-select" with "United Kingdom"
          When I click on the element with class "button-forward"
          And I wait a maximum of "1000" ms
          When I click on the element with xpath "//button[text()='Back']"
          And I wait a maximum of "5000" ms
          Then I should see element with xpath "//input[@value='0123456789']"
