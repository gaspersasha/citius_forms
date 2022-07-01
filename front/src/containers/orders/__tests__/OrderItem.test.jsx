import React from 'react';
import OrderItem from '../OrderItem';

const props = {
  documentId: '3',
  accountId: '42114',
  status: 'Sent to recipient',
  amount: 199,
  type: 'DEBIT',
  created: '22/05/1988',
};

describe('<OrderItem />', () => {
  it('Render OrderItem component', () => {
    const wrapper = mount(<OrderItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
