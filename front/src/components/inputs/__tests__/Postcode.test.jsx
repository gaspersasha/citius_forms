import React from 'react';
import { act } from 'react-dom/test-utils';
import { INPUT_STATUS } from '~constants';
import { endpointFetch } from '~utils';
import { InputPostcode } from '..';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue({
  Addresses: ['test'],
});

const defaultProps = {
  onChange: jest.fn(),
};

// TODO: REWRITE CASES, SINCE COMPONENT IS STATELESS
describe('<InputPostcode />', () => {
  let wrapper;
  const validPostcode = 'L1 8JQ';

  const getWrapper = (props) =>
    mount(<InputPostcode {...defaultProps} {...props} />);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('unmount without errors', () => {
    wrapper = getWrapper();
    wrapper.unmount();
  });

  it('handles change event', () => {
    wrapper = getWrapper();
    wrapper.find('input[type="text"]').simulate('change');
    expect(wrapper.find('button').prop('disabled')).toBe(true);

    wrapper.setProps({ value: validPostcode });
    wrapper.find('input[type="text"]').simulate('change');

    expect(wrapper.find('button').prop('disabled')).toBe(false);
    expect(wrapper.find('[data-id="postcode-addresses"]').exists()).toBe(false);
    expect(defaultProps.onChange).toBeCalled();
  });

  it('handles blur event', () => {
    wrapper = getWrapper();

    const input = wrapper.find('input[type="text"]');

    input.simulate('blur', { target: { value: '' } });
    expect(wrapper.find('[data-id="with-error"]').exists()).toBe(false);

    input.simulate('blur', { target: { value: 'wrong' } });
    expect(wrapper.find('[data-id="with-error"]').exists()).toBe(true);

    input.simulate('blur', { target: { value: 'L1 8JQ' } });
    expect(wrapper.find('[data-id="with-error"]').exists()).toBe(false);
  });

  it('handles find address flow', async () => {
    wrapper = getWrapper({ value: INPUT_STATUS.INVALID });

    wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
    expect(wrapper.find('[data-id="with-error"]').exists()).toBe(true);

    wrapper.setProps({ value: validPostcode });
    await act(async () =>
      wrapper.find('button').simulate('click', { preventDefault: jest.fn() })
    );

    await endpointFetch;
    wrapper.update();

    expect(endpointFetch).toBeCalledWith(
      'findUKAddressByPostcode',
      { postcode: validPostcode },
      {},
      false
    );

    const addressesList = wrapper.find('[data-id="postcode-addresses"]');

    expect(addressesList.exists()).toBe(true);
    expect(addressesList.childAt(0).html()).toEqual('<li>test</li>');
  });

  // temporary skipped, invalid case
  it.skip('handles address normalization', () => {
    const mockOnChange = jest.fn();
    const event = {
      target: {
        tagName: 'LI',
        dataset: { address: 'test', index: 0 },
      },
    };

    wrapper = getWrapper({
      onChange: mockOnChange,
    });

    wrapper.setState({
      addresses: [
        ['test0', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6'],
      ],
    });
    wrapper.instance().handleDropdown(event);

    expect(mockOnChange).toBeCalledWith({
      county: 'test6',
      district: 'test4',
      houseName: 'test0, test1, test2',
      houseNumber: '',
      street: 'test3',
      town: 'test5',
    });
    expect(wrapper.state('addresses')).toEqual([]);
  });
});
