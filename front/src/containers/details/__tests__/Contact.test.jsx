import React from 'react';
import { getFormFieldsNames } from '~utils';
import { Contact } from '..';
import { composeDetailsState } from '../helpers';

const fields = composeDetailsState(global.mockData.details);

describe('<Contact />', () => {
  it('renders without errors', () => {
    const wrapper = shallow(
      <Contact
        names={getFormFieldsNames(fields)}
        fields={fields}
        handleChange={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
