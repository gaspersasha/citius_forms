  @my_account @my-cars
  Feature: My Cars page
    As a user I want to able to see & use new My Cars page in MA

    Scenario: My Cars page on MA general items
  #    Login
      Given I am on a "/account" page
      And I should wait "5000" ms for element with class "link--button-forward"
      When I click on the button with class "link--button-forward"
      And I should wait "5000" ms for element with class "modal-container--react modal--auth"
      Then I should see element with xpath "//span[text()='Enter your email address and password']"
      And I fill in "email" with existed user data "BDD_signup_1234@example.com"
      And I fill in "password" with "Test123@*"
      When I click on the button with class "authentication-typo authentication-submit"
      And I wait a maximum of "3000" ms
      Then I should see element with xpath "//span[text()='My Account']"
  #    My Cars general fields
      Given I am on a "/my-account" page
      And I wait a maximum of "8000" ms
      And I wait a maximum of "5000" ms
  #    Then I should see element with xpath "//nav[@class='breadcrumb item-list']"
      And I should see element with xpath "//h1[text()='My Cars']"
      And I should see element with xpath "//a[@href='/account/vehicle-status?quoteId=994198']//div[1]"
      And I should see element with xpath "//p[text()='Renault']"
      And I should see element with xpath "//p[text()='65kW Dynamique Nav 22kWh 5dr Auto']"
      And I should see element with xpath "//span[text()='£7,637']"
      And I should see element with xpath "//a[@data-id='CTA']"
      And I should not see a element with class "account-card__load-more"
      And I should see element with xpath "//p[text()='Still not found your perfect car?']"
      And I should not see a element with class "more-cars__link"
      And I should see element with xpath "//b[text()='Representative example when buying on PCP']"
      And I should see element with xpath "//p[text()='Borrowing £9,500 over 48 months, zero deposit, on type PCP, an annual mileage of 8,000pa, with a Representative APR of 9.9%, the amount payable would be £191.54 a month, an optional final payment of £2923.26, with a total cost of credit of £2,425.64 and a total amount payable of £11,925.64 (** based on a 2017 Ford Fiesta 1.0 TITANIUM X Hatchback)']"

    Scenario: My Cars for the new user
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

# My Cars page
      Given I am on a "/my-account" page
      And I wait a maximum of "8000" ms
      Then I should see element with xpath "//h1[text()='My Cars']"
      And I should see element with xpath "//p[text()='No saved cars']"
      And I should see element with xpath "//p[text()='Your car search starts here']"
      And I should see element with xpath "//li[text()='Search for a car']"
      And I should see element with xpath "//li[text()='Save your favorites']"
      And I should see element with xpath "//li[text()='Apply for finance or buy outright']"
      And I should see element with xpath "//a[@href='/cars']"

#    Comment due to hardcode on test1 with userLogin=true
#    Scenario: My Cars for not logged user
#      Given I am on a "/my-account" page
#      And I wait a maximum of "8000" ms
#      Then I should see element with xpath "//h2[text()='Please log in']"