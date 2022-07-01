import React from 'react';
import { getFormFieldsNames } from '~utils';
import { Additional } from '..';
import { composeDetailsState } from '../helpers';

const fields = composeDetailsState(global.mockData.details);

describe('<Additional />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(
      <Additional
        names={getFormFieldsNames(fields)}
        fields={fields}
        handleChange={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
