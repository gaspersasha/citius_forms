import React from 'react';

import VehicleCard from '../VehicleCard';

describe('<VehicleCard />', () => {
  const props = {
    productInformation: {
      fuelType: 'petrol',
      gearbox: 'auto',
      mileage: 94356,
      make: 'vaxhaul',
      model: 'corsa hatchback special eds',
      prodAdvertUrl_S: '2943561 ',
      imageUrls_S: ['/image/opel', '/image/corsa'],
      carDateOfReg: '2015(15)',
      price: 5990,
    },
    actionUrl: '/action',
    actionlinkText: 'action',
    reservation: {
      depositPaid: 199,
      dateOfPayment: 'Wed Jun 13 10:56:54 BST 2018',
    },
  };

  it('renders without errors', () => {
    const wrapper = shallow(<VehicleCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
