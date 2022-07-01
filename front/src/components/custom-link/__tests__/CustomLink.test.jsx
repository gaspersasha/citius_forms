import React from 'react';
import CustomLink from '../CustomLink';

describe('<CustomLink />', () => {
  let wrapper;

  const getWrapper = (props) =>
    shallow(<CustomLink {...props}>Test</CustomLink>);

  it('renders without errors', () => {
    wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles both link and block cases', () => {
    wrapper = getWrapper();
    expect(wrapper.html()).toEqual('<div class="">Test</div>');

    wrapper.setProps({ url: 'test' });
    expect(wrapper.html()).toEqual('<a href="test" class="">Test</a>');
  });

  it('defines className in accordance to the type prop', () => {
    wrapper = getWrapper({ type: 'button' });
    expect(wrapper.prop('className')).toEqual('btn');

    wrapper.setProps({ type: 'button-forward' });
    expect(wrapper.prop('className')).toEqual('button-forward');

    wrapper.setProps({ type: 'button-back' });
    expect(wrapper.prop('className')).toEqual('link--button-back');

    wrapper.setProps({ type: 'arrow-forward' });
    expect(wrapper.prop('className')).toEqual('link--arrow-forward');

    wrapper.setProps({ type: 'arrow-back' });
    expect(wrapper.prop('className')).toEqual('link--arrow-back');

    wrapper.setProps({ type: 'arrow-border-forward' });
    expect(wrapper.prop('className')).toEqual('link--arrow-border-forward');
  });
});
