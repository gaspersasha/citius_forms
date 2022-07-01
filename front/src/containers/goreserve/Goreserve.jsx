import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { GA, GTM as GTM_EVENT } from '~services';
import { VehicleContextProvider, useUserContext } from '~contexts';
import { URL, FORM } from '~constants';
import { PrivacyNotice, ProgressBar, Parts, Seo, Spinner } from '~components';
import {
  endpointPush,
  endpointFetch,
  scrollTo,
  fillProgress,
  generateScriptTag,
  removeScriptTag,
} from '~utils';

import { GTM } from './gtm';
import {
  PaymentForm,
  AddressForm,
  UserDetailsForm,
  PaymentMethodForm,
} from '.';
import s from './styles/goreserve.module.sass';

let RERENDER_COUNTER = 0;
const { DEFAULT_DEPOSIT } = FORM;
const initialState = {
  unsubscribe: false,

  other: {
    depositAmount: DEFAULT_DEPOSIT,
    step: 1,
    clientId: '',
    quoteId: '',
    quoteItemId: '',
    userId: '',
    financeApplied: false,
  },

  // progress count: [[max steps, current step]]
  formsProgress: [
    [2, 0],
    [1, 0],
    [1, 0],
    [1, 0],
  ],
};

const Goreserve = ({ cms }) => {
  RERENDER_COUNTER += 1;
  const router = useRouter();
  const { query } = router;
  // query be like: quoteId=801742&quoteItemId=881346&productAdvertId=3091697
  // or: productAdvertId=3093803&financeQuoteId=9758324

  const initialUrlParams = {
    productAdvertId: query.productAdvertId || '',
    quoteId: query.quoteId || '',
    quoteItemId: query.quoteItemId || '',
    currentUserId: '',
  };

  const { user } = useUserContext();

  // Data for the reservation
  const [formsProgress, setFormsProgress] = useState(
    initialState.formsProgress
  );
  const [urlParams, setURLParams] = useState(initialUrlParams);
  const [carParams, setCarParams] = useState({});

  const [address, setAddress] = useState({});
  const [details, setDetails] = useState({});
  const [other, setOther] = useState({
    ...initialState.other,
    productAdvertId: query.productAdvertId || '',
  });
  const [isPayPal, setIsPayPal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Helpers for the reservation
  const [, setError] = useState('');
  const [unsubscribe, setUnsubscribe] = useState(false);

  const generatePayPalScript = () => {
    endpointFetch('getPayPalClientId')
      .then(({ clientId }) => {
        generateScriptTag(
          URL.getPayPalScriptUrl(clientId),
          'paypalScript',
          true,
          () => setIsPayPal(true)
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    // TODO: move this at start, cause there is no point in this form without vehicle ID
    if (!query.productAdvertId) return;

    generatePayPalScript();
    endpointFetch('carDetails', { productAdvertId: query.productAdvertId })
      .then((carData) => setCarParams(carData))
      .catch(() => console.log("Can't get info about car"));

    return () => removeScriptTag('paypalScript');
  }, [query]);

  useEffect(() => {
    // if (user.id < 0) return;
    if (user.isLoading) return;
    if (!user.isLoggedIn) return setLoading(false);

    const isUnsubscribe =
      user.subscribed !== undefined ? !user.subscribed : false;

    if (user.sccCompleted) GTM_EVENT.fire({ event: 'ssReserveYourCar' });

    setUnsubscribe(isUnsubscribe);
    endpointFetch('reserveApiStart', { ...query, currentUserId: user.id })
      .then(({ address: add, details: det, financeApplied, ...rest }) => {
        setAddress(add);
        setDetails(det);
        setPaymentMethod(financeApplied ? 'finance' : 'cash');
        setOther({ financeApplied, ...rest });

        if (user.sccCompleted && add && det) {
          setFormsProgress([
            [2, 2],
            [1, 1],
            [1, 1],
            [1, 0],
          ]);
        }
      })
      .catch(setError)
      .then(() => setLoading(false));
  }, [user]);

  const onUnsub = () => setUnsubscribe(!unsubscribe);

  const getCurrentStep = () =>
    formsProgress.findIndex(([max, curr]) => curr < max);
  const { getGAClientId } = GA;

  const back = () => {
    setFormsProgress((prevState) => {
      let stepCount = prevState.findIndex(([max, curr]) => curr < max);
      let substep = prevState[stepCount][1];

      if (substep === 0) stepCount -= 1;
      [, substep] = prevState[stepCount];

      // nowhere to go back
      if (stepCount === 0 && substep === 0) return { prevState };

      const updateStatuses = [...prevState];

      updateStatuses[stepCount][1] = substep - 1;

      return [...updateStatuses];
    });
  };

  const setNextStep = (index, max, nextStep) => {
    setFormsProgress((prevState) => {
      const updateStatuses = [...prevState];

      updateStatuses[index] = [max, nextStep];

      return [...updateStatuses];
    });
  };

  function StepState(index) {
    const [max, curr] = formsProgress[index];
    const nextStep = curr + 1;

    setNextStep(index, max, nextStep);

    return {
      nextStep,
      isFilled: nextStep === max,
    };
  }

  const errorHandler = (err) => {
    console.log(`Couldn't send step ${other.step} in reservation form`, err);
  };

  const scroll = () => {
    scrollTo('[data-bind="scrollTo"]');
    setLoading(false);
  };

  const sendData = (newData) => {
    const data = {
      address,
      details,
      ...urlParams,
      ...query,
      ...other,
      currentUserId: user.id,
      clientId: getGAClientId(),
      step: getCurrentStep() + 1, // react steps state counts from 0, server start count from 1
      unsubscribe,
      ...newData,
    };

    setLoading(true);

    return endpointPush('POST', 'reserveApiSend', {}, data);
  };

  function handleDetails(formData) {
    const { nextStep, isFilled } = new StepState(0);

    if (nextStep === 2 && !formData.isEmailChecked) {
      return false;
    }

    setDetails({
      ...details,
      ...formData,
    });

    if (!isFilled) return scroll();

    sendData({ details: { ...details, ...formData } })
      .then(({ address: add, details: det, ...rest }) => {
        if (!details.emailAddress) {
          GTM('register');
        }

        GTM('your-details-complete');
        setOther(rest);

        setURLParams({
          ...urlParams,
          quoteId: rest.quoteId,
        });
      })
      .catch(errorHandler)
      .then(scroll);
  }

  function handleAddress(formData) {
    const { isFilled } = new StepState(1);

    setAddress((prevState) => ({
      ...prevState,
      ...formData,
    }));

    if (!isFilled) return false;

    sendData({ address: formData })
      .then(() => {
        GTM('address-complete');
      })
      .catch(errorHandler)
      .then(scroll);
  }

  function handlePaymentMethod() {
    const { isFilled } = new StepState(2);

    if (!isFilled) return false;
    paymentMethod === 'cash' && GTM_EVENT.fire({ event: 'cashReservation' });
    paymentMethod === 'finance' &&
      GTM_EVENT.fire({ event: 'financeReservation' });

    sendData({ paymentMethod })
      .then(() => {
        GTM('cash-or-finance-complete');
      })
      .catch(errorHandler)
      .then(scroll);
  }

  const progress = fillProgress(formsProgress);

  const currentStep = getCurrentStep();
  const [, substep] = formsProgress[currentStep];

  if (isLoading) {
    return (
      <>
        <Seo meta={cms.meta} />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Seo meta={cms.meta} />
      <div className="form-container">
        <div data-bind="scrollTo" />
        {Boolean(progress) && (
          <div className={s.controls}>
            <div className="align-corner">
              <button onClick={back} className={s.back} type="button">
                Back
              </button>
              <span className={s.progress}>{`${progress}% Completed`}</span>
            </div>

            <ProgressBar progress={progress} />
            <VehicleContextProvider>
              <Parts part={3} step={getCurrentStep() + 1} />
            </VehicleContextProvider>
          </div>
        )}
        <div className="form">
          <>
            <div className={s.preamble}>
              Don&apos;t miss out. Secure your car now with a £
              {other.depositAmount || DEFAULT_DEPOSIT}
              &nbsp;deposit that&apos;s fully refundable until you commit to
              buy.
            </div>
            {currentStep === 0 && (
              <UserDetailsForm
                userDetails={details}
                onSubmit={() => handleDetails()}
                step={substep}
                isLoggedIn={Boolean(details.emailAddress)}
                key={`${RERENDER_COUNTER}_DETAILS`}
              />
            )}
            {currentStep === 1 && (
              <AddressForm
                {...address}
                onSubmit={() => handleAddress()}
                step={substep}
              />
            )}
            {currentStep === 2 && (
              <PaymentMethodForm
                onSubmit={() => handlePaymentMethod()}
                paymentMethod={paymentMethod}
                handleChange={({ target: { value } }) =>
                  setPaymentMethod(value)
                }
              />
            )}
            {currentStep === 3 && (
              <PaymentForm
                deposit={other.depositAmount || DEFAULT_DEPOSIT}
                payData={{ address, details, ...other }}
                carDetails={carParams}
                carParams={carParams}
                quoteId={other.quoteId}
                isPayPal={isPayPal}
                isLoading={isLoading}
              />
            )}
          </>
        </div>
        <PrivacyNotice onChange={onUnsub} unsubscribe={unsubscribe} />
      </div>
    </>
  );
};

Goreserve.propTypes = {
  cms: PropTypes.object.isRequired,
};

export default Goreserve;
