import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber, InputSelect } from '~components';
import {
  MILAGE_OPTIONS,
  MONTHS_OPTIONS,
  FINANCE_CREDIT_RATING_OPTIONS,
  DELIVERY_INFO,
} from './constants';
import s from './terms.module.sass';

const TermsInputs = ({
  fields,
  handleChange,
  isLeadGen,
  deliveryOptions,
  disabledTrue,
  maxFinanceDeposit,
}) => {
  const getFinanceDepositLabel = (deposit) => {
    if (fields.deposit.value > deposit) {
      return `The maximum deposit is £${deposit}`;
    }

    return 'Deposit amount';
  };

  const depositClassName =
    fields.deposit.value > maxFinanceDeposit
      ? s.financeContentError
      : s.financeContent;
  let optonsDelivery;

  if (!isLeadGen) {
    optonsDelivery =
      deliveryOptions.length > 0 ? deliveryOptions : DELIVERY_INFO;
  }

  return (
    <>
      <div className={depositClassName}>
        <InputNumber
          name="deposit"
          label={getFinanceDepositLabel(maxFinanceDeposit)}
          value={fields.deposit.value}
          status={fields.deposit.status}
          onChange={handleChange}
          className={s.depositInput}
          subTitle="The initial sum you'll have to pay"
          placeholder="e.g. 1,000"
        />
      </div>
      <InputSelect
        name="mileage"
        label="Annual mileage"
        options={MILAGE_OPTIONS}
        value={fields.mileage.value}
        status={fields.mileage.status}
        onChange={handleChange}
        className={s.mileageInput}
        subTitle="The average highest mileage you'll need"
        placeholder="e.g. 6,000 miles"
      />
      <InputSelect
        name="terms"
        label="Payment terms"
        options={MONTHS_OPTIONS}
        value={fields.terms.value}
        status={fields.terms.status}
        onChange={handleChange}
        className={s.termsInput}
        subTitle="The length of time you'll make payments for"
        placeholder="e.g. 24 months"
      />
      {!isLeadGen && (
        <InputSelect
          name="delivery"
          label="Delivery"
          options={optonsDelivery}
          value={fields.delivery.value}
          status={fields.delivery.status}
          onChange={handleChange}
          className={s.deliveryInput}
          placeholder="select"
        />
      )}
      <InputSelect
        name="credit"
        label="Credit rating"
        options={FINANCE_CREDIT_RATING_OPTIONS}
        value={fields.credit.value}
        status={fields.credit.status}
        onChange={handleChange}
        className={s.creditInput}
        placeholder="select"
        disabled={disabledTrue}
      />
    </>
  );
};

TermsInputs.propTypes = {
  disabledTrue: PropTypes.bool.isRequired,
  fields: PropTypes.any.isRequired,
  maxFinanceDeposit: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLeadGen: PropTypes.bool.isRequired,
  deliveryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default TermsInputs;
