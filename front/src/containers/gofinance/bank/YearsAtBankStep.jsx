import React from 'react';
import PropTypes from 'prop-types';
import { InputSelect } from '~components';
import s from './bank.module.sass';
import financeStyles from '../styles/finance.module.sass';

const YearsAtBankStep = ({
  onChange,
  yearsAtBank,
  yearsAtBankOptions,
  monthAtBank,
  monthAtBankOptions,
  monthAtBankIsDisabled,
}) => (
  <div className={s.yearsFormWrapper}>
    <div className={s.yearsInputWrapper}>
      <InputSelect
        className={financeStyles.inputSelect}
        label="How many years have you been a member of this bank?"
        subTitle="Please provide how many years you have had an account with this bank"
        value={yearsAtBank.value}
        status={yearsAtBank.status}
        options={yearsAtBankOptions}
        onChange={onChange}
        data-id="How many years have you been a member of this bank?"
        name="yearsAtBank"
      />
    </div>
    <div>
      <InputSelect
        className={financeStyles.inputSelect}
        disabled={monthAtBankIsDisabled}
        label="How many months have you been a member of this bank?"
        subTitle="Please provide how many months you have had an account with this bank"
        status={monthAtBank.status}
        value={monthAtBank.value}
        placeholder="-- Months at bank --"
        options={monthAtBankOptions}
        onChange={onChange}
        data-id="How many months have you been a member of this bank?"
        name="monthAtBank"
      />
    </div>
  </div>
);

YearsAtBankStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  yearsAtBank: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  yearsAtBankOptions: PropTypes.array.isRequired,
  monthAtBank: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  monthAtBankOptions: PropTypes.array.isRequired,
  monthAtBankIsDisabled: PropTypes.bool.isRequired,
};

export default YearsAtBankStep;
