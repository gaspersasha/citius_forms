exports.config = {
    user: 'dennisdigital1',
    key: 'yNNyLLsGsVYTZdz9ND7i',
    server: 'hub-cloud.browserstack.com',

    commonCapabilities: {
        name: 'BSTACK-[CucumberJS] Parallel Test',
        "browserstack.debug": true
    },

    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'Safari',
        browserVersion: '12', // don't use 13 version, cause it has a bug with clicking on buttons ://
        // 'browserstack.video': true,
        // 'browserstack.debug': true,
        'bstack:options': {
            os: 'OS X',
            // osVersion: 'Catalina',
        },
    }]
}
  
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
    for (var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});