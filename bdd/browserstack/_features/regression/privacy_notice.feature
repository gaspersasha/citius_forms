# TODO
@privacy_notice
Feature: Privacy notices on form
  In order to be GDPR compliant
  As ICO
  I would like privacy notices displayed on form

#  @forms @29951 @javascript @form_privacy_notice_finance_new
#  Scenario: Check privacy notice on new finance app
#    Given I am on "/gofinance"
#    Then I wait a maximum of "20" seconds for the "autoconvertep" element
#    Then a "autoconvertep .form--privacy-notice" element should match "~<h3>Privacy Notice</h3>~"
#    Then a "autoconvertep .form--privacy-notice" element should match "~<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\">Privacy Policy</a>~"
#    Then a "autoconvertep .form--privacy-notice" element should match "~<div class=\"checkbox-inputs-wrapper\"><input type=\"checkbox\" id=\"\" class=\"mailUnsubscriber\" name=\"mailUnsubscriber\" value=\"\"><div class=\"form-input-text-label \"><div class=\"status-line\"></div><label for=\"mailUnsubscriber\" data-name=\"mailUnsubscriber\"><span class=\"form-label-title\"> </span></label></div></div>~"
#    Then a "autoconvertep .form--privacy-notice" element should match "~<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://www\.dennis\.co\.uk/brands\">detailed here</a>~"

#  @forms @29951 @javascript @form_privacy_notice_reserve
#  Scenario: Check privacy notice on reserve form
#    Given I am on "/goreserve"
#    Then I wait a maximum of "20" seconds for the "applyforreservationep" element
#    Then a "applyforreservationep .form--privacy-notice" element should match "~<h3>Privacy Notice</h3>~"
#    Then a "applyforreservationep .form--privacy-notice" element should match "~<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\">Privacy Policy</a>~"
#    Then a "applyforreservationep .form--privacy-notice" element should match "~<div class=\"checkbox-inputs-wrapper\"><input type=\"checkbox\" id=\"\" class=\"mailUnsubscriber\" name=\"mailUnsubscriber\" value=\"\"><div class=\"form-input-text-label \"><div class=\"status-line\"></div><label for=\"mailUnsubscriber\" data-name=\"mailUnsubscriber\"><span class=\"form-label-title\"> </span></label></div></div>~"
#    Then a "applyforreservationep .form--privacy-notice" element should match "~<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://www\.dennis\.co\.uk/brands\">detailed here</a>~"
#
#  @forms @29951 @javascript @form_privacy_notice_question
#  Scenario: Check privacy notice on ask a question
#    Given I am on "stock_item/123"
#    Then I wait a maximum of "90" seconds for the "finance-info-bottom-btns" element
#    Then I wait a maximum of "180" seconds for the ".ask-quest" element
#    Then I click the ".ask-quest" element
#    Then I wait for the ".modal-container.open" element
#    Then a "user-details + .form--privacy-notice" element should match "~<h3>Privacy Notice</h3>~"
#    Then a "user-details + .form--privacy-notice" element should match "~<p>We will use the details you have shared to manage your car purchase\. You agree to the processing, storage, sharing and use of this information for the purpose of managing your car purchase as described in our\&nbsp;<a href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\">Privacy Policy.</a></p>~"
#    Then a "user-details + .form--privacy-notice" element should match "~<p>We believe that based on this purchase you may be interested in other related products and services we offer\. As described in our\&nbsp;<a href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\">Privacy Policy</a>\&nbsp;we will use the information you have shared to send you communications about such products and services\. If you do not wish to receive these communications from us then please check here and you will be unsubscribed from this activity\&nbsp;<input type=\"checkbox\" name=\"privacy\" value=\"privacy\" id=\"prNoticeUnsubscribe\" class=\"privacy-consent-checkbox\">.</p>~"
#    Then a "user-details + .form--privacy-notice" element should match "~<p>‘We’ includes BuyaCar, AutoExpress, Carbuyer, evo and other Autovia Group brands as <a href=\"http://www\.dennis\.co\.uk/brands/\" target=\"_blank\">detailed here</a>. </p>~"
#
#  @forms @29951 @javascript @form_privacy_notice_save @pricing_section
#  Scenario: Check privacy notice on save this car
#    Given I am on "stock_item/123"
#    Then I wait a maximum of "90" seconds for the "finance-info-bottom-btns" element
#    Then I wait a maximum of "180" seconds for the ".save-car" element
#    Then I click the ".save-car" element
#    Then I wait for the ".modal-container.open" element
#    Then a "user-details + .form--privacy-notice" element should match "~<p>We will use the details you have shared to manage your car purchase\. You agree to the processing, storage, sharing and use of this information for the purpose of managing your car purchase as described in our\&nbsp;<a href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\">Privacy Policy.</a></p>~"
#    Then a "user-details + .form--privacy-notice" element should match "~<p>We believe that based on this purchase you may be interested in other related products and services we offer\. As described in our\&nbsp;<a href=\"http://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\">Privacy Policy</a>\&nbsp;we will use the information you have shared to send you communications about such products and services\. If you do not wish to receive these communications from us then please check here and you will be unsubscribed from this activity\&nbsp;<input type=\"checkbox\" name=\"privacy\" value=\"privacy\" id=\"prNoticeUnsubscribe\" class=\"privacy-consent-checkbox\">.</p>~"
#    Then a "user-details + .form--privacy-notice" element should match "~<p>‘We’ includes BuyaCar, AutoExpress, Carbuyer, evo and other Autovia Group brands as <a href=\"http://www\.dennis\.co\.uk/brands/\" target=\"_blank\">detailed here</a>. </p>~"
#
#  @forms @javascript @form_privacy_notice_signup @react @signup_popup @authentication
#  Scenario: Switch to Login
#    Given I am in breakpoint "desktop"
#    Given I am on "/"
#    Then I press the "Sign Up" button
#    Then I wait a maximum of "5" seconds for the ".modal-container--react.modal--auth" element
#    Then a ".authentication-privacyNotice" element should match "~<p>Privacy Notice<br>We will use the details you have shared to manage your car purchase\. You agree to the processing, storage, sharing and use of this information for the  purpose of managing your car purchase as described in our<a class=\"authentication-privacyLinks\" href=\"https://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\" rel=\"noopener noreferrer\">\&nbsp;Privacy Policy</a>.</p>~"
#    Then a ".authentication-privacyNotice" element should match "~<div class=\"field-type-text--auth\">We believe that based on this purchase you may be interested in other related products and services we offer\. As described in our<a class=\"authentication-privacyLinks\" href=\"https://www\.dennis\.co\.uk/privacy-policy/#vehicle-purchase-or-enquiry\" target=\"_blank\" rel=\"noopener noreferrer\">\&nbsp;Privacy Policy\&nbsp;</a>we will use the information you have shared to send you communications about such products and services\. If you do not wish to receive these communications from us then please click here and you will be unsubscribed from this activity\.<div class=\"checkbox-inputs-wrapper\"><input type=\"checkbox\" id=\"\" class=\"authentication-checkbox authentication-checkbox--unsubscribe\" name=\"\" value=\"\"><div class=\"form-input-text-label \"><div class=\"status-line\"></div><label for=\"\" data-name=\"\"><span class=\"form-label-title\"> </span></label></div></div></div>~"
#    Then a ".authentication-privacyNotice" element should match "~<p>We includes BuyaCar, AutoExpress, Carbuyer, evo and other Autovia Group brands as<a class=\"authentication-privacyLinks\" href=\"https://www\.dennis\.co\.uk/brands/\" target=\"_blank\" rel=\"noopener noreferrer\">\&nbsp;detailed here</a>.</p>~"
