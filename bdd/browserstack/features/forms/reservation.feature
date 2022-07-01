@reservation
Feature: Reservation form
  As a user I want to pay reservation coast
  To secure car for purchase
  I want to ensure the reservation form works

  Scenario: Whole user journey from step 1 to the action buttons
  Locally new reserve in Next project called goreserve
    Given I am on a "/reservation" page
    Then I wait "10" seconds
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    When I click on the button "Next"
    And I wait "1" seconds
    And I fill in "emailAddress" with "jaoe@bgs.com"
    And I fill in "telephoneNumber" with "0723456789"
    And I fill in "altertnativePhone" with "0723456780"
    When I click on the button "Next"
    And I wait "1" seconds
    When I click on element with data-id "enter-address-manually"
    Then I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    When I click on the button "Next"
    And  I should see element with data-id "I will buy outright"
    And I should see element with data-id "I will buy on finance"
    When I click on the button "Next"
    And I wait "1" seconds
    And I click on the button "Pay with card"


  @reserve_step1
  Scenario: Elements on Reservation page by default on Step 1
    Given I am on a "/reservation" page
    And I wait "10" seconds
    Then I should see element with data-id "options"
#    What is your title? block
    And I should see element with data-id "Mr"
    And I should see element with data-id "Mrs"
    And I should see element with data-id "Dr"
    And I should see element with data-id "Ms"
    And I should see element with data-id "Miss"
#    Input fields
    And I should see element with data-id "label-title"
    And I should see text "What is your first name" on page
    And I should see text "First name as it is on your driving licence" on page
    And I should see text "What is your middle name" on page
    And I should see text "Middle name as it is on your driving licence" on page
    And I should see text "What is your last name" on page
    And I should see text "Last name as it is on your driving licence" on page
    And I should see text "Next" on page
    And I should see text "Privacy Notice" on page


  @reserve_step2
  Scenario: Elements on Reservation page by default on Step 2
    Given I am on a "/reservation" page
    Then I wait "10" seconds
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    When I click on the button "Next"
    And I wait "1" seconds
    Then I should see text "Back" on page
    And I should see text "20% Completed" on page
# input fields
    And I should see text "Email" on page
    And I should see text "Your email will be your username to login" on page
    And I should see text "Telephone number" on page
    And I should see text "Alternative telephone number" on page
    And I should see text "Next" on page
    And I should see text "Privacy Notice" on page

  @reserve_step3
  Scenario: Elements on Reservation page by default on Step 3 + purchase variants
    Given I am on a "/reservation" page
    Then I wait "10" seconds
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    When I click on the button "Next"
    And I wait "1" seconds
    And I fill in "emailAddress" with "jaoe@bgs.com"
    And I fill in "telephoneNumber" with "0723456789"
    And I fill in "altertnativePhone" with "0723456780"
    When I click on the button "Next"
    And I wait "1" seconds
    Then I should see text "Back" on page
    And I should see text "40% Completed" on page
# input fields
    And I should see text "Address" on page
    And I should see text "Enter address manually" on page
    When I click on element with data-id "enter-address-manually"
    And I should see text "Postcode" on page
    And I should see text "House name" on page
    And I should see text "House number" on page
    And I should see text "Street" on page
    And I should see text "District" on page
    And I should see text "Town" on page
    And I should see text "County" on page
    And I should see text "Next" on page
    And I should see text "Privacy Notice" on page
# purchase options
    When I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    And I click on the button "Next"
    Then I should see text "How do you intend to purchase your car?" on page
    Then I should see text "Back" on page
    And I should see text "60% Completed" on page
    And  I should see element with data-id "I will buy outright"
    And I should see element with data-id "I will buy on finance"
    And I should see text "Privacy Notice" on page
#    Payment options page
    When I click on the button "Next"
    Then I should see text "Back" on page
    And I should see text "80% Completed" on page
    And I should see text "Pay with card" on page
    And I should see text "Privacy Notice" on page
