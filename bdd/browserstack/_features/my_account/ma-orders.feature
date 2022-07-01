  @my_account @my-orders
  Feature: My Order page
    As a user I want to able to see & use new My Order page in MA

  Scenario: My Order page on MA general items
#     My orders page
      Given I am on a "account" page
      And I should wait "5000" ms for element with class "link--button-forward"
      When I click on the button with class "link--button-forward"
      And I should wait "5000" ms for element with class "modal-container--react modal--auth"
      Then I should see element with xpath "//span[text()='Enter your email address and password']"
      And I fill in "email" with existed user data "order.test1@buuuyacar.co.uk"
      And I fill in "password" with "Test123@*"
      When I click on the button with class "authentication-typo authentication-submit"
      And I wait a maximum of "8000" ms
      Then I should see element with xpath "//span[text()='My Account']"
      Given I am on a "account/orders" page
      And I wait a maximum of "5000" ms
      Then I should see element with xpath "//h1[text()='My Orders']"
      And I should see element with xpath "//h3[text()='Account name:']"
      And I should see element with xpath "//div[text()='This is the summary of the activity in your account. From here you can view orders, invoices and payment history']"  
      And I should see element with xpath "//h1[text()='Financial summary']"
      And I should see element with xpath "//div[text()='Deposit payments']"

#    Deposit payments block
      And I should see element with xpath "//div[text()='Payment for']"
          And I should see element with xpath "//div[text()='28898']"
      And I should see element with xpath "//div[text()='Status']"
          And I should see element with xpath "//div[text()='paid waiting to clear']"
      And I should see element with xpath "//div[text()='Balance']"
          And I should see element with xpath "//div[text()='£199']"
      And I should see element with xpath "//div[text()='Type']"
          And I should see element with xpath "//div[text()='credit']"
      And I should see element with xpath "//div[text()='Date']"
          And I should see element with xpath "//div[text()='31/08/2018']"
      And I should see element with xpath "//a[text()='View']"
      And I should see element with xpath "//div[text()='Account balance']"
          And I should see element with xpath "//div[text()='£0']"

#     My orders block
      And I should see element with xpath "//h1[text()='Your orders']"
      And I should see element with xpath "//div[text()='Vehicle order']"
          And I should see element with xpath "//div[text()='2016, 18235 miles']"
      And I should see element with xpath "//div[text()='Status']"
          And I should see element with xpath "//div[text()='Signed order recvd']"
      And I should see element with xpath "//div[text()='Type']"
          And I should see element with xpath "(//div[text()='debit'])[3]"
      And I should see element with xpath "//div[text()='Date']"
         And I should see element with xpath "(//div[text()='04/09/2018'])[3]"
      And I should see element with xpath "//a[text()='View']"
      And I should see element with xpath "//h3[text()='Order summary']"
      And I should see element with xpath "//div[text()='Mercedes-Benz C Class']"

#     Your Account Summary explained block
      And I should see element with xpath "//div[text()='Your Account Summary explained']"
      And I should see element with xpath "(//div[contains(.,'There are two sections to your account summary. The first part is a financial summary of your account balance. This is a total of the outstanding balance of any invoices, the balance of the credit notes, and cleared deposit payments.The outstanding balance of an invoice is made up of the amount due less any payments you have made, and therefore a zero balance would indicate that the invoice has been paid in full. To see the details of the invoice balance and how it is calculated click view and scroll down the document to the statement section.The second section shows your orders and payments that are not yet cleared. These do not affect the account balance. The balance of order works in the same way but for the deposit due.')])[5]"

          