Feature: Representative example
  In order to know example finance figures
  As a user of the site
  I would like to see a representative finance example box on the page

  @regression @search @representative_example
  Scenario Outline: Check that the search footer has the pager dropdown
    Given I am on a "<url>" page
    Then I should wait "5000" ms for element with class "search-rep-example"
    And I should see element by xpath "//h6[text()='Representative example when buying on PCP']"
    And I should see "<text>" in the "rep-example-message" element

    Examples:
      | url                                                                                                     | text                                                                            |
      | /cars                                                                                                   | Borrowing £9,500 over 48 months, zero deposit,                                  |
      | /ford/fiesta                                                                                            | on type PCP, an annual mileage of 8,000pa,                                      |
      | /cars?f[0]=doors:5&f[1]=edition:Focus%20Hatchback&f[2]=make:Ford&f[3]=model:Focus&f[4]=vehicle_type:car | with a Representative APR of 9.9%, the amount payable would be £191.54 a month, |
      | /vans                                                                                                   | an optional final payment of £2923.26, with a total cost of credit of £2,425.64 |
      | /vans/ford                                                                                              | and a total amount payable of £11,925.64                                        |
      | /vans?f[0]=make:Volkswagen&f[1]=model:Transporter&f[2]=seats:5&f[3]=vehicle_type:van                    | (** based on a 2017 Ford Fiesta 1.0 TITANIUM X Hatchback)                       |