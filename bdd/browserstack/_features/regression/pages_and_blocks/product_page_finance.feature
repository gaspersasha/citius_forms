Feature:Product page pricing & calculator
  In order to have visibility of coast
  As a User
  I would like to see all necessary element in pricing section & calculator

  @regression @product_page @product_page_finance
  Scenario: Product page blocks - Per month Tab
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    When I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    Then I should see element with a classname "tab-pricing-section__label active"
    And I should see element with a classname "tab-pricing-section__label__header tab-credit"
    And I should see element with a classname "tab-pricing-section__label__footer"
    And I should see element with a classname "tab-pricing-section__pr-block price"
    And I should see element with a classname "tab-pricing-section__pr-block contribution"
    And I should see element with a classname "tab-pricing-section__pr-block apr"
    And I should see element with a classname "tab-pricing-section__pr-block mnth-payment"
    And I should see element with a classname "tab-pricing-section__label__header tab-credit"
    And I should see element with a classname "edit-amount"
    And I should see element with a classname "tab-pricing-section__btn__res-car"
    And I should see element with a classname "tab-pricing-section__btn__default save-car"
    And I should see element with a classname "tab-pricing-section__btn__default-text"

  @regression @product_page @product_page_finance
  Scenario: Product page blocks - Cash price Tab
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    And I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    When I click on the element with xpath "//div[@class='tab-pricing-section__label__header tab-cash']"
    Then I should see element with a classname "tab-pricing-section__pr-block delivery"
    And I should see element with a classname "tab-pricing-section__btn__apply-fin-btn res-car"
    And I should see element with a classname "tab-pricing-section__btn__default save-car"
    And I should see element with a classname "tab-pricing-section__btn__default-text"

  @smoke_regression @regression @product_page @reserve_form_button @old_reservation
  Scenario: Product page blocks - "Reserve this car" button
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    And I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    When I click on the element with xpath "//div[@class='tab-pricing-section__label__header tab-cash']"
    Then I should see element with a classname "tab-pricing-section__pr-block delivery"
    When I click on the button with id "tabPrSectionCarReserve"
    Then I should see element with xpath "//h1[text()='Reserve your car online at BuyaCar.co.uk']"

  @smoke_regression @regression @product_page @finance_form_button @old_finance
  Scenario: Product page blocks - Cash price Tab
    Given I am on a "/ford/focus" page
    And I should wait "5000" ms for element with class "search_result"
    And I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "tab-pricing-section"
    When I click on the button with id "tabPrSectionApplyForFin"
    Then I should see element with xpath "//h2[text()='You are about to start your finance application']"

  @finance_type @javascript @chrome
  Scenario Outline: Finance type
    Given I am on a <url> page
    Then I should wait "5000" ms for element with class "search_result"
    When I click on the element with xpath "//a[@class='link--button-forward']"
    Then I should wait "5000" ms for element with class "tabs-list"
    And I should see <value> in the element with xpath "//div[@class='tab-pricing-section__label__footer']"

    Examples:
    |url                          |value  |
    |"/honda/jazz/jazz-hatchback/"|"per month (PCP)"|
    |"/vans"                      |"per month (HP) exc. VAT" |