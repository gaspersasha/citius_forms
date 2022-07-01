import React from 'react';

import { endpointPush } from '../../../utils';
import MileageForm from '../MileageForm';

const props = {
  payData: {},
  setData: jest.fn(),
  setNextStep: jest.fn(),
  urlParams: { productAdvertId: '' },
  deleteEmptyUrlParams: jest.fn(),
  scroll: jest.fn(),
  setIsLoading: jest.fn(),
};

const submitEvent = {
  preventDefault: jest.fn(),
};

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
  endpointPush: jest.fn(),
}));

endpointPush.mockResolvedValue();

describe('<MileageForm />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<MileageForm {...props} />);

  it('MileageForm snapshot', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('miles input responds to changes', () => {
    wrapper = getWrapper(mount);
    const miles = 'input[type="number"][name="miles"]';
    const event = { target: { value: 2000, name: 'miles' } };

    wrapper.find(miles).simulate('change', event);
    expect(wrapper.find(miles).props().value).toEqual(2000);
  });

  it('checkbox acceptPrivacy responds to changes', () => {
    wrapper = getWrapper(mount);
    const acceptPrivacy = 'input[type="checkbox"][name="acceptPrivacy"]';
    const event = { target: { checked: true, name: 'acceptPrivacy' } };

    wrapper.find(acceptPrivacy).simulate('change', event);
    expect(wrapper.find(acceptPrivacy).props().checked).toEqual(true);
  });

  it('checkbox acceptPrivacy set false value', () => {
    wrapper = getWrapper(mount);
    const acceptPrivacy = 'input[type="checkbox"][name="acceptPrivacy"]';
    const errorTerms = 'p[name="errorTerms"]';
    const event = { target: { checked: false, name: 'acceptPrivacy' } };

    wrapper.find(acceptPrivacy).simulate('change', event);
    wrapper.find('form').simulate('submit', submitEvent);
    expect(wrapper.find(errorTerms)).toHaveLength(1);
  });

  it('valid form can be submitted', async () => {
    wrapper = getWrapper(mount);
    const miles = 'input[type="number"][name="miles"]';
    const eventMiles = { target: { value: 2000, name: 'miles' } };

    const plate = 'input[type="text"][name="plate"]';
    const eventPlate = { target: { value: 'AB12CDE', name: 'plate' } };

    const acceptPrivacy = 'input[type="checkbox"][name="acceptPrivacy"]';
    const eventAccept = { target: { checked: true, name: 'acceptPrivacy' } };

    const condition = 'select[name="condition"]';
    const eventCondition = { target: { value: 'good', name: 'condition' } };

    const serviceHistory = 'select[name="serviceHistory"]';
    const eventHistory = { target: { value: 'part', name: 'serviceHistory' } };

    wrapper.find(plate).simulate('change', eventPlate);
    wrapper.find(miles).simulate('change', eventMiles);
    wrapper.find(condition).simulate('change', eventCondition);
    wrapper.find(serviceHistory).simulate('change', eventHistory);
    wrapper.find(acceptPrivacy).simulate('change', eventAccept);
    wrapper.find('form').simulate('submit', submitEvent);
    expect(endpointPush).toHaveBeenCalledWith(
      'post',
      'submitPartEx',
      props.deleteEmptyUrlParams(props.urlParams),
      { ...props.payData, step: 3 }
    );
  });
});
