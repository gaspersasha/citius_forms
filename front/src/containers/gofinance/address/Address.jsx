import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button, InputCheckbox } from '~components';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  validate,
  prepare,
  simplify,
  isValid,
  findMaxSteps,
  scrollTo,
  checkNotEmpty,
  mergeDeep,
} from '~utils';
import { handleGTM, sendGTM } from '../helpers';
import { PostCodeStep, ResidentialStep, YearsStep } from '.';
import { getInitialState } from './innitialStateConfig';
import s from './address.module.sass';
import financeStyles from '../styles/finance.module.sass';

const nextButtonIDs = {
  HOME_ADDRESS: 'ssFinanceHomeAddressSubmit',
  RESEDENTIAL_STATUS: 'ssFinanceResedentialStatusSubmit',
  YEARS_AT_ADDRESS: 'ssFinanceYearsAtAddressSubmit',
};

const Address = ({
  onSubmit,
  sumOfYearsInPrevForms,
  step,
  index,
  address,
  vehicleKeptAtAddress,
  isDataSending,
}) => {
  const [state, setState] = useState(
    getInitialState(address, sumOfYearsInPrevForms, vehicleKeptAtAddress, index)
  );
  const [maxSteps, setMaxSteps] = useState(0);
  const isDataSendingInProgress = isDataSending && step === 2;

  useEffect(() => {
    setMaxSteps(findMaxSteps(state));
  }, []);

  useEffect(() => {
    if (!state.validAtStep) return;
    onSubmit(simplify(state), index, maxSteps);
  }, [state.validAtStep]);

  const handleResidentStatusChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      residentialStatus: {
        ...prev.residentialStatus,
        value,
      },
    }));
  };

  const handleResidenceYearsChange = ({ target: { value } }) => {
    const isMonthDisabled = state.sumOfYearsInPrevForms + Number(value) >= 3;

    // if years are set to 3, month are disabled and user could send previously selected value
    setState((prev) => ({
      ...prev,
      residenceMonths: {
        ...prev.residenceMonths,
        value: value === '3' ? '0' : prev.residenceMonths.value,
      },
      residenceYears: {
        ...prev.residenceYears,
        value,
      },
      isMonthDisabled,
    }));
  };

  const handleResidenceMonthsChange = ({ target: { value } }) => {
    setState((prev) => ({
      ...prev,
      residenceMonths: {
        ...prev.residenceMonths,
        value,
      },
    }));
  };

  const changeAddressField = ({ target: { name, value } }) =>
    setState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));

  const changePostcodeField = (e) => {
    const custom = {
      ...e,
      target: { name: e.target.name, value: e.target.value.toUpperCase() },
    };

    return changeAddressField(custom);
  };

  const selectAddressHandler = (items) => {
    // create signle object for all address fields, to update state in one go
    const freshAddress = Object.keys(items)
      .map((name) => ({
        [name]: {
          status: checkNotEmpty(items[name])
            ? INPUT_STATUS.VALID
            : INPUT_STATUS.DEFAULT,
          value: items[name],
          validationType: state[name].validationType || VALIDATION_TYPES.NONE,
          step,
        },
      }))
      .reduce((final, item) => ({ ...final, ...item }), {});

    if (!freshAddress.postCode.value) sendGTM('addressChange');

    setState({ ...state, ...freshAddress });
  };

  const handleConfirm = ({ target: { checked } }) =>
    setState((prev) => ({
      ...prev,
      vehicleKeptAtAddress: {
        ...prev.vehicleKeptAtAddress,
        status: checked ? 'default' : 'invalid',
        value: checked,
      },
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDataSendingInProgress) return;

    const updated = validate(prepare(state, step));
    const tryAgain = !isValid(updated);

    tryAgain && scrollTo('.error-input-label');

    if (step === 0) sendGTM('addressConfirm');
    handleGTM(updated, ['residentialStatus', 'residenceYears']);

    setState({
      ...state,
      ...updated,
      validAtStep: tryAgain ? state.validAtStep : state.validAtStep + 1,
    });
  };

  const getNextButtonID = () => {
    switch (step) {
      case 0:
        return nextButtonIDs.HOME_ADDRESS;
      case 1:
        return nextButtonIDs.RESEDENTIAL_STATUS;
      case 2:
        return nextButtonIDs.YEARS_AT_ADDRESS;
      default:
        return null;
    }
  };

  const buttonClasses = cn(
    { 'button-forward-loading': isDataSendingInProgress },
    `${financeStyles.confirm}`
  );

  const filtredState = {};

  useCallback(mergeDeep(filtredState, state));

  return (
    <div className={s.formSectionWrapper}>
      <div className={cn(financeStyles.formPreamble, s.addressPreamble)}>
        We need your&nbsp;
        <b>UK address</b>
        &nbsp;details for the past three years.
        <br />
        Add your address from the past 3 years below
      </div>
      {step === 0 && (
        <>
          <PostCodeStep
            changeAddressField={changeAddressField}
            changePostcodeField={changePostcodeField}
            selectAddressHandler={selectAddressHandler}
            postCode={state.postCode}
            houseName={state.houseName}
            houseNumber={state.houseNumber}
            street={state.street}
            district={state.district}
            town={state.town}
            county={state.county}
          />
          {!vehicleKeptAtAddress &&
            index === 0 &&
            state.vehicleKeptAtAddress.status === 'invalid' && (
              <div
                className={cn(
                  {
                    'warning-label-subtitle':
                      state.vehicleKeptAtAddress.status === 'invalid',
                  },
                  'label-sub-title'
                )}
              >
                You must tick this box to show that you will keep the vehicle at
                the registered address
              </div>
            )}
          {!vehicleKeptAtAddress && index === 0 && (
            <InputCheckbox
              name="I confirm the vehicle will be kept at this address"
              label="I confirm the vehicle will be kept at this address"
              checked={!!state.vehicleKeptAtAddress.value}
              onChange={handleConfirm}
              customClasses="inlineFlex"
              data-id="I confirm the vehicle will be kept at this address"
            />
          )}
        </>
      )}
      {step === 1 && (
        <ResidentialStep
          residentialStatus={state.residentialStatus}
          onChange={handleResidentStatusChange}
        />
      )}
      {step === 2 && (
        <YearsStep
          residenceYears={state.residenceYears}
          residenceMonths={state.residenceMonths}
          handleResidenceYearsChange={handleResidenceYearsChange}
          isMonthDisabled={state.isMonthDisabled}
          handleResidenceMonthsChange={handleResidenceMonthsChange}
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

Address.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  sumOfYearsInPrevForms: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  vehicleKeptAtAddress: PropTypes.bool,
  isDataSending: PropTypes.bool.isRequired,
  address: PropTypes.shape({
    postCode: PropTypes.string,
    houseName: PropTypes.string,
    houseNumber: PropTypes.string,
    street: PropTypes.string,
    district: PropTypes.string,
    town: PropTypes.string,
    county: PropTypes.string,
    buildingName: PropTypes.string,
    buildingNumber: PropTypes.string,
    residentialStatus: PropTypes.string,
    residenceYears: PropTypes.string,
    residenceMonths: PropTypes.string,
  }),
  index: PropTypes.number,
};

Address.defaultProps = {
  address: {
    postCode: '',
    houseName: '',
    houseNumber: '',
    street: '',
    district: '',
    town: '',
    county: '',
    buildingName: '',
    buildingNumber: '',
    residentialStatus: '',
    residenceYears: '',
    residenceMonths: '0',
  },
  vehicleKeptAtAddress: false,
  index: 0,
};

export default Address;
