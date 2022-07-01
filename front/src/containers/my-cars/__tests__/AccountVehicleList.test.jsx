import React from 'react';
import { act } from 'react-dom/test-utils';
import { endpointFetch } from '~utils';
import { AccountVehicleList } from '~containers';

const { myCars } = global.mockData;

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue(global.mockData.myCars(6));

describe('<AccountVehicleList />', () => {
  const props = {
    items: myCars(6).savedVehicles,
    allVehicles: false,
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AccountVehicleList {...props} />);
  });

  it('should match snapshots', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('vehicle card have to be deletable', () => {
    wrapper.find('span[data-id="delete-card"] svg').first().simulate('click');
    expect(wrapper.find('div[data-id="account-card"]').length).toEqual(5);
  });

  it(`should not render "view all saved cars" 
    link since there is no more cars to fetch from server`, () => {
    wrapper.setProps({ allVehicles: true });
    expect(wrapper.find('button[data-id="load-more"]')).toHaveLength(0);
  });

  it(`should render "view all saved cars" link since 
    there are more cars to fetch from server`, () => {
    wrapper.setProps({ allVehicles: false });
    expect(wrapper.find('button[data-id="load-more"]')).toHaveLength(1);
  });

  it('should on click "view all saved cars" should call loading process', async () => {
    wrapper.find('button[data-id="load-more"]').simulate('click');
    await act(async () =>
      expect(wrapper.find('button[data-id="load-more"]')).toHaveLength(0)
    );
    expect(wrapper.find('*[data-id="my-cars-spinner"]').exists()).toBe(true);
  });

  it('after call "load more" component should get +6 cards', async () => {
    wrapper.find('button[data-id="load-more"]').simulate('click');
    await global.updateWrapper(wrapper);
    const cards = wrapper.find('div[data-id="account-card"]');

    expect(cards.length).toBe(12);
  });
});
