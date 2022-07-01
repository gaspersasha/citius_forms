import React from 'react';
import { useRouter } from 'next/router';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import { endpointFetch, endpointPush } from '~utils';
import TermsInputs from '../TermsInputs';
import { DELIVERY_INFO, NEW_FINANCE_QUOTE } from '../constants';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  query: { productAdvertId: '3362300' },
}));

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
  endpointPush: jest.fn(),
}));

endpointFetch.mockResolvedValue({
  price: 100000,
});
endpointPush.mockResolvedValue(NEW_FINANCE_QUOTE);

const props = {
  fields: {
    deposit: {
      value: '10000',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    mileage: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    terms: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    finance: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    delivery: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    credit: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
  },
  handleChange: jest.fn(),
  deliveryOptions: DELIVERY_INFO,
  isLeadGen: false,
  disabledTrue: true,
  maxFinanceDeposit: 4000,
};

describe('<TermsInputs />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<TermsInputs {...props} />);

  it('rendered without errors', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('invalid value in InputNumber', () => {
    wrapper = getWrapper(mount);

    expect(wrapper.find('InputNumber').props().label).toEqual(
      'The maximum deposit is £4000'
    );
  });
});
