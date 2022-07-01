import React from 'react';
import OffersListItem from '../OffersList';

describe('<OffersListItem />', () => {
  let wrapper;
  const props = {
    mileage: '12000',
    valuation: '2020',
    registration: 'WE33ADT',
    quoteId: 2,
  };

  it('rendered without errors', () => {
    wrapper = shallow(<OffersListItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Pending if valuation equals null', () => {
    wrapper = mount(<OffersListItem {...props} valuation="" />);
    expect(wrapper.find('p[data-id="valuation"]').text()).toEqual('Pending');
  });
});
