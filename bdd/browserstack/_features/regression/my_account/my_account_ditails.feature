@my_account @ma_details_page
Feature: My Account Detail page
  In order to be able check or edit my personal data
  As a User
  I would like to have MA Detail page

  Scenario: Check the correct blocks are available when in My Details page.
    Given I am on a "account" page
    And I should wait "5000" ms for element with class "link--button-forward"
    And I click on the button with class "link--button-forward"
    And I should wait "5000" ms for element with class "modal-container--react modal--auth"
    And I fill in "email" with "bdd_testing@dennis.co.uk"
    And I fill in "password" with "Test123@*"
    When I click on the button with class "authentication-typo authentication-submit"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h1[text()='My Account']"
    When I am on a "account/details" page
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//h1[@class='page-title title']"
#    Then I should see "Edit your personal details" in the element with xpath "//h1[@class='page-title title']"
    And I should see element with xpath "//p[text()='These details control how you sign-in to your buycar.co.uk account. Your email address is the address we will use to send any email correspondence to, whether we are responding to your question or sending you an update on your order.']"
#    1. Your sign in details
    And I should see element with xpath "//h4[text()='1. Your sign in details']"
    And I should see element with a classname "form-input form-profile-information__email"
    And I should see element with a classname "form-input form-profile-information__emailConfirm"
    And I should see element with xpath "//p[text()='If you wish to change your password enter the new one here, otherwise leave it blank to keep your current password.']"
    And I should see element with a classname "form-input form-profile-information__password"
    And I should see element with a classname "form-input form-profile-information__confirmPassword"
#    2. Your profile information
    And I should see element with xpath "//h4[text()='2. Your profile information']"
    And I should see element with a classname "form-input form-profile-information__title"
    And I should see element with a classname "form-input form-profile-information__first-name"
    And I should see element with a classname "form-input form-profile-information__middle-name"
    And I should see element with a classname "form-input form-profile-information__last-name"
    And I should see element with a classname "form-input form-input-relative form-profile-information__date-of-birth"
    And I should see element with a classname "form-input form-profile-information__phone-number"
    And I should see element with a classname "form-input form-profile-information__alternative-phone"
    And I should see element with a classname "form-input form-profile-information__post-code"
    And I should see element with a classname "form-input form-profile-information__house-name"
    And I should see element with a classname "form-input form-profile-information__house-number"
    And I should see element with a classname "form-input form-profile-information__street"
    And I should see element with a classname "form-input form-profile-information__district"
    And I should see element with a classname "form-input form-profile-information__town"
    And I should see element with a classname "form-input form-profile-information__county"
    And I should see element with a classname "form-input form-profile-information__company"
    And I should see element with a classname "form-input form-profile-information__marital-status"
    And I should see element with a classname "form-input form-input-half form-profile-information__dependants"
    And I should see element with a classname "form-input form-input-half form-profile-information__driving-license"
    And I should see element with a classname "form-input form-profile-information__passport"
    And I should see element with xpath "//div[text()='If you wish to read our terms and conditions ']"
    And I should see element with xpath "//div[text()='If you wish to read our privacy policy ']"
#   3. Unsubscribe
    And I should see element with xpath "//h4[text()='3. Unsubscribe']"
    And I should see element with a classname "form-input form-profile-information__subscribed"
    And I see selected checkbox with id "mail_subscriber"
    And I should see element with a classname "form-input-submit"




    


