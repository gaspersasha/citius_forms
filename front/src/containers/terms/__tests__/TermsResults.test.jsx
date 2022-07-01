import React from 'react';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import TermsResults from '../TermsResults';
import { NEW_FINANCE_QUOTE } from '../constants';

const props = {
  fields: {
    deposit: {
      value: '',
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
  disabledForm: jest.fn(),
  handleChange: jest.fn(),
  showModal: jest.fn(),
  quotes: { ...NEW_FINANCE_QUOTE },
  apiError: '',
};

describe('<TermsResults />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<TermsResults {...props} />);

  it('rendered without errors', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('button onClick responds to changes', () => {
    wrapper = getWrapper(mount);
    const PCP = '[id="PCP"]';
    const HirePurchase = '[id="Hire Purchase"]';

    wrapper.find(PCP).at(1).simulate('click');
    wrapper.find(HirePurchase).at(1).simulate('click');
  });

  it('onClick', () => {
    const getChild = () => wrapper.find('button');

    getChild().at(1).invoke('onClick')('PCP');
    expect(props.showModal).toBeCalled();
  });
});
