import React from 'react';
import PropTypes from 'prop-types';
import { OrderItem } from '.';
import { ORDER_SECTION_TYPE } from './constants';
import s from './styles/orders-list.module.sass';

const OrdersList = ({ orders: { orderSectionType, orderList } }) => (
  <div className={s.ordersList}>
    <h1 className={s.title}>{ORDER_SECTION_TYPE[orderSectionType].title}</h1>
    <div className={s.subtitle}>
      {ORDER_SECTION_TYPE[orderSectionType].subtitle}
    </div>
    {orderList.map((paymentItemData) => (
      <OrderItem {...paymentItemData} key={paymentItemData.documentId} />
    ))}
  </div>
);

OrdersList.propTypes = {
  orderSectionType: PropTypes.string,
  orderList: [
    {
      accountId: PropTypes.string.isRequired,
      amount: PropTypes.number,
      created: PropTypes.string,
      documentId: PropTypes.string,
      status: PropTypes.string,
      type: PropTypes.string,
    },
  ],
}.isRequired;

export default OrdersList;
