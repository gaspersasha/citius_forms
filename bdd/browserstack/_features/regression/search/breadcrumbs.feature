@breadcrumbs
Feature: Search Results Breadcrumb
  In order to make the breadcrumbs display correctly
  As Head of Audience Dev
  I want them to reflect the folders in the URL

  @regression @search @breadcrumbs @breadcrumb
  Scenario Outline: Check the breadcrumb on search results
    Given I am on a "<url>" page
    And I wait a maximum of "5000" ms
    Then I should see element by xpath "<breadcrumb>"

    Examples:
      | url                          | breadcrumb                                 |
      | ford                         | //a[@href='/ford']                         |
      | ford/fiesta                  | //a[@href='/ford/fiesta']                  |
      | ford/fiesta/fiesta-hatchback | //a[@href='/ford/fiesta/fiesta-hatchback'] |
      | bmw/2-series                 | //a[@href='/bmw/2-series']                 |

