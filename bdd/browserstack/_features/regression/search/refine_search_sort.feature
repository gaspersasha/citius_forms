Feature: Refine Search and Sort change
  In order to filter my search and find the car I am looking for
  As a User
  I want to be able to easily find how to refine and re-order my search results

    @regression @search
    Scenario:Refine Search and Sort
      Given I am on a "/cars" page
      #checks for sort dropdown
      And I should wait "5000" ms for element with class "results_filter"
      Then I should see element form with a classname "search_open_filters"
      And I should see element form with a classname "results_total"
      And I should see element form with a classname "results_filter"
      #checking sort filter options
      Then I should see element with id "sort"
      And I should see "Recommended" in the "results_filter" element
      And I should see "Price (Lowest)" in the "results_filter" element
      And I should see "Price (Highest)" in the "results_filter" element
      And I should see "Monthly Price (Lowest)" in the "results_filter" element
      And I should see "Monthly Price (Highest)" in the "results_filter" element
      And I should see "Age (Newest first)" in the "results_filter" element
      And I should see "Mileage" in the "results_filter" element



