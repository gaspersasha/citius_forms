import React from 'react';
import PropTypes from 'prop-types';
import { InputSelect } from '~components';
import { FORM } from '~constants';
import s from './address.module.sass';
import financeStyles from '../styles/finance.module.sass';

const { YEARS_AT, MONTHS_AT } = FORM;

const YearsStep = ({
  residenceYears,
  residenceMonths,
  handleResidenceYearsChange,
  isMonthDisabled,
  handleResidenceMonthsChange,
}) => (
  <div className={s.yearsFormWrapper}>
    <div className={s.yearsInputWrapper}>
      <InputSelect
        className={financeStyles.inputSelect}
        value={residenceYears.value}
        status={residenceYears.status}
        label="How many years have you lived at this address?"
        subTitle="Please select from the options below"
        required
        options={YEARS_AT}
        onChange={handleResidenceYearsChange}
        data-id="How many years have you lived at this address?"
      />
    </div>
    {residenceYears.value && !isMonthDisabled && (
      <InputSelect
        className={financeStyles.inputSelect}
        placeholder="-- Months lived at address --"
        value={
          residenceYears.value !== '0'
            ? residenceMonths.value
            : residenceMonths.value || '1'
        }
        label="How many months did you live at this address?"
        subTitle="Please select from the options below"
        status={residenceMonths.status}
        required
        options={residenceYears.value !== '0' ? MONTHS_AT : MONTHS_AT.slice(1)}
        onChange={handleResidenceMonthsChange}
        data-id="How many months did you live at this address?"
      />
    )}
  </div>
);

YearsStep.propTypes = {
  handleResidenceYearsChange: PropTypes.func.isRequired,
  handleResidenceMonthsChange: PropTypes.func.isRequired,
  residenceYears: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  residenceMonths: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  isMonthDisabled: PropTypes.bool.isRequired,
};

export default YearsStep;
