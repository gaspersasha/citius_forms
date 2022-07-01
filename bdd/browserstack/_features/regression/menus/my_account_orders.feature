@menus @my_account @my_orders
Feature: My Orders
  In order to navigate easily around the My Orders area
  As a User
  I would like there to be an easily accessible navigation

  Scenario: Link is available
    Given I am on a "account/orders" page
    Then I should see element with xpath "//h1[text()='View orders and invoices']"
