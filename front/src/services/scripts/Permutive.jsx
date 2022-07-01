import React from 'react';
import PropTypes from 'prop-types';

const permutiveCDN = (
  <script
    async
    type="text/javascript"
    src="https://cdn.permutive.com/5642074a-7820-secret-web.js"
  />
);

/* eslint-disable */
const permutiveSetTag = (pageType) =>
  `var googletag=googletag||{};googletag.cmd=googletag.cmd||[],googletag.slots=googletag.slots||{},
  !function(n,e,o,r,i){if(!e){e=e||{},window.permutive=e,e.q=[],e.config=i||{},e.config.projectId=
  o,e.config.apiKey=r,e.config.environment=e.config.environment||"production";for(var t=["addon","identify",
  "track","trigger","query","segment","segments","ready","on","once","user"],c=0;c<t.length;c++)
  {var f=t[c];e[f]=function(n){return function(){var o=Array.prototype.slice.call(arguments,0);
  e.q.push({functionName:n,arguments:o})}}(f)}}}(document, window.permutive, "5642074a-7820-46d3-a3d9-f26f3cc6e800",
  "f883c4a3-5ce8-43bd-8331-0f46066c8644", {});
  permutive.addon("web", {"page":{"site":{"platform":"Citius","pageType":"${pageType}","login":"Anonymous","sponsored":false,"wordCount":0,"internalLinks":0},"publisher":{"name":"BuyaCar"}}});`;
/* eslint-enable */

export const Permutive = ({ pageType }) => (
  <>
    <script
      async
      dangerouslySetInnerHTML={{
        __html: permutiveSetTag(pageType),
      }}
    />
    {permutiveCDN}
  </>
);

Permutive.propTypes = {
  pageType: PropTypes.string,
};

Permutive.defaultProps = {
  pageType: '',
};
