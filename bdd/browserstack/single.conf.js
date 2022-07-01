exports.config = {
  user: 'dennisdigital1',
  key: 'yNNyLLsGsVYTZdz9ND7i',
  server: 'hub-cloud.browserstack.com',

  capabilities: [
    {
      browserName: 'Safari',
      browserVersion: '12', // don't use 13 version, cause it has a bug with clicking on elements ://
      // 'browserstack.video': true,
      // 'browserstack.debug': true,
      'bstack:options': {
        os: 'OS X',
        // osVersion: 'Catalina',
      },
    }
  ],
};