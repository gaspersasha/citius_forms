import React from 'react';
import PropTypes from 'prop-types';
import { Button, TapButtons } from '~components';
import s from './styles/details.module.sass';
import { PAYMENT_METHODS_OPTIONS } from './constants';

const PaymentMethodForm = ({ paymentMethod, handleChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <TapButtons
        label="How do you intend to purchase your car?"
        subTitle="Tell us if you’ll be buying your car outright or via finance after you pay your deposit"
        options={PAYMENT_METHODS_OPTIONS}
        value={paymentMethod}
        onChange={handleChange}
      />
      <div className="form-submit align-center">
        <Button type="submit" className={s.submitBtn} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </>
  );
};

PaymentMethodForm.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PaymentMethodForm;
