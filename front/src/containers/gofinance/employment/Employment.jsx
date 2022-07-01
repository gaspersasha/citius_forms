import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '~components';
import { INPUT_STATUS } from '~constants';
import {
  findMaxSteps,
  scrollTo,
  checkNotEmpty,
  checkSalary,
  checkNameStringAdvanced,
  prepare,
  validate,
  simplify,
  isValid,
  mergeDeep,
} from '~utils';
import { AddressStep, IncomeStep, JobStep, TypeStep, YearsStep } from '.';
import {
  initialEmploymentState,
  getUpdatedStateByType,
  getEmploymentStatus,
} from './innitialStateConfig';
import { handleGTM } from '../helpers';
import s from './employment.module.sass';
import financeStyles from '../styles/finance.module.sass';

const nextButtonIDs = {
  employmentType: 'ssFinanceEmploymentTypeSubmit',
  employer: 'ssFinanceEmployerSubmit',
  employmentAddress: 'ssFinanceEmploymentAddressSubmit',
  income: 'ssFinanceIncomeSubmit',
  employmentYear: 'ssFinanceEmploymentYearSubmit',
};

const Employment = ({
  index,
  employments,
  sumOfYearsInPrevForms,
  onSubmit,
  step,
  isDataSending,
}) => {
  const [state, setState] = useState(
    initialEmploymentState(sumOfYearsInPrevForms, employments)
  );
  const [maxSteps, setMaxSteps] = useState(0);
  // subform has different number of steps depending on employment type.
  const isUnemployed = state.employmentStatus === 'unemployed';
  const typeStep = step === 0;
  const jobStep = step === 1 && !isUnemployed;
  const addressStep = step === 2 && !isUnemployed;
  const incomeStep = step === 3 || (step === 1 && isUnemployed);
  const yearsStep = step === 4 || (step === 2 && isUnemployed);
  const isDataSendingInProgress = isDataSending && yearsStep;
  const buttonClasses = cn(
    { 'button-forward-loading': isDataSendingInProgress },
    `${financeStyles.confirm}`
  );

  useEffect(() => {
    setMaxSteps(findMaxSteps(state));
  }, [state.employmentType.value]);

  useEffect(() => {
    if (!state.validAtStep) return;
    onSubmit(simplify(state), index, maxSteps);
  }, [state.validAtStep]);

  const handleEmploymentTypeChange = ({ target: { value } }) => {
    const employmentStatus = getEmploymentStatus(value);
    // in case of "unemployed" status, state has prepopulated job and address properties
    const stateUpdatedByType = getUpdatedStateByType(employmentStatus);

    setState((prev) => ({
      ...prev,
      ...stateUpdatedByType,
      employmentStatus,
      employmentType: {
        ...prev.employmentType,
        value,
      },
    }));
  };

  const handleJobInfoChange = ({ target: { name, value } }) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        status: checkNameStringAdvanced(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.INVALID,
      },
    }));
  };

  const checkIncomeValue = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      annualSalary: {
        ...prev.annualSalary,
        status: checkSalary(value) ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID,
      },
    }));
  };

  const handleIncomeChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      annualSalary: {
        ...prev.annualSalary,
        value,
      },
    }));
  };

  const handleYearsChange = ({ target: { value } }) => {
    const isMonthDisabled = state.sumOfYearsInPrevForms + Number(value) >= 3;

    // if total years are 3 or more - month are disabled
    setState((prev) => ({
      ...prev,
      employmentYears: {
        ...prev.employmentYears,
        value,
        status: checkNotEmpty(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.INVALID,
      },
      employmentMonths: {
        ...prev.employmentMonths,
        value: isMonthDisabled ? '0' : prev.employmentMonths.value,
        isActive: !isMonthDisabled,
      },
    }));
  };

  const handleMonthsChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      employmentMonths: {
        ...prev.employmentMonths,
        value,
      },
    }));
  };

  const changeAddressField = ({ target: { name, value } }) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));
  };

  const changePostcodeField = (e) => {
    const custom = {
      ...e,
      target: { name: e.target.name, value: e.target.value.toUpperCase() },
    };

    return changeAddressField(custom);
  };

  const selectAddressHandler = (items) =>
    Object.keys(items).map((name) =>
      changeAddressField({ target: { name, value: items[name] } })
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDataSendingInProgress) return;

    const updated = validate(prepare(state, step));
    const tryAgain = !isValid(updated);

    tryAgain && scrollTo('.error-input-label');
    handleGTM(updated, [
      'employmentType',
      'employer',
      'postCode',
      'annualSalary',
      'employmentYears',
    ]);
    setState({
      ...state,
      ...updated,
      validAtStep: tryAgain ? state.validAtStep : state.validAtStep + 1,
    });
  };

  const filtredState = {};

  useCallback(mergeDeep(filtredState, state));

  const getNextButtonID = () => {
    switch (step) {
      case 0:
        return nextButtonIDs.employmentType;
      case 1:
        return nextButtonIDs.employer;
      case 2:
        return nextButtonIDs.employmentAddress;
      case 3:
        return nextButtonIDs.income;
      case 4:
        return nextButtonIDs.employmentYear;
      default:
        return null;
    }
  };

  return (
    <div className={s.formSectionWrapper}>
      <p className={cn(financeStyles.formPreamble, s.employmentPreamble)}>
        We also need your&nbsp;
        <b>employment</b>
        &nbsp;details for the past three years
      </p>
      {typeStep && (
        <TypeStep
          onChange={handleEmploymentTypeChange}
          employmentType={state.employmentType}
        />
      )}
      {jobStep && (
        <JobStep
          employmentStatus={state.employmentStatus}
          onJobInfoChange={handleJobInfoChange}
          employer={state.employer}
          jobTitle={state.jobTitle}
        />
      )}
      {addressStep && (
        <AddressStep
          address={{
            postCode: filtredState.postCode,
            buildingName: filtredState.buildingName,
            buildingNumber: filtredState.buildingNumber,
            street: filtredState.street,
            district: filtredState.district,
            town: filtredState.town,
            county: filtredState.county,
          }}
          selectHandler={selectAddressHandler}
          changePostcodeField={changePostcodeField}
          changeAddressField={changeAddressField}
        />
      )}
      {incomeStep && (
        <IncomeStep
          onChange={handleIncomeChange}
          onBlur={checkIncomeValue}
          annualSalary={state.annualSalary}
        />
      )}
      {yearsStep && (
        <YearsStep
          onYearsChange={handleYearsChange}
          onMonthsChange={handleMonthsChange}
          years={state.employmentYears}
          months={state.employmentMonths}
          employmentStatus={state.employmentStatus}
          employmentType={state.employmentType}
        />
      )}
      <Button
        type="submit"
        className={buttonClasses}
        onClick={handleSubmit}
        id={getNextButtonID()}
      >
        {isDataSendingInProgress ? 'Loading...' : 'Next'}
      </Button>
    </div>
  );
};

Employment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  sumOfYearsInPrevForms: PropTypes.number.isRequired,
  isDataSending: PropTypes.bool.isRequired,
  employments: PropTypes.shape({
    employmentType: PropTypes.string,
    employmentSector: PropTypes.string,
    employer: PropTypes.string,
    jobTitle: PropTypes.string,
    postCode: PropTypes.string,
    buildingName: PropTypes.string,
    building: PropTypes.string,
    street: PropTypes.string,
    district: PropTypes.string,
    town: PropTypes.string,
    county: PropTypes.string,
    annualSalary: PropTypes.string,
    employmentYears: PropTypes.string,
    employmentMonths: PropTypes.string,
    grossAnnualIncome: PropTypes.string,
  }),
  index: PropTypes.number,
};

Employment.defaultProps = {
  employments: {
    employmentType: '',
    employmentSector: '',
    employer: '',
    jobTitle: '',
    postCode: '',
    buildingName: '',
    building: '',
    street: '',
    district: '',
    town: '',
    county: '',
    annualSalary: '',
    employmentYears: '0',
    employmentMonths: '0',
    grossAnnualIncome: '',
  },
  index: 0,
};

export default Employment;
