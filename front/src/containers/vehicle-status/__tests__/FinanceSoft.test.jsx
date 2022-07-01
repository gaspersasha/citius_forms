import React from 'react';
import { FinanceSoft } from '..';

const props = {
  productAdvertId: 3332415,
  financeQuoteId: 3735215,
  softCreditSearch: {
    band: 'A',
    score: 550,
  },
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<FinanceSoft />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<FinanceSoft {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly display probability text #1', () => {
    const wrapper = shallow(<FinanceSoft {...props} />);

    expect(
      wrapper.find('[data-id="probability-text"]').prop('children')
    ).toEqual([
      'From your soft credit check we can see that you are',
      ' very likely ',
      'to be approved for finance',
    ]);
  });

  it('should correctly display probability text #2', () => {
    const wrapper = shallow(
      <FinanceSoft
        {...props}
        softCreditSearch={{
          ...props.softCreditSearch,
          band: 'C',
        }}
      />
    );

    expect(
      wrapper.find('[data-id="probability-text"]').prop('children')
    ).toEqual([
      'From your soft credit check we can see that you are',
      ' likely ',
      'to be approved for finance',
    ]);
  });
});
