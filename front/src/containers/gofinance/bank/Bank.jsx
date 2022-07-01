import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '~components';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  checkNotEmpty,
  stringLengthIsValid,
  prepare,
  validate,
  simplify,
  isValid,
  findMaxSteps,
  makeYearOptions,
  scrollTo,
} from '~utils';
import { handleGTM } from '../helpers';
import { AccountInfoStep, YearsAtBankStep } from '.';
import s from './bank.module.sass';
import financeStyles from '../styles/finance.module.sass';

const createDatesForBankList = (
  startDateOptionValue,
  endDateOptionsValue,
  dateTypeName
) =>
  Array(endDateOptionsValue - startDateOptionValue + 1)
    .fill()
    .map((item, index) => {
      const currentDateOptionValue = startDateOptionValue + index;

      return {
        option: `${currentDateOptionValue} ${dateTypeName}`,
        value: `${currentDateOptionValue}`,
      };
    });

const nextButtonIDs = {
  bankDetails1: 'ssFinanceBankDetails1Submit',
  bankDetails2: 'ssFinanceBankDetails2Submit',
};

const Bank = ({ bankDetails, onSubmit, step, isDataSending, leadgen }) => {
  const initialState = {
    accountNumber: {
      value: bankDetails.accountNumber || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.ACCOUNT_NUMBER,
      validLength: 8,
      step: 0,
    },
    sortCode: {
      value: bankDetails.sortCode || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.SORTCODE,
      validLength: 8,
      step: 0,
    },
    yearsAtBank: {
      value: bankDetails.yearsAtBank || '0',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 1,
    },
    monthAtBank: {
      value: bankDetails.monthAtBank || '0',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 1,
    },
    updatedAtStep: 0,
  };

  const [errors, setErrors] = useState({});
  const [state, setState] = useState(initialState);
  const maxSteps = findMaxSteps(state);
  const isDataSendingInProgress = isDataSending && step === 1;

  useEffect(() => {
    state.updatedAtStep && onSubmit(simplify(state), maxSteps);
  }, [state.updatedAtStep]);

  const dateValues = {
    yearsAtBankList: makeYearOptions(0, 4),
    monthAtBankList: createDatesForBankList(0, 11, 'Month(s)'),
  };

  const handleTimeAtBankChange = ({ target: { value, name } }) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  };

  const handleAccountInfoChange = ({ target: { value, name } }) => {
    if (value.length > state[name]?.validLength) return;
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  };

  const handleBlurAccountInfoChange = ({ target: { value, name } }) => {
    const status = checkNotEmpty(value)
      ? INPUT_STATUS.INVALID
      : INPUT_STATUS.DEFAULT;

    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        status: stringLengthIsValid(value, prev[name]?.validLength)
          ? INPUT_STATUS.VALID
          : status,
      },
    }));
  };

  const addErrorTo = (key, newError) =>
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: newError,
    }));

  const removeErrorForm = (key) =>
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: null, // or undefined
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (leadgen) {
      const accountNumber = state.accountNumber.value.length === 8;
      const sortCode = state.sortCode.value.length === 8;

      if (!accountNumber) {
        addErrorTo('accountNumber', 'invalid');
      } else {
        removeErrorForm('accountNumber');
      }

      if (!sortCode) {
        addErrorTo('sortCode', 'invalid');
      } else {
        removeErrorForm('sortCode');
      }

      if (accountNumber && sortCode) {
        if (isDataSendingInProgress) return;

        const updated = validate(prepare(state, step));
        const tryAgain = !isValid(updated);

        if (tryAgain) return scrollTo('.error-input-label');
        handleGTM(updated, ['accountNumber', 'yearsAtBank']);

        setState({
          ...state,
          ...updated,
          updatedAtStep: state.updatedAtStep + 1,
        });
      }

      return;
    }

    if (isDataSendingInProgress) return;

    const updated = validate(prepare(state, step));
    const tryAgain = !isValid(updated);

    if (tryAgain) return scrollTo('.error-input-label');
    handleGTM(updated, ['accountNumber', 'yearsAtBank']);

    setState({
      ...state,
      ...updated,
      updatedAtStep: state.updatedAtStep + 1,
    });
  };

  const isMonthDisabled = () => {
    const length = dateValues.yearsAtBankList.length - 1;

    return state.yearsAtBank.value === dateValues.yearsAtBankList[length].value;
  };

  const getNextButtonID = () => {
    switch (step) {
      case 0:
        return nextButtonIDs.bankDetails1;
      case 1:
        return nextButtonIDs.bankDetails2;
      default:
        return null;
    }
  };

  const buttonClasses = cn(
    { 'button-forward-loading': isDataSendingInProgress },
    `${financeStyles.confirm}`
  );

  return (
    <div className={s.formSectionWrapper}>
      <p
        className={cn(financeStyles.formPreamble, s.bankPreamble)}
        data-bind="bankDetailform"
      >
        Some <b>lenders require basic bank details</b>. Filling in the details
        below will get you a wider range of quotes
      </p>

      {step === 0 && (
        <AccountInfoStep
          onChange={handleAccountInfoChange}
          onBlur={handleBlurAccountInfoChange}
          accountNumber={state.accountNumber}
          sortCode={state.sortCode}
          errors={errors}
          removeErrorForm={removeErrorForm}
        />
      )}

      {step === 1 && (
        <YearsAtBankStep
          onChange={handleTimeAtBankChange}
          yearsAtBank={state.yearsAtBank}
          yearsAtBankOptions={dateValues.yearsAtBankList}
          monthAtBank={state.monthAtBank}
          monthAtBankOptions={dateValues.monthAtBankList}
          monthAtBankIsDisabled={isMonthDisabled()}
        />
      )}

      <Button
        onClick={handleSubmit}
        type="submit"
        className={buttonClasses}
        id={getNextButtonID()}
      >
        {isDataSendingInProgress ? 'Loading...' : 'Next'}
      </Button>
    </div>
  );
};

Bank.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isDataSending: PropTypes.bool.isRequired,
  bankDetails: PropTypes.shape({
    accountNumber: PropTypes.string,
    sortCode: PropTypes.string,
    yearsAtBank: PropTypes.string,
    monthAtBank: PropTypes.string,
  }),
  leadgen: PropTypes.bool.isRequired,
};

Bank.defaultProps = {
  bankDetails: {
    accountNumber: '',
    sortCode: '',
    yearsAtBank: '0',
    monthAtBank: '0',
  },
};

export default Bank;
