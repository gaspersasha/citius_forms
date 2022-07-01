export const getPayPalScriptUrl = (clientId) =>
  /* eslint max-len: ["error", { "ignoreTemplateLiterals": true }] */
  `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=buttons,funding-eligibility`;

export const FACEBOOK = 'https://www.facebook.com/buyacarcouk-118472818183789';
export const TWITTER = 'https://twitter.com/buy_a_car';
export const LINKEDIN = 'https://www.linkedin.com/company/buyacar-co-uk';
export const INSTAGRAM = 'https://www.instagram.com/buyacaruk/';

export const TRUSTPILOT = 'https://uk.trustpilot.com/review/website';
export const TRUSTPILOT_SCRIPT =
  'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

export const imagesCDN = 'https://images.buyacar.co.uk';

export const AUTOVIA_ORIGIN = 'https://www.autovia.co.uk';
export const PRIVACY = `${AUTOVIA_ORIGIN}/privacy-policy`;
export const BRANDS = `${AUTOVIA_ORIGIN}/brands`;
export const PRIVACY_EXT = `${PRIVACY}/#vehicle-purchase-or-enquiry`;

export const leadGenTYAction =
  '/car-finance/1474/the-best-ways-to-finance-a-car';

export const CAMPAIGN_URL_PARAM = 'cq_cmp';
