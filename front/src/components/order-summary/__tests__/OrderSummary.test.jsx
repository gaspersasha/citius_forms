import React from 'react';
// TODO: @ORDER_SUMMARY_DUMMY. Mock props
import { useRouter } from 'next/router';
import { ORDER_SUMMARY_DUMMY, DEVICE_TYPES } from '~constants';
import { OrderSummary } from '~components';
import { Contents } from '../Contents';
import { ExpandingWrapper } from '../ExpandingWrapper';

const { DESKTOP, MOBILE } = DEVICE_TYPES;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({ query: { productAdvertId: 1 } }));

describe('OrderSummary', () => {
  let wrapper;

  const getWrapper = (data, device = DESKTOP, withExpandingWrapper = false) => {
    global.mockUseDeviceContext({ device });

    return mount(
      <OrderSummary data={data} withExpandingWrapper={withExpandingWrapper} />
    );
  };

  it('render without errors', () => {
    expect(getWrapper(ORDER_SUMMARY_DUMMY)).toMatchSnapshot();
  });

  it('render OrderSummary only content without expanding wrapper mode', () => {
    wrapper = getWrapper(ORDER_SUMMARY_DUMMY);
    expect(wrapper.find('[role="button"]').exists()).toBe(false);
  });

  it('render OrderSummary with expanding wrapper mode', () => {
    wrapper = getWrapper(ORDER_SUMMARY_DUMMY, MOBILE, true);
    expect(wrapper.find('[data-id="expanding-wrapper"]').exists()).toBe(true);
  });
});

describe('<ExpandingWrapper/>', () => {
  global.mockUseOrderSummaryContext({
    actions: {
      getDetails: jest.fn(),
    },
    state: {
      isOpen: false,
    },
  });

  const wrapper = shallow(<ExpandingWrapper data={ORDER_SUMMARY_DUMMY} />);

  it('render without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Contents/>', () => {
  const partExchangeProps = {
    quoteDetails: {
      vehicle: {
        make: 'hyundai',
        model: 'IONIQ',
        year: 2017,
        cashPrice: 24999,
        firstImageUrl:
          'https://images.buyacar.co.uk/img/med/porsche_cayman_718_gt4_4_0_2dr_48186199.jpg',
        advertUrl: '/deal-1569916',
      },
    },
  };

  it('render only part exchange section', () => {
    const wrapper = shallow(<Contents data={partExchangeProps} />);

    expect(
      wrapper.find('[data-id="order-summary-part-exchange"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('[data-id="order-summary-lender-offer"]').exists()
    ).toBe(false);
    expect(wrapper.find('[data-id="order-summary-vap"]').exists()).toBe(false);
  });

  it('render all sections', () => {
    const wrapper = shallow(<Contents data={ORDER_SUMMARY_DUMMY} />);

    expect(
      wrapper.find('[data-id="order-summary-part-exchange"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('[data-id="order-summary-lender-offer"]').exists()
    ).toBe(true);
    expect(wrapper.find('[data-id="order-summary-vap"]').exists()).toBe(true);
  });
});
