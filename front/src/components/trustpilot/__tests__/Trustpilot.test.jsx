import React from 'react';

import { generateScriptTag } from '~utils';
import Trustpilot from '../Trustpilot';

jest.mock('~utils', () => ({
  generateScriptTag: jest.fn(),
}));

describe('<Trustpilot />', () => {
  let wrapper;
  const options = {
    scriptPath:
      'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
    businessUnitId: '4bdcd9ad000064000505fa5a',
    accountLink: 'https://uk.trustpilot.com/review/website',
    locale: 'UA',
    isBigTemplate: false,
    styleHeight: '33%',
    styleWidth: '77%',
    theme: 'light',
    stars: '15',
  };

  beforeEach(() => {
    wrapper = mount(<Trustpilot options={options} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('rendered without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('generateScriptTag invoked', () => {
    expect(generateScriptTag).toBeCalled();

    global.Trustpilot = { loadFromElement: jest.fn() };
  });

  it('trustpilot render method invoked', () => {
    expect(global.Trustpilot.loadFromElement).toBeCalled();
  });
});
