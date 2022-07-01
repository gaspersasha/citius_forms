  @reservation
  Feature: Reservation form

  @smoke @e2e
  Scenario: Whole user journey from step 1 to the action buttons
    Given I am on a "/reservation?productAdvertId=3241202" page
    And I should wait "5000" ms for element with class "form-user-details__first-name"
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "8000" ms
    And I fill in the "emailAddress" with "joe@bgs.com"
    And I fill in "telephoneNumber" with "0723456789"
    And I fill in "altertnativePhone" with "0723456780"
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "3000" ms
#    for some reason in autotest need to click on action button twice before test goes to address block => to investigate
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "3000" ms
    And I should see element with xpath "//div[@class='form-address form-section-wrapper']//div"
    When I click on the button with class "loqate-address-link__text"
    Then I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    When I click on the button with class "form-submit align-center"
    And I should see element with a classname "form-input"
    And I should see element with xpath "//div[text()='How do you intend to purchase your car?']"
    When I click on the button with class "form-submit"
    And I wait a maximum of "5000" ms
    And I should see element with id "stripeCall"
    And I should see element with id "ReservePaypalSubmit"

  @reserve_step1
  Scenario: Elements on Reservation page by default on Step 1
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "form-input form-user-details__title"
    And I should see element with a classname "form-input form-user-details__first-name"
    And I should see element with a classname "form-input form-user-details__middle-name"
    And I should see element with a classname "form-input form-user-details__last-name"
    And I should see element with a classname "form-submit align-center"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @reserve_step2
  Scenario: Elements on Reservation page by default on Step 2
    Given I am on a "reservation" page
    And I wait a maximum of "8000" ms
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    And I should see a "//input[@name='firstName'][@value='Joe']" element
    And I should see a "//input[@name='middleName'][@value='Middleton']" element
    And I should see a "//input[@name='lastName'][@value='Bloggs']" element
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//button[text()='Back']"
    And I should see element with xpath "//span[text()='20% Completed']"
    And I should see element with a classname "form-input form-user-details__email"
    And I should see element with a classname "form-input form-user-details__phone-number"
    And I should see element with a classname "form-input form-user-details__alternative-phone-number"
    And I should see element with a classname "form-submit align-center"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @reserve_step3
  Scenario: Elements on Reservation page by default on Step 3 + purchase variants
    Given I am on a "reservation" page
    And I should wait "5000" ms for element with class "form-user-details__first-name"
    Then I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    And I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "form-input form-user-details__email"
    And I fill in the "emailAddress" with "joe@bgs.com"
    And I fill in "telephoneNumber" with "0723456789"
    And I click on the button with class "form-submit align-center"
    And I wait a maximum of "8000" ms
#    for some reason in autotest need to click on action button twice before test goes to address block => to investigate
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "3000" ms
    And I should see element with xpath "//div[@class='form-address form-section-wrapper']//div"
    Then I should see element with xpath "//span[text()='40% Completed']"
    And I should see element with xpath "//input[@placeholder='Start typing your address to search']"
    And I should see element with xpath "//span[text()='Address']"
    And I should see element with a classname "form-address form-section-wrapper"
    And I should see element with a classname "autoconvert-input-group"
    And I should see element with a classname "label-sub-title"
    And I should see element with a classname "loqate-address-link__text"
    And I should see element with a classname "form-submit align-center"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

    When I click on the button with class "loqate-address-link__text"
    Then I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    When I click on the button with class "form-submit align-center"
    And I should see element with a classname "form-input"
    And I should see element with xpath "//div[text()='How do you intend to purchase your car?']"
    And I should see element with xpath "//div[text()='Tell us if you’ll be buying your car outright or via finance after you pay your deposit']"
    And I should see element with xpath "//span[text()='I will buy outright']/following::input"
    And I should see element with xpath "//span[text()='I will buy on finance']/following::input"
    When I select element with xpath "//span[text()='I will buy on finance']/following::input"
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//div[text()='To reserve this car, please pay your fully refundable deposit via one of the following payment methods.']"
    When I click on the element with xpath "//button[text()='Back']"
    And I wait a maximum of "3000" ms
    Then I select element with xpath "//span[text()='I will buy on finance']/following::input"

  @smoke @privacy_notice @form_privacy_notice
  Scenario: Check privacy notice on reserve form
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    Then I should see "Privacy Notice" in the element with xpath "//h3[text()='Privacy Notice']"
    And I should see element with xpath "//div[text()='We will use the details you have shared to manage your car purchase. You agree to the processing, storage,  sharing and use of this information for the purpose of managing your car purchase as described in our ']"
    And I should see element with xpath "//div[text()='We believe that based on this purchase you may be interested in other related products and services we  offer. As described in our']"
    And I should see element with xpath "//a[contains(text(),'detailed here')]"
    And I should see the link with name "Privacy Policy"
    And I see unselected checkbox with name "mailUnsubscriber"
    And I should see the link with name "detailed here"

  @service_message @error_message
  Scenario: Service message & notice
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "1000" ms
    Then I should see element with a classname "error-input-border"
    And I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    And I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    When I click on the button with class "form-submit align-center"
    Then I should see element with a classname "error-input-border"
    And I should see element with xpath "//p[text()='*The email address you entered is not valid, please try again.']"