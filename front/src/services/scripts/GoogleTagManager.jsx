import React from 'react';

const id = 'GTM-secret'; // no differ between prod and test (c) @Geoff Moon

export const GTM_JS = () => (
  <script async src={`https://www.googletagmanager.com/gtm.js?id=${id}`} />
);

export const GTM_NOJS = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${id}`}
      style={{ display: 'none', visibility: 'hidden' }}
      width="0"
      height="0"
      title="googletagmanager"
    />
  </noscript>
);

export const fire = (action) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(action);
};

export const init = () =>
  fire({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

export const setUserId = (userId) => {
  if (userId === undefined) {
    return fire({ buyacarUserId: 'not logged in', event: 'buyacarUserId' });
  }

  fire({ buyacarUserId: userId, event: 'buyacarUserId' });
};
