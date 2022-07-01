  @smoke @new_header @rect @new_top_menu @sub-menu
    Feature: New header sub-navigation
    As a user I want to able to see & use new header

  Scenario: New header contains all sub-nav element on desktop
#    currently implemented against not POC pages 'cause reservation page have no subnuv
    Given I am on a "cars" page
    When I wait a maximum of "5000" ms
    Then I should see element with id "__next"
    And I should see element with xpath "//span[text()='Used Cars']"
    And I should see element with xpath "//span[text()='New Cars in Stock']"
    And I should see element with xpath "//span[text()='Sell my car']"
    And I should not see a element with xpath "//span[text()='New Cars to Order']"

  Scenario: MA New header contains all sub-nav element on desktop
#    currently implemented against not POC pages 'cause reservation page have no subnuv
    Given I am on a "account/orders" page
    When I wait a maximum of "5000" ms
    Then I should see element with id "__next"
    And I should see element with xpath "//span[text()='My Cars']"
    And I should see element with xpath "//span[text()='My Details']"
    And I should see element with xpath "//span[text()='My Orders']"
    And I should see element with xpath "//span[text()='My Part-exchange']"
    And I should see element with xpath "//span[text()='Sign Out']"