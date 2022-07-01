import React from 'react';
import VehiclePrep from '../VehiclePrep';
import { subSteps } from '../helpers';

const props = {
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<VehiclePrep />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <VehiclePrep {...props} substep={subSteps.CONDITION_REPORT} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
