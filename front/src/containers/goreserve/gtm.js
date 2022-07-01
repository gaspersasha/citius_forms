import { GTM_GA as gtm_ga, GTM as gtm } from '~utils';

const title = 'Reserve your car';

export const GTM = (path) => gtm(path, 'reservation', title);
export const GTM_GA = (event) => gtm_ga(event, title);
