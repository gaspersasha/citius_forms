import React from 'react';
import Button from '../Button';

describe('<Button />', () => {
  let wrapper;

  it('rendered without errors', () => {
    wrapper = shallow(<Button>Test</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default parameters', () => {
    wrapper = shallow(<Button>Test</Button>);

    expect(wrapper.find('button').prop('href')).toBe(null);
    expect(wrapper.find('button').prop('disabled')).toBe(false);
    expect(wrapper.find('button').prop('className')).toEqual(
      'buttonComponent primary'
    );
  });

  it('renders children properly', () => {
    wrapper = shallow(
      <Button>
        <span>Test</span>
      </Button>
    );

    expect(wrapper.find('button').children().html()).toEqual(
      '<span>Test</span>'
    );
  });

  it('passes className prop', () => {
    wrapper = shallow(<Button className="test">Test</Button>);
    expect(wrapper.find('button').prop('className')).toEqual(
      'buttonComponent primary test'
    );
  });

  it('disabled case', () => {
    const fn = jest.fn();

    wrapper = mount(
      <Button disabled onClick={fn}>
        Test
      </Button>
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(fn).not.toBeCalled();
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('handles provided events', () => {
    const fn = jest.fn();

    wrapper = mount(<Button onClick={fn}>Test</Button>);

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(fn).toBeCalled();
  });

  it('link component case', () => {
    wrapper = shallow(<Button href="/href">Test</Button>);
    expect(wrapper.find('a').prop('href')).toEqual('/href');
  });

  it.skip('changes appearance', () => {
    wrapper = shallow(
      <Button color="green" txtColor="pink" backgroundType="stroke">
        Test
      </Button>
    );

    expect(wrapper.find('button').prop('className')).toBe(
      'buttonComponent txt-pink shadow-green stroke-green'
    );
  });
});
