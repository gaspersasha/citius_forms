Feature:Product page back button
  In order to better be able to easily navigate back to my search results
  As a User
  I would like to see a way to easily navigate back to my search results

  @regression @product_page_back_button
  Scenario: Product page back button on Desktop
    Given I am on a "/cars/new-cars" page
    And I should wait "5000" ms for element with class "search_result"
    And I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "link--arrow-back"
    When I click on the element with xpath "//a[@title='Back to Search Results']"
    And I should wait "5000" ms for element with class "search_result"
    Then I should be on "cars/new-cars?order=asc&sortby=mileage"

  @regression @product_page_back_button
  Scenario: Product page back button on Desktop
    Given I am on a "/cars?f[0]=make:Ford&f[1]=model:Focus&f[2]=type:new&f[3]=vehicle_type:car" page
    And I should wait "5000" ms for element with class "search_result"
    And I click on the element with xpath "//a[@class='link--button-forward']"
    And I should wait "5000" ms for element with class "link--arrow-back"
    When I click on the element with xpath "//a[@title='Back to Search Results']"
    And I should wait "5000" ms for element with class "search_result"
    Then I should be on "cars?f[0]=make:Ford&f[1]=model:Focus&f[2]=type:new&f[3]=vehicle_type:car"
    

