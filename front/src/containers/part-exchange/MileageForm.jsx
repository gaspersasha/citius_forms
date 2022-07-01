import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputText,
  InputNumber,
  Button,
  InputCheckbox,
  InputSelect,
} from '~components';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  endpointPush,
  validate,
  prepare,
  scrollTo,
  isValid,
  GTM_EVENT,
} from '~utils';
import { CAR_CONDITION_OPTIONS, SERVICE_HISTORY_OPTIONS } from './constants';
import s from './styles/part-exchange.module.sass';

const MileageForm = ({
  setData,
  payData,
  setNextStep,
  urlParams,
  scroll,
  deleteEmptyUrlParams,
  setIsLoading,
}) => {
  const [state, setState] = useState({
    miles: {
      value: payData.mileage,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NUMBER,
    },
    plate: {
      value: payData.registration,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    acceptPrivacy: {
      value: payData.acceptPrivacy,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.CHECKBOX,
    },
    condition: {
      value: payData.condition,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    serviceHistory: {
      value: payData.serviceHistory,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
  });

  useEffect(() => {
    setData({
      mileage: parseInt(state.miles.value, 10),
      acceptPrivacy: state.acceptPrivacy.value,
      condition: state.condition.value,
      serviceHistory: state.serviceHistory.value,
    });
  }, [
    state.miles.value,
    state.acceptPrivacy.value,
    state.condition.value,
    state.serviceHistory.value,
  ]);

  const submitMileage = () => {
    setNextStep(1);
    setIsLoading(true);
    GTM_EVENT('ssPartExchangeMileage');

    endpointPush('post', 'submitPartEx', deleteEmptyUrlParams(urlParams), {
      ...payData,
      step: 3,
    })
      .then((data) => {
        GTM_EVENT('ssPartExchangeCompleted');

        setData({ ...data, step: 2 });
        scroll();
        setIsLoading(false);
      })
      .catch(console.log);
  };

  const handleChange = ({ target: { name, value, checked } }) => {
    if (name === 'acceptPrivacy') {
      return setState({
        ...state,
        acceptPrivacy: {
          ...state.acceptPrivacy,
          value: checked,
        },
      });
    }

    setState({
      ...state,
      [name]: {
        ...state[name],
        value,
        status: INPUT_STATUS.DEFAULT,
      },
    });
  };

  const errorBorder = 'error-input-border';

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedState = validate(prepare(state));

    setState(validatedState);
    const tryAgain = !isValid(validatedState);

    if (tryAgain) return scrollTo(`.${errorBorder}`);

    submitMileage();
  };

  const disabledInput = true;

  return (
    <form onSubmit={handleSubmit}>
      <h5 className={s.heading}>Add part exchange?</h5>
      <h5 className={s.description}>
        Enter your reg below to get your estimated part exchange price
      </h5>
      <div className={s.icon}>
        <InputText
          value={state.plate.value}
          status={state.plate.status}
          onChange={handleChange}
          label=""
          name="plate"
          placeholder="e.g. AB12CDE"
          disabled={disabledInput}
          className={s.milegeFormPlate}
        />
      </div>
      <div className={s.carInfo}>
        <h5 className={s.descriptionReg}>Your reg details </h5>
        <div className={s.regDetails}>
          <div className={s.row}>
            <span>Make and model:&nbsp;</span>
            <b>{`${payData.manufacturer} ${payData.model}`}</b>
          </div>
          <div className={s.row}>
            <span>Engine:&nbsp;</span>
            <b>{`${payData.engineSize} ${payData.fuel}`}</b>
          </div>
        </div>
      </div>
      <div className={s.formInput}>
        <InputNumber
          value={state.miles.value >= 0 && (state.miles.value || '')}
          status={state.miles.status}
          onChange={handleChange}
          name="miles"
          placeholder="e.g. 20,000"
          label="What is your mileage?"
        />
        <InputSelect
          name="condition"
          value={state.condition.value}
          status={state.condition.status}
          options={CAR_CONDITION_OPTIONS}
          onChange={handleChange}
          placeholder="Select"
          label="What is the condition of your car?"
        />
        <InputSelect
          name="serviceHistory"
          value={state.serviceHistory.value}
          status={state.serviceHistory.status}
          options={SERVICE_HISTORY_OPTIONS}
          onChange={handleChange}
          placeholder="Select"
          label="Do you have service history?"
        />
      </div>
      <h5>Our benefits</h5>
      <div className={s.benefits}>
        <div>
          <span className={s.tickGreen} />
          We Collect Your Car For&nbsp;
          <b>FREE</b>
        </div>
        <div>
          <span className={s.tickGreen} />
          No Fees
        </div>
        <div>
          <span className={s.tickGreen} />
          Immediate & Secure Payment
        </div>
      </div>
      <div className={s.valuationPrivacy}>
        <InputCheckbox
          checked={state.acceptPrivacy.value}
          status={state.acceptPrivacy.status}
          name="acceptPrivacy"
          onChange={handleChange}
          className={
            state.acceptPrivacy.status === INPUT_STATUS.INVALID
              ? errorBorder
              : undefined
          }
        />
        <p>
          Please tick to show you agree to us sending your information to the
          car buying group. You can see their
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.thecarbuyinggroup.co.uk/site/privacy"
          >
            Privacy Policy
          </a>
        </p>
      </div>
      {state.acceptPrivacy.status === INPUT_STATUS.INVALID && (
        <p className={s.warning} name="errorTerms">
          *Please accept the terms.
        </p>
      )}
      <div className={s.alignCenter}>
        <Button
          type="submit"
          name="partex__submit-btn"
          className="link--button-forward"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

MileageForm.propTypes = {
  setData: PropTypes.func.isRequired,
  payData: PropTypes.any.isRequired,
  setNextStep: PropTypes.func.isRequired,
  deleteEmptyUrlParams: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  scroll: PropTypes.func,
  urlParams: PropTypes.object.isRequired,
};

MileageForm.defaultProps = {
  scroll: PropTypes.func,
};

export default MileageForm;
