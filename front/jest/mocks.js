import { orders, details, myCars, myPartex, contactDealer } from './mock-data';

const useContext = jest.spyOn(require('react'), 'useContext');

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const useRef = jest.spyOn(require('react'), 'useRef');

const useDeviceContext = jest.spyOn(
  require('../src/contexts/device/Device'),
  'useDeviceContext'
);

const useUserContext = jest.spyOn(
  require('../src/contexts/user/User'),
  'useUserContext'
);

const useDetailsContext = jest.spyOn(
  require('../src/contexts/details/Details'),
  'useDetailsContext'
);

const useOrderSummaryContext = jest.spyOn(
  require('../src/contexts/order-summary/OrderSummary'),
  'useOrderSummaryContext'
);

const useContactDealerContext = jest.spyOn(
  require('../src/contexts/contact-dealer/ContactDealer'),
  'useContactDealerContext'
);

const mockHooks = (config) => {
  config.forEach((hookData) => {
    const [mockName, hook] = hookData;

    global[mockName] = (props) => {
      hook.mockImplementation(() => props);
    };
  });
};

mockHooks([
  ['mockUseContext', useContext],
  ['mockUseRouter', useRouter],
  ['mockUseRef', useRef],
  ['mockUseDetailsContext', useDetailsContext],
  ['mockUseUserContext', useUserContext],
  ['mockUseDeviceContext', useDeviceContext],
  ['mockUseOrderSummaryContext', useOrderSummaryContext],
  ['mockUseContactDealerContext', useContactDealerContext],
]);

global.mockData = {
  orders,
  details,
  myCars,
  myPartex,
  contactDealer,
};
