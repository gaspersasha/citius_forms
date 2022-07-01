@finance_form
Feature: Finance Form
  In order to get finance for a car
  I want to ensure the finance form works

  # Details subform
  Scenario: New user Details step check with all expected fields in it
    # basic info
    Given I am on a "/finance?productAdvertId=3160159" page
    Then I should see "What is your title?" options
    Then I should see "Mr" option
    Then I should see "Mrs" option
    Then I should see "Dr" option
    Then I should see "Ms" option
    Then I should see "Miss" option
    Then I choose "Mrs" option
    Then I click on the button "Next"
    Then I should see label "firstName" with error
    Then I should see label "lastName" with error
    Then I fill in "firstName" with "BDD"
    Then I fill in "middleName" with "Doesnt matter"
    Then I fill in "lastName" with "Test"
    Then I click on the button "Next"

    # contacts
    Then I click on the button "Next"
    Then I should see label "email" with error
    Then I should see label "phone" with error
    Then I fill in "email" with "BDD"
    Then I click on the button "Next"
    Then I should see label "email" with error
    Then I clear "email"
    Then I fill in "email" with "BDD@bdd"
    Then I click on the button "Next"
    Then I should see label "email" with error
    Then I clear "email"
    Then I fill in "email" with "BDD@bdd.bdd"
    Then I click on the button "Next"
    # Then I should not see label "email" with error
    Then I fill in "phone" with "0123"
    Then I click on the button "Next"
    Then I should see label "phone" with error
    # TODO: clear here for some reason not working
    Then I clear "phone"
    # Then I fill in "phone" with "0123456789" 
    Then I fill in "phone" with "456789"
    Then I click on the button "Next"
    # Then I should not see label "phone" with error

    # birth
    Then I click on the button "Next"
    Then I should see label "dateOfBirth" with error
    Then I should see label "country-select" with error
    Then I fill in "dateOfBirth" with "12"
    # Then I should not see label "dateOfBirth" with error
    Then I click on the button "Next"
    Then I should see label "dateOfBirth" with error
    Then I clear "dateOfBirth"
    Then I fill in "dateOfBirth" with "12121974"
    Then I fill in "country-select" with "United Kingdom"
    Then I click on the button "Next"

    # Marital status
    Then I should see "What is your marital status?" options
    Then I should see "Single" option
    Then I should see "Married" option
    Then I should see "Common Law" option
    Then I should see "Separated" option
    Then I should see "Divorced" option
    Then I should see "Widowed" option
    Then I should see "Civil partnership" option
    Then I should see "Dissolved civil partnership" option
    Then I should see "Co-habiting" option
    Then I choose "Married" option
    Then I click on the button "Next"
    Then I should see "How many dependants do you have?" options
    Then I should see "None" option
    Then I should see "Two" option
    Then I should see "Three" option
    Then I should see "Four" option
    Then I should see "Five or more" option
    Then I choose "Five or more" option
    Then I click on the button "Next"
    Then I should see "What type of your driving licence do you have?" options
    Then I should see "Full UK" option
    Then I should see "European" option
    Then I should see "Provisional" option
    Then I should see "International" option
    Then I should see "None" option
    Then I choose "European" option
    Then I click on the button "Next"
    Then I should see "Do you have valid UK passport?" options
    Then I should see "Yes" option
    Then I should see "No" option
    Then I choose "Yes" option
    Then I click on the button "Next"

    # Address block
    Then I wait "10" seconds
    # Then I should see element with xpath "//span[text()='Address']"
    Then I click on "Enter address manually"
    Then I should see "postCode" input
    Then I should see "houseName" input
    Then I should see "houseNumber" input
    Then I should see "street" input
    Then I should see "district" input
    Then I should see "town" input
    Then I should see "county" input
    Then I fill in "postCode" with "SW9 0HP"
    Then I fill in "street" with "Clapham Road"
    Then I fill in "town" with "London"
    # Then I click on "I confirm the vehicle will be kept at this address"
    Then I check "I confirm the vehicle will be kept at this address" checkbox
    Then I click on the button "Next"

    # Residential status
    Then I should see "What is your residential status?" options
    Then I should see "Home owner" option
    Then I should see "Council tenant" option
    Then I should see "Housing association" option
    Then I should see "Living with family" option
    Then I should see "Private tenant" option
    Then I should see "Student accommodation" option
    Then I should see "Work accommodation" option
    Then I should see "Military accommodation" option
    Then I should see "Other" option
    Then I choose "Council tenant" option
    Then I click on the button "Next"

    # Years of living
    Then I should see "How many years have you lived at this address?" dropdown
    Then I should see "How many months did you live at this address?" dropdown
    Then I should see "0 Years" in "How many years have you lived at this address?" dropdown
    Then I should see "1 Year" in "How many years have you lived at this address?" dropdown
    Then I should see "2 Years" in "How many years have you lived at this address?" dropdown
    Then I should see "3+ Years" in "How many years have you lived at this address?" dropdown
    Then I select "3+ Years" in "How many years have you lived at this address?" dropdown
    Then I click on the button "Next"

    # Employment type
    Then I wait "20" seconds
    Then I should see "What is your employment type?" options
    Then I should see "Full time permanent" option
    Then I should see "Part time permanent" option
    Then I should see "Armed services" option
    Then I should see "Self employed" option
    Then I should see "Retired" option
    Then I should see "Education" option
    Then I should see "Homemaker" option
    Then I should see "Carer" option
    Then I should see "Benefits" option
    Then I should see "Unemployed" option
    Then I should see "Temporary / Contract" option
    Then I choose "Full time permanent" option
    Then I click on the button "Next"

    # Employer & job title
    # TODO: get text lookup to work
    # Then I should see text "We also need your" on page
    Then I should see text "Who is your employer?" on page
    Then I fill in "employer" with "Test"
    Then I should see text "What is your job title?" on page
    Then I fill in "jobTitle" with "Test"
    Then I click on the button "Next"

    # Employer address
    Then I should see text "Address" on page
    Then I should see text "Please add your employment address details below" on page
    Then I click on "Enter address manually"
    Then I fill in "postCode" with "SW9 0HP"
    Then I fill in "street" with "Clapham Road"
    Then I fill in "town" with "London"
    Then I click on the button "Next"

    # Annual income
    Then I should see text "Annual income" on page
    Then I should see text "Please enter your annual income before tax and including commission. This needs to be over £2,000 to continue" on page
    Then I fill in "salary" with "12345"
    Then I click on the button "Next"

    # Employment year
    Then I should see "How many years have you been working at this address?" dropdown
    Then I should see "How many months have you been working at this address?" dropdown
    Then I should see "0 Years" in "How many years have you been working at this address?" dropdown
    Then I should see "1 Year" in "How many years have you been working at this address?" dropdown
    Then I should see "2 Years" in "How many years have you been working at this address?" dropdown
    Then I should see "3+ Years" in "How many years have you been working at this address?" dropdown
    Then I select "3+ Years" in "How many years have you been working at this address?" dropdown
    Then I click on the button "Next"

    # Account number
    Then I wait "20" seconds
    # Then I should see text "Filling in the details below will get you a wider range of quotes" on page
    Then I should see text "What is your account number?" on page
    Then I should see text "Your bank account number is 8 digits long and can usually be found on your debit card, cheque book or online banking service" on page
    Then I should see text "Your bank sort code is 6 digits long and can usually be found next to your account number" on page
    Then I should see text "What is your Sort Code?" on page
    Then I fill in "accountNumber" with "11111111"
    Then I fill in "sortCode" with "123345"
    Then I click on the button "Next"

    # Bank member
    Then I should see "How many years have you been a member of this bank?" dropdown
    Then I should see text "Please provide how many years you have had an account with this bank" on page
    Then I should see "0 Years" in "How many years have you been a member of this bank?" dropdown
    Then I should see "1 Year" in "How many years have you been a member of this bank?" dropdown
    Then I should see "2 Years" in "How many years have you been a member of this bank?" dropdown
    Then I should see "3+ Years" in "How many years have you been a member of this bank?" dropdown
    Then I should see "How many months have you been a member of this bank?" dropdown
    Then I should see text "Please provide how many months you have had an account with this bank" on page
    Then I select "3+ Years" in "How many years have you been a member of this bank?" dropdown
    Then I click on the button "Next"

    # Last page
    Then I wait "20" seconds
    Then I should see text "Almost done!" on page
    Then I should see text "Find me my best available rate" on page
    Then I click on "Find me my best available rate"
    Then I click on the button "Submit my application"

    # Thank you page
    Then I wait "20" seconds
    Then I should be on "/finance-thank-you" page
    Then I should see text "Thank you, your finance" on page
    # Then I should see text "We are checking your eligibility and will get back to you in the" on page
    Then I should see text "What happens next?" on page
