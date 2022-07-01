    @user_journey @new_reserve @insulated @login_popup
    Feature: User Journey
        In order to purchase a car
        As a user
        I want to be able to login via modal from reserve form

    @smoke
    Scenario: Modal should appear for existing email
        Given I am on a "reservation" page
        Then I should wait "9000" ms for element with class "form-input form-user-details__title"
        And I select radiobutton with xpath "//label[@for='Dr']//input[1]"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the element with xpath "//button[text()='Next']"
        And I fill in "emailAddress" with existed user data "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephoneNumber" with "0123456789"
        And I should wait "9000" ms for element with id "sign_in_form"
        Then I should see element by xpath "//h4[text()='Welcome back']"
        When I fill in element with id "user_password" value "Test123@*"
        And I click on the element with xpath "//button[text()='Login']"
        Then I wait a maximum of "5000" ms
        And I should be on "/reservation"
        And I wait a maximum of "5000" ms
        And I should see element by xpath "//input[@value='bdd_testing@dennis.co.uk']"

    Scenario: Modal should NOT appear for non existent email
        Given I am on a "reservation" page
        Then I should wait "9000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the element with xpath "//button[text()='Next']"
        And I wait a maximum of "5000" ms
        And I fill in "emailAddress" with "bdd_NOT_REGISTERED_testing@dennis.co.uk"
        And I fill in "telephoneNumber" with "0123456789"
        Then I should not see a "recognised__welcome-title" element

    Scenario: Modal is closed via "Use an alternative email" button and email should be empty
        Given I am on a "reservation" page
        And I wait a maximum of "5000" ms
        Then I should wait "10000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the element with xpath "//button[text()='Next']"
        And I fill in "emailAddress" with existed user data "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephoneNumber" with "0123456789"
        And I should wait "9000" ms for element with id "sign_in_form"
        When I should see element with xpath "//button[text()='Use an alternative email']"
        Then I should not see a element with class "recognised__welcome-title"
        And I should see element by xpath "//input[@value='']"

    @service_message
    Scenario: User login on second step service messages
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the element with xpath "//button[text()='Next']"
        And I fill in "emailAddress" with existed user data "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephoneNumber" with "0123456789"
        And I should wait "9000" ms for element with id "sign_in_form"
        And I should see element by xpath "//input[@value='bdd_testing@dennis.co.uk']"
        And I should see element by xpath "//input[@value='']"
        When I click on the element with xpath "//button[text()='Login']"
        And I wait a maximum of "5000" ms
        Then I should see element with xpath "//p[text()='Incorrect values']"
        And I fill in element with id "user_password" value "InvalidPWD"
        When I click on the element with xpath "//button[text()='Login']"
        And I wait a maximum of "5000" ms
        Then I should see element by xpath "//p[text()='Account email or password is not recognised']"