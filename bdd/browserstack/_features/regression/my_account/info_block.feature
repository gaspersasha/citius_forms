@blocks @user_account @my_account
Feature: Info Block
  In order to get help from the BAC team
  As a User
  I can find information on how to contact BAC

  Scenario: Check that the "Contact" block will appear on user account page
    Given I am on a "account" page
    Then I should wait "5000" ms for element with class "info-box"
    And I should see element with xpath "//p[text()='If you have any questions about your saved cars or orders, please call us on:']"
    And I should see element with xpath "(//a[@href='tel:08000502333'])[2]"