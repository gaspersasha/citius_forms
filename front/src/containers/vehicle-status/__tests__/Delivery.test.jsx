import React from 'react';
import { Delivery } from '..';
import { subSteps } from '../helpers';

const props = {
  make: '',
  model: '',
  year: 2017,
  deliveryDate: 'Tue Sep 16 13:33:50 BST 2021',
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<Delivery />', () => {
  it('should match snapshot (to be booked case)', () => {
    const wrapper = shallow(
      <Delivery {...props} substep={subSteps.TO_BE_BOOKED} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (booked case)', () => {
    const wrapper = shallow(<Delivery {...props} substep={subSteps.BOOKED} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (confirmed case)', () => {
    const wrapper = shallow(
      <Delivery {...props} substep={subSteps.CONFIRMED} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
