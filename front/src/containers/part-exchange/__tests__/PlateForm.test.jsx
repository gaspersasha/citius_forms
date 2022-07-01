import React from 'react';

import { endpointFetch } from '../../../utils';
import PlateForm from '../PlateForm';

const props = {
  payData: {},
  setData: jest.fn(),
  setNextStep: jest.fn(),
  urlParams: { productAdvertId: '' },
  productAdvertId: '',
  deleteEmptyUrlParams: jest.fn(),
  scroll: jest.fn(),
  leadgen: '0',
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

endpointFetch.mockResolvedValue();

describe('<PlateForm />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<PlateForm {...props} />);

  it('PlateForm snapshot', async () => {
    wrapper = getWrapper();
    await global.updateWrapper(wrapper);
    expect(wrapper).toMatchSnapshot();
  });

  it('plate input responds to changes', () => {
    wrapper = getWrapper(mount);
    const plate = 'input[type="text"][name="plate"]';
    const event = { target: { value: 'AB12CDE', name: 'plate' } };

    wrapper.find(plate).simulate('change', event);
    expect(wrapper.find(plate).props().value).toEqual('AB12CDE');
  });

  it('invalid plate input not responds to changes', () => {
    wrapper = getWrapper(mount);
    const plate = 'input[type="text"][name="plate"]';
    const event = { target: { value: 'AB12CDE213323', name: 'plate' } };

    wrapper.find(plate).simulate('change', event);
    expect(wrapper.find(plate).props().value).toEqual(undefined);
  });

  it('valid form can be submitted', async () => {
    wrapper = getWrapper(mount);
    await global.updateWrapper(wrapper);
    const plate = 'input[type="text"][name="plate"]';
    const event = { target: { value: 'AB12CDE', name: 'plate' } };

    wrapper.find(plate).simulate('change', event);
    wrapper.find('form').simulate('submit', submitEvent);
    expect(endpointFetch).toHaveBeenCalledWith('checkPlatePartEx', {
      ...props.deleteEmptyUrlParams(props.urlParams),
      ...props.payData,
    });
  });
});
