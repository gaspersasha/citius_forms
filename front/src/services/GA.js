import ReactGA from 'react-ga';
import { ENV } from '~constants';

const { IS_PROD_ENV } = ENV;

// This id from GA BuyaCar test admin.
const prod = 'UA-543129-1';
const dev = 'UA-543129-4';
const ID = IS_PROD_ENV ? prod : dev;

export const RESERVATION_CATEGORY = {
  category: 'Reserve your car form',
  pageview: 'reserve-car',
};

export const init = () => {
  const { pathname, href } = window.location;

  // tslint:disable-next-line
  console.log('%c google analytics init', 'background: #222; color: #bada55');
  ReactGA.initialize(ID);
  ReactGA.set({
    dimension8: 1,
    dimension12: href,
    dimension13: 20160219,
    dimension15: pathname,
    dimension16: '-',
    dimension17: 0,
    dimension19: pathname,
  });
  ReactGA.send('pageview');
};

export const gaSendEvent = ReactGA.ga;
export const gaPageView = ReactGA.pageview;

export const getGAClientId = () => {
  let gaKey;

  ReactGA.ga((tracker) => {
    gaKey =
      tracker.get('trackingId') === ID && tracker.get('clientId')
        ? tracker.get('clientId')
        : null;
  });

  return gaKey;
};
