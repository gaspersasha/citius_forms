Feature: Search results pager
  In order to provide proper information about site navigation
  As a User
  I would like the search results to contain the right vehicle type information

  @javascript @search
  Scenario Outline: Check that the search footer has the pager dropdown
    Given I am on a "<url>" page
    And I should wait "5000" ms for element with class "search_results"
    Then I should see "<title>" in the element with xpath "//h1[@class='page-title title']"

    Examples:
      | url                                                                                                     | title                                |
      | /cars                                                                                                   | Cars for sale                        |
      | /ford/fiesta                                                                                            | Ford Fiesta cars for sale            |
      | /cars?f[0]=doors:5&f[1]=edition:Focus%20Hatchback&f[2]=make:Ford&f[3]=model:Focus&f[4]=vehicle_type:car | Ford Focus Hatchback Cars for sale   |
      | /vans                                                                                                   | Vans for sale                        |
      | /vans/ford                                                                                              | Ford vans for sale                   |
      | /vans?f[0]=make:Volkswagen&f[1]=model:Transporter&f[2]=seats:5&f[3]=vehicle_type:van                    | Volkswagen Transporter Vans for sale |

      