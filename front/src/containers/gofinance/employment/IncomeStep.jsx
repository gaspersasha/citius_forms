import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from '~components';
import s from './employment.module.sass';

const IncomeStep = ({ onChange, onBlur, annualSalary }) => (
  <div className={s.incomeFormWrapper}>
    <InputNumber
      className={s.inputNumber}
      label="Annual income"
      name="salary"
      subTitle="Please enter your annual income before tax and including commission. This needs to be over £2,000 to continue"
      placeholder="per year"
      required
      value={annualSalary.value}
      status={annualSalary.status}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
);

IncomeStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  annualSalary: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default IncomeStep;
