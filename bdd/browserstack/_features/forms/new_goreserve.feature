Feature: Reservation form

  @smoke @new_reserve @e2e
    Scenario: Whole user journey from step 1 to the action buttons
    Given I am on a "reservation" page
    And I should wait "5000" ms for element with class "form-user-details__first-name"
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    And I fill in "email" with "joe@bgs.com"
    And I fill in "telephone" with "0123456789"
    And I click on the button with class "form-submit align-center"
    And I wait a maximum of "8000" ms
    And I should see element with xpath "//span[text()='Address']"
    When I click on the button with class "loqate-address-link__text"
    Then I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    And I click on the button with class "button-forward"
    And I should see element with a classname "payment_controls__22JOu"
    And I should see element with id "stripeCall"
    And I should see element with id "payPalCall"

  @new_reserve @poc @reserve_step1
  Scenario: Elements on Reservation page by default on Step 1
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "form-input form-user-details__title"
    And I should see element with a classname "form-input form-user-details__first-name"
    And I should see element with a classname "form-input form-user-details__middle-name"
    And I should see element with a classname "form-input form-user-details__last-name"
    And I should see element with a classname "button-forward"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @new_reserve @poc @reserve_step2
  Scenario: Elements on Reservation page by default on Step 2
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    And I should see a "//input[@name='firstName'][@value='Joe']" element
    And I should see a "//input[@name='middleName'][@value='Middleton']" element
    And I should see a "//input[@name='lastName'][@value='Bloggs']" element
    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    Then I should see element with xpath "//button[text()='Back']"
    And I should see element with xpath "//span[text()='25% Completed']"
    And I should see element with a classname "form-input form-user-details__email"
    And I should see element with a classname "form-input form-user-details__phone-number"
    And I should see element with a classname "form-input form-user-details__alternative-phone-number"
    And I should see element with a classname "form-submit align-center"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @new_reserve @poc @reserve_step3
  Scenario: Elements on Reservation page by default on Step 3
    Given I am on a "reservation" page
    And I should wait "5000" ms for element with class "form-user-details__first-name"
    Then I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    And I click on the button with class "button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "form-input form-user-details__email"
    And I fill in "email" with "joezz@bloggs.com"
    And I fill in "telephone" with "0123456789"
    And I click on the button with class "button-forward"
    And I wait a maximum of "8000" ms
    Then I should see element with xpath "//span[text()='50% Completed']"
    And I should see element with xpath "//input[@placeholder='Start typing your address to search']"
    And I should see element with xpath "//span[text()='Address']"
    And I should see element with a classname "form-address form-section-wrapper"
    And I should see element with a classname "autoconvert-input-group"
    And I should see element with a classname "label-sub-title"
    And I should see element with a classname "loqate-address-link__text"
    And I should see element with a classname "button-forward"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @new_reserve @poc @reserve_step4
  Scenario: Elements on Reservation page by default on Step 4 (address)
    Given I am on a "reservation" page
    And I should wait "5000" ms for element with class "form-user-details__first-name"
    Then I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    When I click on the button with class "button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "form-input form-user-details__email"
    And I fill in "email" with "jozz@qwerty.com"
    And I fill in "telephone" with "0123456789"
    When I click on the button with class "button-forward"
    And I wait a maximum of "9000" ms
    Then I should see element with xpath "//span[text()='Address']"

#    use address input field
#    And I fill in "loqateAddress" with "HX6 3BS"
#    And I click on the element with name "loqateAddress"
#    And I wait a maximum of "5000" ms
#    And I click on the element with class "postcode_listWrapper__1miKml"
#    And I click on the element with class "postcode_listItem__2v-u_ postcode_listItemCode__3b5sk"

#    Manual address filling
    When I click on the button with class "loqate-address-link__text"
    Then I fill in "postCode" with "HX6 3BS"
    And I fill in "street" with "test"
    And I fill in "town" with "test"
    And I click on the button with class "button-forward"

#    When I click on the button with class "form-submit align-center"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "align-corner"
    And I should see element with a classname "payment_controls__22JOu"
    And I should see element with id "stripeCall"
    And I should see element with id "payPalCall"
    And I should see element with xpath "//h3[text()='Privacy Notice']"

  @smoke @privacy_notice @new_reserve @form_privacy_notice
  Scenario: Check privacy notice on reserve form
    Given I am on a "reservation" page
    And I wait a maximum of "5000" ms
    Then I should see "Privacy Notice" in the element with xpath "//h3[text()='Privacy Notice']"
    And I should see element with xpath "//div[text()='We will use the details you have shared to manage your car purchase. You agree to the processing, storage,  sharing and use of this information for the purpose of managing your car purchase as described in our ']"
    And I should see element with xpath "//div[text()='We believe that based on this purchase you may be interested in other related products and services we  offer. As described in our']"
    And I should see element with xpath "//a[contains(text(),'detailed here')]"
    And I should see the link with name "Privacy Policy"
    And I see unselected checkbox with classname "mailUnsubscriber"
    And I should see the link with name "detailed here"

    @new_reserve @service_message @error_message
    Scenario: Service message & notice
      Given I am on a "reservation" page
      And I wait a maximum of "5000" ms
      When I click on the button with class "form-submit align-center"
      Then I should see element with xpath "(//div[@class='label_label__Btdpt error-input-label'])[1]"
      And I should see element with xpath "(//div[@class='label_label__Btdpt error-input-label'])[2]"
      And I fill in "firstName" with "Joe"
      And I fill in "lastName" with "Bloggs"
      And I click on the button with class "form-submit align-center"
      And I wait a maximum of "5000" ms
      When I click on the button with class "form-submit align-center"
      Then I should see element by xpath "(//div[@class='label_label__Btdpt error-input-label'])[1]"
      And I should see "*The email address you entered is not valid, please try again." in the "details_warning__wunW1" element









