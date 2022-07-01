import React from 'react';
import PropTypes from 'prop-types';
import { InputSelect } from '~components';
import { FORM } from '~constants';
import { formatOption, getYearsAtJobLabel } from '../helpers';
import s from './employment.module.sass';
import financeStyles from '../styles/finance.module.sass';

const { YEARS_AT, MONTHS_AT } = FORM;

const YearsStep = ({
  onYearsChange,
  onMonthsChange,
  years,
  months,
  employmentType,
  employmentStatus,
}) => {
  const monthsLabel =
    employmentStatus === 'unemployed'
      ? `How many months you have spent as ${formatOption(
          employmentType.value
        ).toLowerCase()}?`
      : 'How many months have you been working at this address?';

  const monthsSubTitle =
    employmentStatus === 'unemployed'
      ? `Please provide how many months you have spent as ${formatOption(
          employmentType.value
        ).toLowerCase()}?`
      : 'Please select the amount of months you have spent at this job?';

  return (
    <div className={s.yearsFormWrapper}>
      <div className={s.yearsInputWrapper}>
        <InputSelect
          className={financeStyles.inputSelect}
          value={years.value}
          status={years.status}
          label={getYearsAtJobLabel(employmentStatus, employmentType.value)}
          subTitle="Please provide your employment information below"
          name="yearsAtJob"
          options={YEARS_AT}
          onChange={onYearsChange}
          required
          data-id={getYearsAtJobLabel(employmentStatus, employmentType.value)}
        />
      </div>

      {years.value && months.isActive && (
        <InputSelect
          className={financeStyles.inputSelect}
          value={months.value}
          status={months.status}
          data-id={monthsLabel}
          label={monthsLabel}
          name="monthsAtJob"
          subTitle={monthsSubTitle}
          placeholder="-- Months worked --"
          required
          options={years.value !== '0' ? MONTHS_AT : MONTHS_AT.slice(1)}
          onChange={onMonthsChange}
        />
      )}
    </div>
  );
};

YearsStep.propTypes = {
  onYearsChange: PropTypes.func.isRequired,
  onMonthsChange: PropTypes.func.isRequired,
  years: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  months: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
  employmentType: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
  employmentStatus: PropTypes.string.isRequired,
};

export default YearsStep;
