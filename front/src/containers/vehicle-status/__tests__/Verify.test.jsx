import React from 'react';
import { Verify } from '..';
import { subSteps } from '../helpers';

const props = {
  typoProps: {
    title: { align: 'left', type: 'h3', className: '' },
    text: { align: 'left', type: 'p', className: '' },
  },
};

describe('<Verify />', () => {
  it('should match snapshot (get. requirements case)', () => {
    const wrapper = shallow(
      <Verify {...props} substep={subSteps.GETTING_REQUIREMENTS} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (link sent case)', () => {
    const wrapper = shallow(<Verify {...props} substep={subSteps.LINK_SENT} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (docs sent case)', () => {
    const wrapper = shallow(<Verify {...props} substep={subSteps.DOCS_SENT} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot (condition report case)', () => {
    const wrapper = shallow(
      <Verify {...props} substep={subSteps.CONDITION_REPORT} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
