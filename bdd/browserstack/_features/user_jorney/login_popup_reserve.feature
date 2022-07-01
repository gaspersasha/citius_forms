Feature: User Journey
    In order to purchase a car
    As a user
    I want to be able to login via modal from reserve form

    @smoke @user_journey @new_reserve @insulated @login_popup
    Scenario: Modal should appear for existing email
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I select radiobutton with xpath "//label[@for='Dr']//input[1]"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I fill in "email" with "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephone" with "0123456789"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "recognised__welcome-title"
        Then I should see element by xpath "//h4[text()='Welcome back']"
        And I should see element by xpath "//p[@class='modal-inner__forgot-link']//a[1]"

    @user_journey @new_reserve @insulated @login_popup
    Scenario: Modal should NOT appear for nonexisting email
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I wait a maximum of "5000" ms
        And I fill in "email" with "bdd_NOT_REGISTERED_testing@dennis.co.uk"
        And I fill in "telephone" with "0123456789"
        Then I should not see a "recognised__welcome-title" element

    @user_journey @new_reserve @insulated @login_popup
    Scenario: Modal is closed via "Use an alternative email" button and email should be empty
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I fill in "email" with "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephone" with "0123456789"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "recognised__welcome-title"
        When I click on the button with class "modal-inner__bottom-close"
        Then I should not see a element with class "recognised__welcome-title"
        And I should see element by xpath "//input[@value='']"

    @user_journey @new_reserve @insulated @login_popup
    Scenario: Modal is closed via clicking outside of it (overlay)
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I fill in "email" with "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephone" with "0123456789"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "recognised__welcome-title"
        When I click on the element with class "reservation_form__3pau1"
        Then I should not see a "recognised__welcome-title" element

    @user_journey @new_reserve @insulated @login_popup @service_message
    Scenario: User login on second step service messages
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I fill in "email" with "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephone" with "0123456789"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "recognised__welcome-title"
        And I should see element by xpath "//input[@value='bdd_testing@dennis.co.uk']"
        And I should see element by xpath "//input[@value='']"
        When I click on the element with class "button-forward"
        And I wait a maximum of "5000" ms
        Then I should see element with a classname "popup_error-message"
        And I should see element by xpath "//p[text()='Incorrect values']"
        And I fill in element with id "user_password" value "InvalidPWD"
        When I click on the element with class "button-forward"
        And I wait a maximum of "5000" ms
        Then I should see element by xpath "//p[text()='Account email or password is not recognised']"

    @user_journey @new_reserve @insulated @login_popup
    Scenario: User login on second step
        Given I am on a "reservation" page
        Then I should wait "5000" ms for element with class "form-input form-user-details__title"
        And I fill in "firstName" with "firstName"
        And I fill in "lastName" with "lastName"
        And I fill in "middleName" with "middleName"
        When I click on the button with class "button-forward"
        And I fill in "email" with "bdd_testing@dennis.co.uk"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "label-sub-title"
        And I wait a maximum of "5000" ms
        And I fill in "telephone" with "0123456789"
        And I wait a maximum of "5000" ms
        And I should see element with a classname "recognised__welcome-title"
        And I should see element by xpath "//input[@value='bdd_testing@dennis.co.uk']"
        And I should see element by xpath "//input[@value='']"
        When I fill in element with id "user_password" value "Test123@*"
        And I click on the element with class "button-forward"
        Then I wait a maximum of "5000" ms
        And I should be on "reservation"
        And I wait a maximum of "5000" ms
        And I should see element by xpath "//input[@value='NOTfirstName']"