import React from 'react';
import { endpointFetch } from '~utils';
import MyCars from '../MyCars';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue(global.mockData.myCars(6));

let wrapper;

beforeEach(() => {
  wrapper = shallow(<MyCars />);
});

describe('<MyCars />', () => {
  it('should match snapshot', async () => {
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('placeholder view should display if there is no cars fetched from server', async () => {
    endpointFetch.mockResolvedValue(null);
    wrapper = mount(<MyCars />);
    await global.updateWrapper(wrapper);
    const placeholder = wrapper.find('NoSavedCars');

    expect(placeholder.exists()).toBe(true);
  });
});
