import React from 'react';

/* eslint-disable */
const instanaScript = `let key = '';
switch (document.location.origin) {
  case 'https://website':
    key = 'secret';
    break;
  case 'https://buyacar.vm.didev.co.uk':
    key = 'Xz9dKOajRXuSf4BC3d3WjQ';
    break;

  default:
    key = 'secret';
    break;
}
(function(s,t,a,n){s[t]||(s[t]=a,n=s[a]=function(){n.q.push(arguments)},
n.q=[],n.v=2,n.l=1*new Date)})(window,"InstanaEumObject","ineum");
ineum('reportingUrl', 'https://eum-green-saas.instana.io');
ineum('key', key);
ineum('trackSessions');`;

/* eslint-enable */

export const Instana = () => (
  <script
    defer
    src="//eum.instana.io/eum.min.js"
    crossOrigin="anonymous"
    dangerouslySetInnerHTML={{
      __html: instanaScript,
    }}
  />
);
