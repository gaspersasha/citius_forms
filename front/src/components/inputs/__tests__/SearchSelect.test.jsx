import React from 'react';
import SearchSelect from '../SearchSelect';

describe('<SearchSelect>', () => {
  it('basic render', () => {
    const wrapper = mount(
      <SearchSelect
        id="Fake"
        label="Fake"
        name="Fake"
        required
        classNames={['Fake']}
        placeholder="Fake"
        value="Fake"
        onChange={() => {}}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
