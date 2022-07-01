import React from 'react';
import { VehicleCard } from '..';

describe('<VehicleCard />', () => {
  const props = {
    registrationDate_S: '',
    handleButtonClick: jest.fn(),
    buttonClasses: [],
    buttonText: 'Apply',
    buttonColor: '',
    hasReservationInfo: false,
    reservationSumm: '',
    reservationDate: '',
    fuelType: 'petrol',
    gearbox: 'auto',
    mileage: 94356,
    make: 'vaxhaul',
    model: 'corsa hatchback special eds',
    imageUrls_S: ['/image/opel', '/image/corsa'],
    price: 5990,
  };

  it('renders without errors', () => {
    const wrapper = shallow(<VehicleCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('handle button', () => {
    const wrapper = shallow(<VehicleCard {...props} />);

    wrapper.find('[data-id="vehicle-card-action-button"]').simulate('click');
    expect(props.handleButtonClick).toHaveBeenCalled();
  });
});
