import { URL } from '~constants';

const { TRUSTPILOT_SCRIPT, TRUSTPILOT } = URL;

export const configTrustpilot = (params = {}) => {
  const { theme, stars, heigth, width, locale, isBigTemplate } = params;

  return {
    className: 'trustpilot-widget',
    scriptPath: TRUSTPILOT_SCRIPT,
    locale: locale || 'en-GB',
    templateId: isBigTemplate
      ? '53aa8912dec7e10d38f59f36'
      : '53aa8807dec7e10d38f59f32',
    businessUnitId: '4bdcd9ad000064000505fa5a',
    styleHeight: heigth || '',
    styleWidth: width || '100%',
    theme: theme || 'light',
    stars: stars || '4,5',
    accountLink: TRUSTPILOT,
  };
};
