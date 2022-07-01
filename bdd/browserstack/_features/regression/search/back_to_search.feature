Feature: Back to search
  In order to feel like I've not lost my search
  As a User
  I would like there to be a "back to search" button

  @regression @search @how_it_works @back_to_search
  Scenario: Check that the back to search link is correct
  Given I am on a "cars?f[0]=make:Ford&f[1]=model:Focus&f[2]=type:new&f[3]=vehicle_type:car" page
  Then I should wait "5000" ms for element with class "search_result"
  When I am on a "how-it-works" page
  And I should see element by xpath "//h1[text()='How BuyaCar works']"
  And I should see the link with name "Back to Search Results"
  Then I click on the element with xpath "//a[@title='Back to Search Results']"
  Then I should be on "cars?f[0]=make:Ford&f[1]=model:Focus&f[2]=type:new&f[3]=vehicle_type:car"
