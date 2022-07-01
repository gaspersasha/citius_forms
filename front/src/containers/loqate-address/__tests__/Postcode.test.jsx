import React from 'react';
import { INPUT_STATUS } from '~constants';
import { endpointFetch } from '~utils';
import Postcode, { defaultSelectedAddress } from '../Postcode';

/* eslint-disable */
export const loqateAPIFind = {
  Items: [
    {
      Id: 'GB|RM|B|7762190',
      Type: 'Address',
      Text: '30 Lea Street',
      Highlight: '0-2,3-6,7-13',
      Description: 'Kidderminster, DY10 1SW',
    },
    {
      Id: 'GB|RM|ENG|0AF-LE3',
      Type: 'Postcode',
      Text: 'LE3 0AF',
      Highlight: '0-3,4-5',
      Description: 'Bruce Street, Leicester - 32 Addresses',
    },
  ],
};

export const loqateAPISelect = {
  Items: [
    {
      Id: 'GB|RM|A|26731424',
      DomesticId: '26731424',
      Language: 'ENG',
      LanguageAlternatives: 'ENG',
      Department: '',
      Company: '',
      SubBuilding: '',
      BuildingNumber: '',
      BuildingName: '26A',
      SecondaryStreet: '',
      Street: 'Bromwich Road',
      Block: '',
      Neighbourhood: '',
      District: '',
      City: 'Worcester',
      Line1: '26A Bromwich Road',
      AdminAreaName: 'Worcestershire',
      AdminAreaCode: '',
      Province: 'Worcestershire',
      ProvinceName: 'Worcestershire',
      ProvinceCode: '',
      PostalCode: 'WR2 4AA',
      CountryName: 'United Kingdom',
      CountryIso2: 'GB',
      CountryIso3: 'GBR',
      CountryIsoNumber: '826',
      SortingNumber1: '94141',
      SortingNumber2: '',
      Barcode: '(WR24AA2B9)',
      POBoxNumber: '',
      Label: '26A Bromwich Road\nWORCESTER\nWR2 4AA\nUNITED KINGDOM',
      Type: 'Residential',
      DataLevel: 'Premise',
    },
  ],
};
/* eslint-enable */

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
  debounce: (fn) => fn,
}));

const selectedAddress = {
  postCode: 'test postCode',
  street: 'test street',
  town: 'test town',
};

const defaultProps = {
  selectHandler: jest.fn(),
  loqateHealthCheck: jest.fn(),
  styleType: '',
  formName: '',
  statuses: {
    postCode: INPUT_STATUS.DEFAULT,
    street: INPUT_STATUS.DEFAULT,
    town: INPUT_STATUS.DEFAULT,
  },
};

describe('<Postcode />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<Postcode {...defaultProps} {...props} />);

  it('renders without errors (address selected)', () => {
    wrapper = getWrapper({ selectedAddress });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without errors (address not selected)', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles addresses list case', async () => {
    endpointFetch.mockResolvedValue(loqateAPIFind);
    wrapper = getWrapper();

    wrapper.find('InputText').invoke('onChange')({ target: { value: '' } });
    expect(wrapper.find('[data-id="loqate-results"]').exists()).toBe(false);

    wrapper.find('InputText').invoke('onChange')({ target: { value: 'test' } });
    expect(wrapper.find('[data-id="loader"]').exists()).toBe(true);

    await endpointFetch;
    expect(defaultProps.loqateHealthCheck).toBeCalledWith('Find');

    await endpointFetch;

    expect(wrapper.find('[data-id="loader"]').exists()).toBe(false);
    expect(wrapper.find('[data-id="loqate-results"]').exists()).toBe(true);

    wrapper.find('InputText').invoke('onClick')();
  });

  // it('handles address details flow', async () => {
  //   endpointFetch.mockResolvedValueOnce(loqateAPISelect);
  //   wrapper = getWrapper();
  //   wrapper.setState({ listItems: loqateAPIFind.Items });

  //   wrapper.find('[data-id="loqate-result-0"]').simulate('click');
  //   expect(wrapper.find('[data-id="loader"]').exists()).toBe(true);

  //   await endpointFetch;
  //   expect(defaultProps.loqateHealthCheck).toBeCalledWith('Retrieve');

  //   await endpointFetch;

  //   expect(wrapper.find('[data-id="loader"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-id="loqate-results"]').exists()).toBe(false);
  //   expect(defaultProps.selectHandler).toBeCalledWith({
  //     district: '',
  //     houseName: '26A',
  //     houseNumber: '',
  //     postCode: 'WR2 4AA',
  //     street: 'Bromwich Road',
  //     town: 'Worcester',
  //   });
  // });

  it('handles address selected case', async () => {
    wrapper = getWrapper({ selectedAddress });
    wrapper.find('CustomLink').simulate('click');

    expect(defaultProps.selectHandler).toBeCalledWith(defaultSelectedAddress);
  });

  // TODO: other cases
});
