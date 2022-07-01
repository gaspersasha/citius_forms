import React from 'react';
import { getFormFieldsNames } from '~utils';
import { About } from '..';
import { composeDetailsState } from '../helpers';

const fields = composeDetailsState(global.mockData.details);

describe('<About />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(
      <About
        names={getFormFieldsNames(fields)}
        fields={fields}
        handleChange={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
