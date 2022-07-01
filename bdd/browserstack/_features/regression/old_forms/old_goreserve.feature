Feature: Reservation form

  @smoke_regression @regression @old_reserve
  Scenario Outline: Elements on Reservation page by default
    Given I am on a "goreserve" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "<block>"

    Examples:
      | block                                     |
      | form-label-title                          |
      | form-preamble                             |
      | container-steps                           |
      | finance-form-header                       |
      | finance-form-header                       |
      | form-user-details-wrapper                 |
      | link--button-forward submit--finance-form |
      | finance-form-header collapsed             |
      | finance-form-header collapsed             |
      | form--privacy-notice info-box             |

  @smoke_regression @old_reserve @regression
  Scenario Outline: User form On Reservation page contains all input fields
    Given I am on a "goreserve" page
    When I wait a maximum of "5000" ms
    And I should see element with a classname "form--wrapper"
    Then I should see element with a classname "<input field>"

    Examples:
      | input field                                            |
      | form-input form-user-details__title                    |
      | form-input form-user-details__first-name               |
      | form-input form-user-details__middle-name              |
      | form-input form-user-details__last-name                |
      | form-input form-user-details__email                    |
      | form-input form-user-details__phone-number             |
      | form-input form-user-details__alternative-phone-number |

  @old_reserve @regression
  Scenario: Check the reserve form is populating values
    Given I am on a "goreserve" page
    Then I wait a maximum of "5000" ms
    And I should see element with a classname "form--wrapper"
    Then I fill in "firstName" with "Joe"
    Then I fill in "middleName" with "Middleton"
    Then I fill in "lastName" with "Bloggs"
    Then I fill in "email" with "joe@bloggs"
    And I should see a "//input[@name='firstName'][@value='Joe']" element
    And I should see a "//input[@name='middleName'][@value='Middleton']" element
    And I should see a "//input[@name='lastName'][@value='Bloggs']" element
    And I should see a "//input[@name='email'][@value='joe@bloggs']" element

  @smoke_regression @old_reserve @regression
  Scenario: Check that the header and footer are hidden
    Given I am on a "goreserve" page
    And the "breadcrumb" element should be invisible
    Then I should not see a "div#header.region-header" element
    Then I should not see a "div#footer.region-footer" element
    And I should see element with a classname "site-logo"

  @smoke_regression @old_reserve @preamble @regression
  Scenario: Check that the vehicledetails react component is rendered
    Given I am on a "/goreserve?prodAdvertId=1653689&productAdvertId=1653689&form_build_id=form-z20tCKJQ2nvWku0_Of9rkUrWyPBcVEemvoe9Nm_ScaQ&form_id=site_in_stock_button_form" page
    Then I wait a maximum of "5000" ms
    Then I should see "Don't miss out. Secure your car now with a £199.00 deposit that's fully refundable  until you commit to buy." in the "form-preamble-text" element

  @smoke_regression @regression @privacy_notice @old_reserve
  Scenario: Check privacy notice on reserve form
    Given I am on a "goreserve" page
    Then I should wait "5000" ms for element with id "block-system-main"
    And I should see element with a classname "form--privacy-notice info-box"
    And I should see "Privacy Notice" in the "form--privacy-notice info-box" element
    And I should see "We will use the details you have shared to manage your car purchase. You agree to the processing, storage,  sharing and use of this information for the purpose of managing your car purchase as described in our Privacy Policy." in the "form--privacy-notice info-box" element
    And I should see "We believe that based on this purchase you may be interested in other related products and services we  offer. As described in our Privacy Policy we will use  the information you have shared to send you communications about such products and services. If you do not  wish to receive these communications from us then please check here and you will be unsubscribed  from this activity." in the "form--privacy-notice info-box" element
    And I should see "'We' includes BuyaCar, AutoExpress, Carbuyer, evo and other Autovia Group brands as detailed here." in the "form--privacy-notice info-box" element
    And I should see the link with name "Privacy Policy"
    And I see unselected checkbox with classname "mailUnsubscriber"
    And I should see the link with name "detailed here"