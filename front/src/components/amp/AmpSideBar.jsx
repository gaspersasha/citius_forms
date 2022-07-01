import React from 'react';

import { CONTACTS } from '~constants';

export const config = {
  amp: true,
};

const { PHONE, PHONE_FORMATTED } = CONTACTS;

const AmpSideBar = () => (
  <amp-sidebar
    id="sidebar"
    layout="nodisplay"
    side="left"
    role="menu"
    tabindex="-1"
  >
    <amp-accordion i-amphtml-layout="container">
      <section>
        <header
          role="button"
          aria-controls="56_AMP_content_0"
          aria-expanded="false"
          tabIndex="0"
          id="amp-header"
          className="menu i-amp-html-accordion-header"
        >
          <span>Cars</span>
        </header>
        <ul className="menu" role="region">
          <li className="child-element">
            <a href="/cars">Used Cars</a>
          </li>
          <li className="child-element">
            <a href="/cars/new-cars">New Cars in Stock</a>
          </li>
          <li className="child-element">
            <a href="/part-ex">Sell my car</a>
          </li>
        </ul>
      </section>
      <section>
        <header className="menu i-amp-html-accordion-header" role="button">
          <a href="/vans">Vans</a>
        </header>
        <ul className="menu" aria-labelledby="56_AMP_header_1" role="region" />
      </section>
      <section>
        <header role="button" className="menu i-amp-html-accordion-header">
          <a href="/leasing">Leasing</a>
        </header>
        <ul
          className="menu i-amp-html-accordion-header i-amphtml-accordion-content"
          aria-labelledby="56_AMP_header_2"
          role="region"
        />
      </section>
      <section>
        <header className="menu i-amp-html-accordion-header" role="button">
          <a href="/motoring-services">Motoring Services</a>
        </header>
        <ul
          className="menu i-amp-html-accordion-header i-amphtml-accordion-content"
          aria-labelledby="56_AMP_header_3"
          role="region"
        />
      </section>
      <section>
        <header className="menu i-amp-html-accordion-header" role="button">
          <span>How It Works</span>
        </header>
        <ul className="menu" role="region">
          <li className="child-element">
            <a href="/how-it-works">How It Works</a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/finance-options">Finance Options</a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/warranty-insurance">
              Warranty &amp; Insurance
            </a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/part-exchange">Part Exchange</a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/cancellation-returns">
              Cancellations &amp; Returns
            </a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/faq">FAQ</a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/about">About Us</a>
          </li>
          <li className="child-element">
            <a href="/how-it-works/contact-us">Contact us</a>
          </li>
        </ul>
      </section>
      <section>
        <header className="menu i-amp-html-accordion-header" role="button">
          <a href={`tel:${PHONE}`}>{PHONE_FORMATTED}</a>
        </header>
        <ul className="menu" aria-labelledby="56_AMP_header_5" role="region" />
      </section>
      <section>
        <header className="menu i-amp-html-accordion-header" role="button">
          <span>My Account</span>
        </header>
        <ul className="menu" aria-labelledby="56_AMP_header_6" role="region">
          <li className="child-element">
            <a href="/account">My Cars</a>
          </li>
          <li className="child-element">
            <a href="/account/details">My Details</a>
          </li>
          <li className="child-element">
            <a href="/account/orders">My Orders</a>
          </li>
          <li className="child-element">
            <a href="/account/part-exchange">My Part-exchange</a>
          </li>
          <li className="child-element">
            <a href="https://website/mybuyacar/Logout.jhtml?partnerName=buyacar">
              Sign Out
            </a>
          </li>
        </ul>
      </section>
    </amp-accordion>
    <div className="separator" />
  </amp-sidebar>
);

export default AmpSideBar;
