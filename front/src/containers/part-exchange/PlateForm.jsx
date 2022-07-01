import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { InputText, Button } from '~components';
import { INPUT_STATUS } from '~constants';
import {
  checkNotEmpty,
  checkUKPlate,
  endpointFetch,
  makeQueryString,
  GTM_EVENT,
} from '~utils';
import s from './styles/part-exchange.module.sass';

const PlateForm = ({
  setData,
  payData,
  setNextStep,
  urlParams,
  leadgen,
  scroll,
  deleteEmptyUrlParams,
  setIsLoading,
}) => {
  const [state, setState] = useState({
    value: payData.registration,
    status: INPUT_STATUS.DEFAULT,
  });

  const router = useRouter();

  useEffect(() => {
    setData({ registration: state.value });
  }, [state.value]);

  const submitRegistration = () => {
    setNextStep(0);
    setIsLoading(true);

    endpointFetch('checkPlatePartEx', {
      ...deleteEmptyUrlParams(urlParams),
      ...payData,
    })
      .then((data) => {
        setData({ ...data, step: 1 });
        scroll();
        setIsLoading(false);

        GTM_EVENT('ssAddPartExchange');
      })
      .catch(console.log);
  };

  const handleChange = ({ target: { value } }) => {
    if (value.length < 10) setState({ ...state, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = state;

    if (!value || !checkNotEmpty(value) || !checkUKPlate(value)) {
      return setState({ ...state, status: INPUT_STATUS.INVALID });
    }

    setState({ ...state, status: INPUT_STATUS.DEFAULT });
    submitRegistration();
  };

  const handleSkip = (e) => {
    e.preventDefault();

    GTM_EVENT('ssPartExchangeSkipped');

    const url = makeQueryString('terms', {
      quoteId: router.query.quoteId || '',
      quoteItemId: router.query.quoteItemId || '',
      productAdvertId: router.query.productAdvertId || '',
      leadgen,
    });

    router.push(url);
  };

  return (
    <form data-id="plate-form" onSubmit={handleSubmit}>
      <h5 className={s.heading}>Add part exchange?</h5>
      <h5 className={s.description}>
        Enter your reg below to get your estimated part exchange price
      </h5>
      {state.status === INPUT_STATUS.INVALID && (
        <div className={s.errorText}>*Please enter valid UK plate number</div>
      )}
      <div className={s.plate}>
        <InputText
          value={state.value}
          status={state.status}
          onChange={handleChange}
          label=""
          name="plate"
          placeholder="e.g. AB12CDE"
        />
      </div>
      <p className={s.infoBox}>
        By using this service, you agree that your vehicle registration details
        will be passed to a third party, in order to look up the vehicle
        details.
      </p>
      <div className={s.alignCenter}>
        <Button type="submit" name="partex__submit-btn">
          Next
        </Button>
        <span
          className={s.skipPX}
          onClick={handleSkip}
          role="button"
          tabIndex={0}
        >
          Skip part exchange
        </span>
      </div>
    </form>
  );
};

PlateForm.propTypes = {
  urlParams: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  payData: PropTypes.any.isRequired,
  setNextStep: PropTypes.func.isRequired,
  deleteEmptyUrlParams: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  scroll: PropTypes.func,
  leadgen: PropTypes.string,
};

PlateForm.defaultProps = {
  scroll: PropTypes.func,
  leadgen: '0',
};

export default PlateForm;
