import React from 'react';
import { getFormFieldsNames } from '~utils';
import { Address } from '..';
import { composeDetailsState } from '../helpers';

const fields = composeDetailsState(global.mockData.details);

describe('<Address />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(
      <Address
        names={getFormFieldsNames(fields)}
        fields={fields}
        handleChange={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
