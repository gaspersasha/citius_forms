    @smoke @new_header @rect @new_top_menu
    Feature: New header
    As a user I want to able to see & use new header


    Scenario: New header contains all element on desktop
      Given I am on a "/account/orders" page
      When I wait a maximum of "5000" ms
      Then I should see element with id "__next"
      And I should see element with xpath "//a[@href='/cars']"
      And I should see element with xpath "//a[@href='/vans']"
      And I should see element with xpath "//a[@href='/leasing']"
      And I should see element with xpath "//a[@href='/motoring-services']"
      And I should see element with xpath "//a[@href='/how-it-works']"
      And I should see element with xpath "//a[@href='tel:08000502333']"
      And I should see element with xpath "//span[text()='Login']"
      And I should see element with xpath "//span[text()='Sign Up']"

