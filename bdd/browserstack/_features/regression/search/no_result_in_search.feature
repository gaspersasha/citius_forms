Feature: No results in search
  In order to understand what to do next if my search yields no results
  As a User
  I want to be able to easily see how to adjust my search to yield better results

  @regression @search
    Scenario: Display filters when there are no results in search
    Given I am on a "/cars?f[0]=doors:2&f[1]=doors:4&f[2]=doors:5&f[3]=keywords:noresults&f[4]=mileage:%5B*%20TO%20100%5D&f[5]=vehicle_type:car" page
    And I wait a maximum of "5000" ms
    And I should wait "5000" ms for element with class "search_results search_results--no_results"
    Then I should see element by xpath "//p[text()='There are no cars available that match your search criteria - please try adjusting your search preferences']"
    And I should see element with a classname "search_results--no_results--inner"
#    filters in "search_filters" filters
    And I should see element by xpath "//li[text()='noresults']"
    And I should see element by xpath "//li[text()='2 door']"
    And I should see element by xpath "//li[text()='4 door']"
    And I should see element by xpath "//li[text()='5 door']"
    And I should see element by xpath "//li[text()='Any to 100 miles']"
#    filters in ""search_results--no_results--inner" block
    And I should see "noresults" in the element with xpath "(//div[@class='search_filters_selected']//li)[9]"
    And I should see "2 door" in the element with xpath "(//li[text()='2 door'])[2]"
    And I should see "4 door" in the element with xpath "(//li[text()='4 door'])[2]"
    And I should see "5 door" in the element with xpath "(//li[text()='5 door'])[2]"
    And I should see "Any to 100 miles" in the element with xpath "(//li[text()='Any to 100 miles'])[2]"
    And I should not see a element with class "results_total"
    When I click on the element with class "link-cancel"
    And I should wait "5000" ms for element with class "result_list"
    Then I should not see a element with class "search_results--no-results-filters"

  @regression @search
    Scenario: Check "Clear Search" button appears
    Given I am on a "/ford" page
    And I should wait "5000" ms for element with class "search_results"
    Then I should see element form with a classname "clear_search_button"

