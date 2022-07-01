import React from 'react';
import { getFormFieldsNames } from '~utils';
import { SignIn } from '..';
import { composeDetailsState } from '../helpers';

const fields = composeDetailsState(global.mockData.details);

describe('<SignIn />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(
      <SignIn
        names={getFormFieldsNames(fields)}
        fields={fields}
        handleChange={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
