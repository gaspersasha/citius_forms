Feature: Head & content menu
  User are able to see top menu, submenu and content menu

#   TEST1 Show only the top level links.
  @smoke @menu @top_menu @header @test3
  Scenario: Check the global main menu links
    Given I am on a homepage
    Then I should wait "5000" ms for element with id "header"
    And I should see element with a classname "menu"
    And I should see element with a classname "leaf split-right mobile-top"
    And I should see the link with name "Cars"
    And I should see the link with name "Vans"
    And I should see the link with name "How It Works"
    And I should see element by xpath "//span[text()='Leasing']"
    And I should see element by xpath "//span[text()='Motoring Services']"

#  TEST2
  @smoke @header @login
  Scenario Outline: Check for authentication buttons in a header for not logged user.
    Given I am on a homepage
    Then I should wait "5000" ms for element with id "header"
    And I should see element with a classname "authentication-buttonWrapper"
    And I should see element with a classname "<button>"

    Examples:
      | button                                                   |
      | authentication-button authentication-button--login       |
      | authentication-button authentication-button--signup      |

#  TEST3 Show the Cars children.
    @smoke @menu @sub_menu
    Scenario: Check the submenu links for not logged user.
    When I am on a "/cars" page
    Then I should wait "5000" ms for element with class "first leaf active-trail"
    And I should see element with a classname "last leaf"
    And I should see the link with name "Used Cars"
    And I should see the link with name "New Cars in Stock"
    And I should see the link with name "New Cars to Order"
    And I should see element by xpath "//span[text()='Sell my car']"

#   TEST4 Show the How it works children.
  @smoke @menu @content_menu
   Scenario: Check content menu
    When I am on a "/how-it-works" page
    Then I should wait "5000" ms for element with id "block-menu-block-site-how-it-works"
    And I should see the link with name "Finance Options"
    And I should see the link with name "Warranty & Insurance"
    And I should see the link with name "Part Exchange"
    And I should see the link with name "Cancellations & Returns"
    And I should see the link with name "FAQ"
    And I should see the link with name "About Us"
    And I should see element by xpath "(//span[text()='Contact us'])[2]"

#   TEST5
  @menu @content_menu
  Scenario Outline: Check the block sub menu links.
    Given I am on a "<url>" page
    Then I should wait "5000" ms for element with id "block-menu-block-site-how-it-works"
    And I should see the link with name "Finance Options"
    And I should see the link with name "Warranty & Insurance"
    And I should see the link with name "Part Exchange"
    And I should see the link with name "Cancellations & Returns"
    And I should see the link with name "FAQ"
    And I should see the link with name "About Us"
    And I should see element by xpath "(//span[text()='Contact us'])[2]"

    Examples:
      | url                                |
      | /how-it-works                      |
      | /how-it-works/finance-options      |
      | /how-it-works/warranty-insurance   |
      | /how-it-works/part-exchange        |
      | /how-it-works/cancellation-returns |
      | /how-it-works/faq                  |
      | /how-it-works/about                |
      | /how-it-works/contact-us           |
