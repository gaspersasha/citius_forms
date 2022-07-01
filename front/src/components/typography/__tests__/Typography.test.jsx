import React from 'react';
import Typography from '../Typography';

describe('<Typography />', () => {
  let wrapper;

  it('rendered without errors', () => {
    wrapper = shallow(<Typography>Test</Typography>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with basic parameters', () => {
    wrapper = shallow(<Typography>Test</Typography>);

    expect(wrapper.find('p').text()).toBe('Test');
    expect(wrapper.find('p').prop('className')).toEqual(
      'typographyComponent txt-dark txt-left'
    );
  });

  it('renders provided element type', () => {
    wrapper = shallow(<Typography type="h1">Test</Typography>);
    expect(wrapper.find('h1').exists()).toBe(true);
  });

  it('passes provided className', () => {
    wrapper = shallow(<Typography className="test">Test</Typography>);

    expect(wrapper.find('p').prop('className')).toEqual(
      'typographyComponent txt-dark txt-left test'
    );
  });

  it('changes color & align selectors', () => {
    wrapper = shallow(
      <Typography align="right" color="black">
        Test
      </Typography>
    );

    expect(wrapper.find('p').prop('className')).toEqual(
      'typographyComponent txt-black txt-right'
    );
  });
});
