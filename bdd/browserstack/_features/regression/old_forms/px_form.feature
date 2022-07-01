Feature: PX
  In order to use part exchange for a  sell car
  I want to ensure the PX form works

 @regression @smoke_regression @px_form
  Scenario: User can reach PX page 
    Given I am on a homepage
    And I wait a maximum of "5000" ms
    And I should see the link with name "Cars"
    And I should click the link with name "Cars"
    And I should be on "cars"
    And I wait a maximum of "5000" ms
    And I should see the link with name "Sell my car"
    When I should click the link with name "Sell my car"
    Then I should be on "part-exchange"
    And I should see element form with a classname "partexchange-outer"

  @regression @px_form
  Scenario: PX form page blocks Step 1
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "breadcrumb-list"
    And I should see element by xpath "//h1[text()='Get a quote for your car']"
    And I should see element by xpath "//h5[text()='Registration']"
    And I should see element with a classname "autoconvert-input-group"
    And I should see element by xpath "//p[text()='By using this service, you agree that your vehicle registration details will be passed to a third party, in order to look up the vehicle details.']"
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"
    When I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//input[@value='LO68GBU']"

  @regression @px_form
  Scenario: PX form page blocks Step 2
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h1[text()='Get a quote for your car']"
    And I should see element by xpath "//h5[text()='Vehicle Details']"
    And I should see element with a classname "flex-table vehicle-stats"
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"

  @regression @px_form
  Scenario: PX form page blocks Step 3
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "flex-table vehicle-stats"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"
    Then I should see element by xpath "//h5[text()='Mileage']"
    And I should see element by xpath "//div[@class='form-input-text-label ']//input[1]"
    And I fill in "mileage" with "27026"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Details']"
    And I should see element with a classname "form-input form-user-details__title"
    And I should see element with a classname "form-input form-user-details__first-name"
    And I should see element with a classname "form-input form-user-details__middle-name"
    And I should see element with a classname "form-input form-user-details__last-name"
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"

  @regression @px_form
  Scenario: PX form page blocks Step 4
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "flex-table vehicle-stats"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='Mileage']"
    And I fill in "mileage" with "27026"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Details']"
    And I fill in "firstName" with "Joe"
    And I fill in "middleName" with "Middleton"
    And I fill in "lastName" with "Bloggs"
    And I should see a "//input[@name='firstName'][@value='Joe']" element
    And I should see a "//input[@name='middleName'][@value='Middleton']" element
    And I should see a "//input[@name='lastName'][@value='Bloggs']" element
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Contact']"
    And I should see element with a classname "form-input form-user-details__post-code"
    And I should see element with a classname "form-input form-user-details__email"
    And I should see element with a classname "form-input form-user-details__phone-number"
    And I should see element with a classname "form-input form-user-details__alternative-phone-number"
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"

  @regression @px_form
  Scenario: PX form page blocks Step 4
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "flex-table vehicle-stats"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='Mileage']"
    And I fill in "mileage" with "27026"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Details']"
    And I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Contact']"
    And I fill in "postCode" with "LA16 7AF"
    And I fill in "email" with "joe@blogsgs.com"
    And I fill in "telephone" with "0123456789"
    And I fill in "alternativePhone" with "123456700"
    And I should see a "//input[@name='postCode'][@value='LA16 7AF']" element
    And I should see a "//input[@name='email'][@value='joe@blogsgs.com']" element
    And I should see a "//input[@name='telephone'][@value='0123456789']" element
    And I should see a "//input[@name='alternativePhone'][@value='123456700']" element
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"

  @regression @px_form
  Scenario: PX form page blocks Step 5
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "flex-table vehicle-stats"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='Mileage']"
    And I fill in "mileage" with "27026"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Details']"
    And I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Contact']"
    And I fill in "postCode" with "LA167AF"
    And I fill in "email" with "joe@blogsgs.com"
    And I fill in "telephone" with "0123456789"
    When I click on the element with class "link--button-forward submit--finance-form"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "agree-valutaion-step"
    And I should see element by xpath "//h5[text()='You will receive your valuation from']"
    And I should see element with a classname "valuation_benefits"
    And I should see element with a classname "valuation_privacy"
    And I see unselected checkbox with classname "checkbox-inputs-wrapper"
    And I should see element with a classname "link--button-forward"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"

  @regression @px_form @smoke_regression @e2e
  Scenario: PX form page blocks Step 6 + full user fow
    Given I am on a "part-exchange" page
    And I wait a maximum of "5000" ms
    And I fill in "plate" with "LO68GBU"
    And I wait a maximum of "5000" ms
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "flex-table vehicle-stats"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='Mileage']"
    And I fill in "mileage" with "27026"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Details']"
    And I fill in "firstName" with "Joe"
    And I fill in "lastName" with "Bloggs"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//h5[text()='User Contact']"
    And I fill in "postCode" with "LA167AF"
    And I fill in "email" with "joe@blogsgs.com"
    And I fill in "telephone" with "0123456789"
    When I click on the element with class "link--button-forward submit--finance-form"
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "agree-valutaion-step"
    And I select radiobutton with xpath "(//input[@type='checkbox'])[2]"
    When I click on the element with class "link--button-forward"
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "//p[text()='Your estimated valuation']"
    And I see selected checkbox with classname "link--button-forward partex__submit-btn"
    And I should see element by xpath "//div[@class='form--privacy-notice info-box']"
    And I click on the element with class "link--button-forward partex__submit-btn"
    And I wait a maximum of "5000" ms
    And I should be on "account"





