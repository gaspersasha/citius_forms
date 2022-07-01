import React from 'react';
import OrdersList from '../OrdersList';

const props = {
  orders: {
    orderSectionType: 'financialSummary',
    orderList: [
      {
        documentId: '3',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/1988',
      },
      {
        documentId: '4',
        accountId: '42114',
        status: 'Sent to recipient',
        amount: 199,
        type: 'DEBIT',
        created: '22/05/1988',
      },
    ],
  },
};

describe('<OrdersList />', () => {
  it('renders without errors', () => {
    const wrapper = mount(<OrdersList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
