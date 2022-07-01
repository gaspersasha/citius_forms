import React from 'react';
import { endpointPush } from '~utils';
import { AccountVehicleCard } from '~containers';

const { myCars } = global.mockData;

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointPush: jest.fn(),
}));

endpointPush.mockResolvedValue(null);

describe('<AccountVehicleCard />', () => {
  let wrapper;
  const defProps = {
    vehicle: {
      ...myCars(1).savedVehicles[0],
    },
    updateVehiclesList: jest.fn(),
    index: 0,
  };

  beforeEach(() => {
    wrapper = mount(<AccountVehicleCard {...defProps} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('call to action button should be relevant to incoming props #1', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        userActivity: {
          CUSTOMER_CONFIGURED: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const CTA = wrapper.find('[data-id="CTA"]');

    expect(CTA.text()).toEqual('Next steps');
    expect(CTA.props().href).toEqual(
      '/factoryBuilds/viewDeals.jhtml?productDefinitionId=10001'
    );
  });

  it('call to action button should be relevant to incoming props #2', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        dealerFormFilled: true,
        userActivity: {
          CUSTOMER_SAVED: 'Wed Oct 21 00:00:00 BST 2020',
          CUSTOMER_HAS_QUESTION: 'Wed Oct 21 00:00:00 BST 2020',
        },
        vehicleQuotes: [
          {
            quoteId: 974707,
            quoteItemId: 1002792,
            createdDate: 'Mon Nov 09 00:00:00 GMT 2020',
            status: 'CUSTOMER_SAVED',
          },
          {
            quoteId: 974674,
            quoteItemId: 1002773,
            createdDate: 'Mon Nov 09 00:00:00 GMT 2020',
            status: 'CUSTOMER_HAS_QUESTION',
          },
        ],
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const CTA = wrapper.find('[data-id="CTA"]');

    expect(CTA.text()).toEqual('Apply for finance');
    expect(CTA.props().href).toEqual(
      '/gofinance?productAdvertId=166667&financeQuoteId=9648602&quoteId=974707&quoteItemId=1002792'
    );
  });

  it('call to action button should be relevant to incoming props #3', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        dealerFormFilled: true,
        userActivity: {
          FINANCE_APP_COMPLETE: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const CTA = wrapper.find('[data-id="CTA"]');

    expect(CTA.text()).toEqual('Reserve this car');
    expect('/reservation?productAdvertId=166666');
  });

  it('call to action button should be relevant to incoming props #4', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        dealerFormFilled: false,
        leadgen: true,
        userActivity: {
          FINANCE_APP_COMPLETE: 'Wed Oct 21 00:00:00 BST 2020',
          CUSTOMER_RESERVATION: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const CTA = wrapper.find('[data-id="CTA"]');

    expect(CTA.text()).toEqual('Contact dealer');
    expect(CTA.props().href).toEqual(
      '/contact-dealer?productAdvertId=166667'
    );
  });

  it('call to action button should be relevant to incoming props #5', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        sold: true,
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const CTA = wrapper.find('[data-id="CTA"]');

    expect(CTA.text()).toEqual('See similar cars');
    expect(CTA.props().href).toEqual(
      '/fiat/500/500-hatchback/1-2-pop-3dr-71784'
    );
  });

  it('card should have delete option', () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        depositPaid: false,
        userActivity: {
          CUSTOMER_SAVED: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    expect(wrapper.find('[data-id="delete-card"]')).toHaveLength(1);
  });

  it("card shouldn't have delete option if car already was reserved and paid by user", () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        depositPaid: true,
        userActivity: {
          FINANCE_APP_COMPLETE: 'Wed Oct 21 00:00:00 BST 2020',
          CUSTOMER_RESERVATION: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    expect(wrapper.find('[data-id="delete-card"]')).toHaveLength(0);
  });

  it(`delete card action should call primary endpoint if there is
    exist productAdvertId in vehicle object`, () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        productAdvertId: 2434232,
        depositPaid: false,
        userActivity: {
          CUSTOMER_SAVED: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const deleteBtn = wrapper.find('[data-id="delete-card"] svg');

    deleteBtn.simulate('click');
    expect(endpointPush).toBeCalledWith('delete', 'deleteQuotesByAdvertId', {
      productAdvertId: props.vehicle.productAdvertId,
    });
  });

  it(`delete card action should call alternative endpoint if there is
    no productAdvertId in vehicle object`, () => {
    const props = {
      ...defProps,
      vehicle: {
        ...defProps.vehicle,
        productAdvertId: null,
        depositPaid: false,
        userActivity: {
          CUSTOMER_SAVED: 'Wed Oct 21 00:00:00 BST 2020',
        },
      },
    };

    wrapper = mount(<AccountVehicleCard {...props} />);

    const deleteBtn = wrapper.find('[data-id="delete-card"] svg');

    deleteBtn.simulate('click');
    expect(endpointPush).toBeCalledWith(
      'delete',
      'deleteQuotesByProductDefinitionId',
      {
        productDefinitionId: props.vehicle.productDefinitionId,
      }
    );
  });
});
