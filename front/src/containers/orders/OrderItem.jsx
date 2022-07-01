import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '~components';
import { IntlGBP } from '~utils';
import { OrderSummary } from '.';
import s from './styles/item.module.sass';
import { PAYMENT_TYPE } from './constants';

const OrderItem = ({
  accountId,
  documentId,
  status,
  amount,
  type,
  created,
  vehicle,
}) => {
  const carWithDetails = !!Object.keys(vehicle).length;

  const firstRowEl = () =>
    carWithDetails
      ? {
          title: 'Vehicle order',
          value: `${vehicle.regYear}, ${vehicle.mileage} miles`,
        }
      : {
          title: 'Payment for',
          value: accountId,
        };

  return (
    <div className={s.paymentItem}>
      <div className={s.generalInformation}>
        <div className={cn(s.nomination, s.column)}>
          <div className={s.paymentItemTitle}>{firstRowEl().title}</div>
          <div className={s.paymentItemValue}>{firstRowEl().value}</div>
        </div>
        <div className={cn(s.paidStatus, s.column)}>
          <div className={s.paymentItemTitle}>Status</div>
          <div className={s.paymentItemValue}>{status}</div>
        </div>
        {!carWithDetails && (
          <div className={cn(s.balance, s.column)}>
            <div className={s.paymentItemTitle}>Balance</div>
            <div className={s.paymentItemValue}>{IntlGBP.format(amount)}</div>
          </div>
        )}
        {type && (
          <div className={cn(s.type, s.column)}>
            <div className={s.paymentItemTitle}>Type</div>
            <div className={s.paymentItemValue}>{PAYMENT_TYPE[type]}</div>
          </div>
        )}
        <div className={cn(s.date, s.column)}>
          <div className={s.paymentItemTitle}>Date</div>
          <div className={s.paymentItemValue}>{created}</div>
        </div>
        <Button
          styleType="secondary"
          className={s.button}
          href={`../order/viewOrder.jhtml?orderId=${documentId}&accountId=${accountId}`}
        >
          View
        </Button>
      </div>
      {carWithDetails && (
        <div className={s.detailInformation}>
          <OrderSummary
            details={{
              ...vehicle,
              created,
              amount,
            }}
          />
        </div>
      )}
    </div>
  );
};

OrderItem.propTypes = {
  accountId: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
  amount: PropTypes.number,
  created: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  vehicle: PropTypes.object,
};

OrderItem.defaultProps = {
  amount: 0,
  created: 'no date',
  status: 'unknown',
  type: null,
  vehicle: {},
};

export default OrderItem;
