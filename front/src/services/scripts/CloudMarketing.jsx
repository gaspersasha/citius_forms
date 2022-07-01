import React from 'react';

const cloudMarketingCDN = (
  <script
    async
    type="text/javascript"
    onLoad="setUpCloudMarketing();"
    src="https://500009688.collect.igodigital.com/collect.js"
  />
);

const cloudMarketingSetup =
  'function setUpCloudMarketing(){_etmc.push(["setOrgId", "500009688"]);_etmc.push(["trackPageView"]);}';

export const CloudMarketing = () => (
  <>
    {cloudMarketingCDN}
    <script
      async
      dangerouslySetInnerHTML={{
        __html: cloudMarketingSetup,
      }}
    />
  </>
);
