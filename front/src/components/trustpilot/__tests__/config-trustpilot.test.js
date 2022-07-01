import { configTrustpilot } from '../config-trustpilot';

describe('configTrustpilot', () => {
  const params = {
    theme: 'theme',
    stars: 'stars',
    heigth: 'heigth',
    width: 'width',
    locale: 'locale',
    isBigTemplate: true,
  };

  it('make options', () => {
    expect(configTrustpilot(params)).toEqual({
      className: 'trustpilot-widget',
      scriptPath:
        'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
      locale: 'locale',
      templateId: '53aa8912dec7e10d38f59f36',
      businessUnitId: '4bdcd9ad000064000505fa5a',
      styleHeight: 'heigth',
      styleWidth: 'width',
      theme: 'theme',
      stars: 'stars',
      accountLink: 'https://uk.trustpilot.com/review/website',
    });

    expect(configTrustpilot()).toEqual({
      className: 'trustpilot-widget',
      scriptPath:
        'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
      locale: 'en-GB',
      templateId: '53aa8807dec7e10d38f59f32',
      businessUnitId: '4bdcd9ad000064000505fa5a',
      styleHeight: '',
      styleWidth: '100%',
      theme: 'light',
      stars: '4,5',
      accountLink: 'https://uk.trustpilot.com/review/website',
    });
  });
});
