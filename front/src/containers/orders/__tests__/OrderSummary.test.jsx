import React from 'react';
import OrderSummary from '../OrderSummary';

const props = {
  details: {
    amount: 199,
    created: '22/05/1988',
    vehicleId: 2898918,
    name: 'Vauxhall MOKKA 1',
    regPlate: 'DL67VFD',
    regYear: 2018,
    mileage: 34000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    vehicleType: 'car',
    imageUrl:
      '/img/med/vauxhall_mokka_x_1_4_design_nav_s_s_5_door_hatchback_33726881.jpg',
    reservationDate: 'Wed Jul 29 12:43:42 BST 2020',
    reservationAmount: 199,
  },
};

describe('<OrderSummary />', () => {
  it('OrderSummary render component', () => {
    const wrapper = mount(<OrderSummary {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
