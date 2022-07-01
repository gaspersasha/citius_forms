import React from 'react';
import { useGOContext, useVehicleContext } from '~contexts';
import Parts from '../Parts';

jest.mock('~contexts', () => ({
  useGOContext: jest.fn(),
  useVehicleContext: jest.fn(),
}));

useGOContext.mockImplementation(() => ({ isGoRdy: true }));
useVehicleContext.mockImplementation(() => ({ vehicle: { leadgen_B: false } }));

describe('<Parts />', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'google_optimize', {
      value: {
        get: () => '1',
      },
      configurable: true,
      writable: true,
    });
  });

  it('no part props', () => {
    const wrapper = mount(<Parts step={5} part={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('no step props', () => {
    const wrapper = mount(<Parts part={2} step={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('part less than 1 props', () => {
    const wrapper = mount(<Parts part={-1} step={3} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('part bigger than totalPartsCount const props', () => {
    const wrapper = mount(<Parts part={8} step={3} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('step less than 1 props', () => {
    const wrapper = mount(<Parts part={1} step={0} />);

    expect(wrapper).toMatchSnapshot();
  });
});
