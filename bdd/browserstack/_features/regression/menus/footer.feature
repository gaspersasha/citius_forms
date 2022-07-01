# TODO Daria
Feature: Footer
  As a user I should be able to see all footer blocks & use footer menu list

  @smoke @footer
  Scenario: Check footer navigation blocks
    Given I am on a homepage
    Then I should wait "5000" ms for element with id "footer"
    And I should see element with id "footer"
    And I should see element with id "block-site-blocks-site-logo-link"
    And I should see element with id "block-menu-bac-footer"
    And I should see element with id "block-menu-menu-footer-social"
    And I should see element with id "block-site-blocks-site-contact-info"
    And I should see element with id "block-site-blocks-site-copyright"

   @footer @footer_links
    Scenario Outline: Check available footer nav. links
      Given I am on a homepage
      And I should wait "5000" ms for element with id "footer"
      Then I should see the link with name "<link>"

      Examples:
      |link                       |
      |Cars                       |
      |Used Cars                  |
      |New Cars in Stock          |
      |New Cars to Order          |
      |Vans                       |
      |How It Works               |
      |Finance Options            |
      |Warranty & Insurance       |
      |Part Exchange              |
      |Cancellations & Returns    |
      |FAQ                        |
      |About Us                   |
      |As seen in the press       |
      |Buyers' Guides             |
      |News                       |
      |Advice                     |
      |Complaints                 |
      |Initial Disclosure Document|
      |Work For Us                |
      |Dealer Sales               |
      |Privacy Policy             |
      |Cookie Policy              |
      |Sitemap                    |

  @smoke @footer @footer_info
  Scenario: Check that footer shows opening hours message
    Given  I am on a homepage
    And I should wait "5000" ms for element with id "footer"
    Then I should see element by xpath "//span[text()='Phone lines open Mon to Thurs, 9am-6pm; Fri & Sat 9am-5pm']"

  @smoke @footer @footer_logo
  Scenario: Check association logo is present only on homepage.
    Given I am on a homepage
    And I should wait "5000" ms for element with id "footer"
    Then I should see element with id "block-site-blocks-site-association"
    When I am on a "/cars" page
    Then I should not see a "block-site-blocks-site-association" element
