import React from 'react';
import { act } from 'react-dom/test-utils';
import { endpointFetch } from '~utils';
import PartExchange from '../PartExchange';

jest.mock('~utils', () => ({
  ...jest.requireActual('../../../utils'),
  endpointFetch: jest.fn(),
}));

endpointFetch.mockResolvedValue(global.mockData.myPartex);

const props = {
  cms: {},
};

describe('<PartExchange />', () => {
  let wrapper;
  const getWrapper = (method = shallow) => method(<PartExchange {...props} />);

  it('rendered without errors', async () => {
    wrapper = getWrapper(mount);
    await act(async () => expect(wrapper).toMatchSnapshot());
  });
});
