import React from 'react';
import PropTypes from 'prop-types';
import { InputMaskText, InputNumber } from '~components';
import s from './bank.module.sass';

const AccountInfoStep = ({
  onChange,
  onBlur,
  accountNumber,
  sortCode,
  errors,
  removeErrorForm,
}) => (
  <div className={s.accountFormWrapper}>
    <div className={s.numberInputWrapper}>
      <InputNumber
        className={s.inputNumber}
        label="What is your account number?"
        name="accountNumber"
        subTitle="Your bank account number is 8 digits long and can usually be found on your debit card, cheque book or online banking service"
        status={!errors?.accountNumber ? accountNumber?.status : 'invalid'}
        onFocus={() => removeErrorForm('accountNumber')}
        value={accountNumber.value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
    <div>
      <InputMaskText
        className={s.inputMaskText}
        type="tel"
        mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        label="What is your Sort Code?"
        subTitle="Your bank sort code is 6 digits long and can usually be found next to your account number"
        name="sortCode"
        status={!errors?.sortCode ? sortCode?.status : 'invalid'}
        onFocus={() => removeErrorForm('sortCode')}
        placeholder="Sort Code"
        value={sortCode.value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  </div>
);

AccountInfoStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  accountNumber: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  sortCode: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    accountNumber: PropTypes.string,
    sortCode: PropTypes.string,
  }).isRequired,
  removeErrorForm: PropTypes.func.isRequired,
};

export default AccountInfoStep;
