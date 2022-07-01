Feature: Vehicle pretend sold
  In order to be kept up to date
  As a user of the site
  If I visit a product page that does not exist. I am redirected.

  @regression @search @pretend_sold
  Scenario: Check redirect of vehicle url which no longer exists.
    Given I am on a "/ford/fiesta/fiesta-hatchback/xxx-xxx-xxx/deal-111" page
    Then I should be on "ford/fiesta/fiesta-hatchback?sold=1"
    Given I am on a "/vans/volkswagen/transporter/transporter-t28-swb/xxx-xxx-xxx/deal-111" page
    Then I should be on "vans/volkswagen/transporter/transporter-t28-swb?sold=1"
