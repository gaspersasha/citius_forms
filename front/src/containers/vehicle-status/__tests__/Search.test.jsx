import React from 'react';
import { Search } from '..';

const props = {
  productAdvertId: 3332415,
  financeQuoteId: 3735215,
  make: 'hyundai',
  model: 'IONIQ',
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<Search />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Search {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
