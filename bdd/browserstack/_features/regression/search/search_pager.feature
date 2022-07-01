Feature: Search results pager 
  In order to see more vehicle adverts per page
  As a User
  I would like to have the option to change the amount of results I can see on one page

  @regression @search
  Scenario: Check that the search footer has the pager dropdown
    Given I am on a "/cars" page
    Then I should wait "5000" ms for element with class "results_filter"
    And I wait a maximum of "5000" ms
    And I should see element with a classname "results-limit"
    And I should see "20" in the "results-limit" element
    And I should see "50" in the "results-limit" element
    And I should see "100" in the "results-limit" element
    And I should see "20" elements with class "search_result"
    And I should see "20" in the "results-limit" element

  @regression @search
  Scenario: Check that the search footer has the pager dropdown
    Given I am on a "cars?offset=1&limit=50" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "search_result"
    And I should see "50" elements with class "search_result"
    And I should see "50" in the "results-limit" element
    Given I am on a "/cars?offset=1&limit=100" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "search_result"
    And I should see "100" elements with class "search_result"
    And I should see "100" in the "results-limit" element
    Given I am on a "/cars?offset=1&limit=200" page
    And I wait a maximum of "5000" ms
    Then I should see element with a classname "search_result"
    And I should see "20" elements with class "search_result"
    And I should see "20" in the "results-limit" element

 @regression @search
 Scenario: Check that HeroImage is shown on the cheap cars page
   Given I am on a "/cars/cheap-cars/cars-under-200-per-month" page
   And I should wait "5000" ms for element with class "results_filter"
   Then I should see "Find your perfect car" in the "hero-image-wrapper" element
