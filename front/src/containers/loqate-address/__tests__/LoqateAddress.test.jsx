import React from 'react';
import { INPUT_STATUS } from '~constants';
import { endpointFetch } from '~utils';
import LoqateAddress from '../LoqateAddress';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

const defaultProps = {
  selectHandler: jest.fn(),
  formName: '',
  manualFields: [
    {
      label: 'postCode label',
      name: 'postCode',
      value: 'test postCode',
      status: INPUT_STATUS.VALID,
      validationType: '',
      onChange: jest.fn(),
    },
    {
      label: 'town label',
      name: 'town',
      value: 'test town',
      status: INPUT_STATUS.VALID,
      validationType: '',
      onChange: jest.fn(),
    },
    {
      label: 'street label',
      name: 'street',
      value: 'test street',
      status: INPUT_STATUS.INVALID,
      validationType: '',
      onChange: jest.fn(),
      warning: 'Warning',
    },
  ],
};

describe('<LoqateAddress />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<LoqateAddress {...defaultProps} {...props} />);

  it('renders without errors', async () => {
    endpointFetch.mockResolvedValueOnce(null);
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('unmounts without errors', () => {
    endpointFetch.mockResolvedValueOnce(null);
    wrapper = getWrapper();
    wrapper.unmount();
  });

  it('handles manual fields case (no response)', async () => {
    endpointFetch.mockResolvedValueOnce(null);
    wrapper = getWrapper();

    expect(wrapper.find('Spinner').exists()).toBe(true);

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper.find('Spinner').exists()).toBe(false);

    expect(wrapper.find('InputText').at(0).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[0])
    );
    expect(wrapper.find('InputText').at(1).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[1])
    );

    expect(wrapper.find('[data-id="manual-field-warn"]').text()).toEqual(
      defaultProps.manualFields[2].warning
    );

    delete defaultProps.manualFields[2].warning;

    expect(wrapper.find('InputText').at(2).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[2])
    );
  });

  it('handles manual fields case (response without items)', async () => {
    endpointFetch.mockResolvedValueOnce({});
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper.find('InputText').at(0).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[0])
    );
    expect(wrapper.find('InputText').at(1).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[1])
    );
    expect(wrapper.find('InputText').at(2).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[2])
    );
  });

  it('handles manual fields case (empty response)', async () => {
    endpointFetch.mockResolvedValueOnce({ Items: [] });
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper.find('InputText').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles manual fields case (api error)', async () => {
    endpointFetch.mockResolvedValueOnce({ Items: [{ Error: true }] });
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper.find('InputText').at(0).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[0])
    );
    expect(wrapper.find('InputText').at(1).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[1])
    );
    expect(wrapper.find('InputText').at(2).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[2])
    );
  });

  it('handles manual fields case (invalid items)', async () => {
    endpointFetch.mockResolvedValueOnce({ Items: [{ Error: false }] });
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    expect(wrapper.find('InputText').at(0).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[0])
    );
    expect(wrapper.find('InputText').at(1).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[1])
    );
    expect(wrapper.find('InputText').at(2).props()).toEqual(
      expect.objectContaining(defaultProps.manualFields[2])
    );
  });

  it('handles loqateHealthCheck call from Postcode', async () => {
    endpointFetch.mockResolvedValueOnce({ Items: [] });
    wrapper = getWrapper();

    await endpointFetch;
    await endpointFetch;
    wrapper.update();

    wrapper.find('Postcode').invoke('loqateHealthCheck')('Retrieve')();
    expect(wrapper.find('[className="form_input_warning"]').exists()).toBe(
      true
    );
  });
});
