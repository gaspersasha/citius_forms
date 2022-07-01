import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ProgressBar, Parts, PrivacyNotice, Spinner, Seo } from '~components';
import { fillProgress, scrollTo, endpointFetch } from '~utils';
import { useUserContext } from '~contexts';
import PlateForm from './PlateForm';
import MileageForm from './MileageForm';
import ResultScreen from './ResultScreen';

import s from './styles/part-exchange.module.sass';

const PartExchange = () => {
  const [state, setState] = useState({
    registration: '',
    manufacturer: '',
    model: '',
    colour: '',
    year: '',
    transmission: '',
    engineSize: '',
    fuel: '',
    mileage: '',
    acceptPrivacy: false,
    valuation: '',
    unsubscribe: false,
    condition: '',
    serviceHistory: '',
    step: 0,
  });
  const [formsProgress, setFormsProgress] = useState([
    [1, 0],
    [1, 0],
    [1, 0],
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    pathname,
    query: { productAdvertId, leadgen },
    back,
  } = useRouter();

  useEffect(() => {
    const userDetailsString = sessionStorage.getItem('userDetails');

    const userDetails = userDetailsString && JSON.parse(userDetailsString);

    if (userDetails) {
      sessionStorage.setItem(
        'userDetails',
        JSON.stringify({
          ...userDetails,
          prevRoute: pathname,
        })
      );
    }
  }, [pathname]);

  const { user } = useUserContext();

  const urlParams = { productAdvertId: productAdvertId || '' };

  const deleteEmptyUrlParams = (url) => {
    const payloadParams = { ...url };

    for (const props in payloadParams) {
      if (payloadParams[props].length === 0) {
        delete payloadParams[props];
      }
    }

    return payloadParams;
  };

  const scroll = () => {
    scrollTo('[id="__next"]');
  };

  const setData = (data) => {
    if (!data) return Promise.reject(new Error('Empty object'));
    setState({
      ...state,
      registration: data.registration || state.registration,
      manufacturer: data.manufacturer || state.manufacturer,
      model: data.model || state.model,
      colour: data.colour || state.colour,
      year: data.year || state.year,
      transmission: data.transmission || state.transmission,
      engineSize: data.engineSize || state.engineSize,
      fuel: data.fuel || state.fuel,
      mileage: data.mileage || state.mileage,
      valuation: data.valuation || state.valuation,
      step: data.step || state.step,
      acceptPrivacy: data.acceptPrivacy || state.acceptPrivacy,
      condition: data.condition || state.condition,
      serviceHistory: data.serviceHistory || state.serviceHistory,
    });
  };

  useEffect(() => {
    const isUnsubscribe =
      user.subscribed !== undefined ? !user.subscribed : false;

    setState({ ...state, unsubscribe: isUnsubscribe });

    endpointFetch('startPartEx', urlParams)
      .then((data) => {
        setState({
          ...state,
          details: { ...data.details },
          unsubscribe: !data.details.subscribed || !state.details.subscribed,
        });
        scroll();
      })
      .catch(() => console.log("Can't get user data"));
  }, []);

  const onUnsub = () => setState({ ...state, unsubscribe: !state.unsubscribe });

  const setNextStep = (index) => {
    const [max, curr] = formsProgress[state.step];
    const nextStep = curr + 1;

    setFormsProgress((prevState) => {
      const updateStatuses = [...prevState];

      updateStatuses[index] = [max, nextStep];

      return [...updateStatuses];
    });
  };

  const handleBack = () => {
    const { step } = state;

    setFormsProgress((prevState) => {
      const stepCount = prevState.findIndex(([max, curr]) => curr < max);
      const substep = prevState[stepCount][1];

      // nowhere to go back
      if (stepCount === 0 && substep === 0) return [...prevState];

      const updateStatuses = [...prevState];

      updateStatuses[stepCount][1] = substep - 1;

      return [...updateStatuses];
    });

    if (step > 0) setState({ ...state, step: step - 1 });
    if (step === 0) back();
  };

  const progress = fillProgress(formsProgress);

  return (
    <>
      <Seo />
      <div className="form-container">
        <div className={s.controls}>
          <div className="align-corner">
            <button
              onClick={handleBack}
              className={s.back}
              type="button"
              name="back"
            >
              Back
            </button>
            <span className={s.progress}>{`${progress}% Completed`}</span>
          </div>
          <ProgressBar progress={progress} />
          <Parts part={2} step={state.step + 1} />
        </div>
        <div className="form">
          {isLoading && <Spinner />}
          {!isLoading && state.step === 0 && (
            <PlateForm
              setData={setData}
              payData={state}
              setNextStep={setNextStep}
              productAdvertId={productAdvertId}
              scroll={scroll}
              deleteEmptyUrlParams={deleteEmptyUrlParams}
              urlParams={urlParams}
              leadgen={leadgen}
              setIsLoading={setIsLoading}
            />
          )}

          {!isLoading && state.step === 1 && (
            <MileageForm
              setData={setData}
              payData={state}
              setNextStep={setNextStep}
              scroll={scroll}
              deleteEmptyUrlParams={deleteEmptyUrlParams}
              urlParams={urlParams}
              setIsLoading={setIsLoading}
            />
          )}

          {!isLoading && state.step === 2 && (
            <ResultScreen
              valuation={state.valuation}
              setNextStep={setNextStep}
              productAdvertId={productAdvertId}
              leadgen={leadgen}
              scroll={scroll}
            />
          )}
        </div>
        <PrivacyNotice onChange={onUnsub} unsubscribe={state.unsubscribe} />
      </div>
    </>
  );
};

export default PartExchange;
