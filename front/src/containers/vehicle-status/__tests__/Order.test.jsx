import React from 'react';
import { DEVICE_TYPES } from '~constants';
import { Order } from '..';
import { subSteps } from '../helpers';

const { DESKTOP } = DEVICE_TYPES;

const props = {
  productAdvertId: 3332415,
  financeQuoteId: 3735215,
  isVan: false,
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

global.mockUseOrderSummaryContext({
  actions: {
    getDetails: jest.fn(),
  },
  state: {
    isOpen: false,
  },
});

global.mockUseDeviceContext({ DESKTOP });

describe('<Order />', () => {
  it('should match snapshot (pending no paid case)', () => {
    const wrapper = shallow(
      <Order {...props} substep={subSteps.PENDING_NO_PAID} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (pending no paid case & isVan)', () => {
    const wrapper = shallow(
      <Order {...props} isVan substep={subSteps.PENDING_NO_PAID} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (pending paid case)', () => {
    const wrapper = shallow(
      <Order {...props} substep={subSteps.PENDING_PAID} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (approved no paid case)', () => {
    const wrapper = shallow(
      <Order {...props} substep={subSteps.APPROVED_NO_PAID} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (approved paid case)', () => {
    const wrapper = shallow(
      <Order {...props} substep={subSteps.APPROVED_PAID} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (secci sent case)', () => {
    const wrapper = shallow(<Order {...props} substep={subSteps.SECCI_SENT} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <Order {...props} substep={subSteps.SECURE_VEHICLE} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
