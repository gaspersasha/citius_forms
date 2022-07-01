import React from 'react';
import { Logo } from '~assets/svg';

export const config = {
  amp: true,
};

const AmpHeader = () => (
  <header className="page-header" aria-hidden="true">
    <div
      on="tap:sidebar.toggle"
      className="menu-toggle"
      role="button"
      tabIndex="-1"
    >
      <span />
      <span />
      <span />
    </div>
    <div className="logo-wrapper">
      <a className="site-logo" href="/" title="BuyaCar" tabIndex="-1">
        <Logo width="152" height="40" />
      </a>
    </div>
  </header>
);

export default AmpHeader;
