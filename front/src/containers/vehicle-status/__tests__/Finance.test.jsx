import React from 'react';
import { Finance } from '..';
import { subSteps } from '../helpers';

const props = {
  productAdvertId: 3332415,
  financeQuoteId: 3735215,
  softCreditSearch: {
    band: 'B',
    score: 420,
  },
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<Finance />', () => {
  it('should match snapshot (soft case)', () => {
    const wrapper = shallow(<Finance {...props} substep={subSteps.SOFT} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (applied case)', () => {
    const wrapper = shallow(<Finance {...props} substep={subSteps.APPLIED} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (px case)', () => {
    const wrapper = shallow(<Finance {...props} substep={subSteps.PART_EX} />);

    expect(wrapper).toMatchSnapshot();
  });
});
