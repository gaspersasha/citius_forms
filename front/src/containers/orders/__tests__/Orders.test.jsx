import React from 'react';
import { endpointFetch } from '~utils';
import Orders, { concatenateData } from '../Orders';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue(global.mockData.orders);

describe('<Orders />', () => {
  let wrapper;

  const getWrapper = () => {
    global.mockUseRouter({ pathname: '/account/orders' });
    global.mockUseContext([{ user: { isLoggedIn: true } }]);

    return mount(<Orders />);
  };

  it('orders snapshot', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with orders', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper.find('[data-id="account-orders"]').length).toBe(1);
  });

  it('No Account found case', async () => {
    endpointFetch.mockResolvedValue(null);
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper.find('.no-account-found').length).toBe(1);
  });
});

describe('function concatenateData returned value', () => {
  it('should return array with objects', () => {
    const invoices = [
      {
        documentId: '1',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/2019',
      },
      {
        documentId: '2',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/2019',
      },
    ];
    const deposits = [
      {
        documentId: '3',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/2019',
      },
      {
        documentId: '4',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/2019',
      },
    ];

    expect(concatenateData([invoices, deposits])).toHaveLength(4);
  });
});
