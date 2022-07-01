import React from 'react';
import SoftCheckResult from '../SoftCheckResult';

describe('<SoftCheckResult />', () => {
  beforeEach(() => {
    global.mockUseRouter({
      pathname: '/',
      query: {
        financeQuoteId: 10500361,
        productAdvertId: 19532355,
      },
    });
  });

  let wrapper;
  const props = {
    creditSearch: {
      band: 'B',
      message: 'You have an good credit profile and are likely to be accepted',
      name: 'Good',
      score: 420,
    },
    productAdvertId: 3362295,
  };

  it('should match snapshot', () => {
    wrapper = shallow(<SoftCheckResult {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles no result case', () => {
    wrapper = shallow(<SoftCheckResult props={null} />);
    expect(wrapper.find('[data-id="no-result"]').exists()).toBe(true);
  });

  it('handles need more details case', () => {
    wrapper = shallow(
      <SoftCheckResult
        {...props}
        creditSearch={{
          ...props.creditSearch,
          band: 'D',
        }}
      />
    );

    expect(wrapper.find('[data-id="not-enough-credit-band"]').exists()).toBe(
      true
    );
  });

  it('handles no attached car case', () => {
    global.mockUseRouter({
      pathname: '/',
      query: {
        financeQuoteId: null,
        productAdvertId: null,
      },
    });

    wrapper = shallow(<SoftCheckResult {...props} productAdvertId={null} />);

    expect(wrapper.find('[data-id="speedo-animation"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="search-tags"]').exists()).toBe(true);
  });

  it('handles attached car case', () => {
    wrapper = shallow(<SoftCheckResult {...props} />);

    expect(wrapper.find('[data-id="speedo-animation"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="search-tags"]').exists()).toBe(false);
  });

  it('handles unapproved case', () => {
    wrapper = shallow(
      <SoftCheckResult
        {...props}
        creditSearch={{ ...props.creditSearch, score: 1 }}
      />
    );

    expect(wrapper.find('[data-id="unapproved"]').exists()).toBe(true);
  });
});
