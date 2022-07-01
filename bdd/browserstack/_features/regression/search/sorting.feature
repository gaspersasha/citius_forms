@sorting @regression @search @search_filter
Feature: Search sorting
  In order to order in-stock results
  As a user of the site
  I would like a Sort By filter and have no out-of-stock cars visible

  Scenario: Check sort by filters are correct
    Given I am on a "/cars" page
    And I should wait "5000" ms for element with class "results_filter"
    Then I should see "Recommended" in the "results_filter" element
    And I should see "Price (Lowest)" in the "results_filter" element
    And I should see "Price (Highest)" in the "results_filter" element
    And I should see "Monthly Price (Lowest)" in the "results_filter" element
    And I should see "Monthly Price (Highest)" in the "results_filter" element
    And I should see "Age (Newest first)" in the "results_filter" element
    And I should see "Mileage" in the "results_filter" element

  Scenario Outline: Check that clicking on the filters applies the correct params to the page
    Given I am on a "/cars" page
    And I wait a maximum of "5000" ms
    When I click on the element with xpath "<option>"
    And I wait a maximum of "5000" ms
    Then I should be on "cars<params>"

    Examples:
      | option                                               | params                                           |
      | //option[contains(text(),'Price (Lowest)')]          | ?f[0]=vehicle_type:car&sortby=price&order=asc    |
      | //option[contains(text(),'Price (Highest)')]         | ?f[0]=vehicle_type:car&sortby=price&order=desc   |
      | //option[contains(text(),'Monthly Price (Lowest)')]  | ?f[0]=vehicle_type:car&sortby=monthly&order=asc  |
      | //option[contains(text(),'Monthly Price (Highest)')] | ?f[0]=vehicle_type:car&sortby=monthly&order=desc |
      | //option[contains(text(),'Age (Newest first)')]      | ?f[0]=vehicle_type:car&sortby=age&order=desc     |
      | //option[contains(text(),'Mileage')]                 | ?f[0]=vehicle_type:car&sortby=mileage&order=asc  |



