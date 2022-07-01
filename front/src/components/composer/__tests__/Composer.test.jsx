import React from 'react';
import Composer from '../Composer';

describe('<Composer />', () => {
  const First = (props) => <div {...props} />;
  const Second = (props) => <div {...props} />;

  const props = {
    children: <div>children</div>,
    components: [First, Second],
  };

  it('renders without errors', () => {
    const wrapper = shallow(<Composer {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
