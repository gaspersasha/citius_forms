import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { VehicleContextProvider, useSsjContext } from '~contexts';
import { GA } from '~services';
import {
  Spinner,
  Seo,
  Modal,
  PrivacyNotice,
  Parts,
  ProgressBar,
} from '~components';
import { Confirm } from '~containers/gofinance';
import {
  POST,
  makeQueryString,
  scrollTo,
  fillProgress,
  getFinanceSubmitEvent,
  getCookie,
} from '~utils';
import { CAMPAIGN_URL_PARAM } from '~constants/urls';
import s from './styles/almost.module.sass';

const { gaPageView } = GA;

const AlmostDone = () => {
  const [formsProgress, setFormsProgress] = useState([[1, 0]]);
  const [isConsent, setConsent] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showModal, setModal] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(false);
  const router = useRouter();
  const {
    query: { cq_cmp },
  } = useRouter();

  useEffect(() => {
    scrollTo('#__next');
  }, []);

  const { ssj } = useSsjContext();

  function toggleModal(e) {
    e.preventDefault();
    e.stopPropagation();
    setModal((now) => !now);
  }

  function handleConsentChange() {
    setConsent(!isConsent);
  }

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

  function handleConsentSubmit(e) {
    e.preventDefault();
    StepState(0);
    setSubmitting(true);

    return POST(
      'financeApiSend',
      {},
      {
        ...ssj,
        step: 5,
        sendToLenderConsent: isConsent,
        campaign: cq_cmp || getCookie(CAMPAIGN_URL_PARAM),
        unsubscribe,
      }
    )
      .then((res) => {
        gaPageView(getFinanceSubmitEvent(res.leadgen));
        const url = makeQueryString('finance-thank-you', {
          quoteId: res.quoteId || router.query.quoteId || '',
          quoteItemId: res.quoteItemId || router.query.quoteItemId || '',
          productAdvertId:
            res.productAdvertId || router.query.productAdvertId || '',
        });

        router.push(url);
      })
      .catch(console.log);
  }

  const onUnsub = () => setUnsubscribe(!unsubscribe);
  const progress = fillProgress(formsProgress);

  const back = () => {
    router.back();
  };

  return (
    <div className={s.container}>
      <Seo />

      {isSubmitting && <Spinner />}

      {showModal && (
        <Modal onClose={() => toggleModal()} isDark>
          <div>
            <h3>Data Protection Act</h3>
            Credit reference searches will be conducted by the lenders in order
            to establish your credit worthiness. Our process involves an initial
            ‘soft search’ that should not impact your credit score; to gain a
            full acceptance some of our lenders will need to conduct a hard
            search which will be recorded on your credit file, but we will
            obtain your consent before doing so. On occasions we will have to
            try more than one lender from our panel to obtain a credit
            acceptance which may result in several credit searches being
            registered. Additional information may be required and lenders may
            on occasions contact employers as part of their checks. Alternative
            terms may be offered. Non payment of credit agreements and default
            will severely affect your credit rating and may result with the
            agreement vehicle being repossessed by the lender and or action
            being taken via the County Courts. The way you conduct your
            agreement is registered with all the Credit Reference Agencies and
            therefore any default could severely affect your chances of being
            accepted for credit in the future. If you are taking out a Hire
            Purchase, Lease Purchase or Personal Loan agreement with a Balloon
            Payment at the end, please be aware that the Balloon (Residual
            value) is NOT GUARANTEED by the lender and is your responsibility to
            pay. If you require the protection of a Minimum Guaranteed Future
            Value you will need a PCP (Personal Contract Purchase) agreement.
            Alternative (Direct) sources of finance are available to you i.e.
            Banks or via internet aggregators. By agreeing below, you
            acknowledge that as part of the process of obtaining finance for
            your vehicle we will need to pass your details on to one or more of
            our finance partners. A list of these partners together with their
            consumer credit licence numbers are available on request. You also
            acknowledge that any organisation approached for credit will need to
            undertake credit searches with a credit reference agency which may
            affect your credit rating.
          </div>
        </Modal>
      )}

      {!isSubmitting && (
        <>
          <div className={s.controls}>
            <div className="align-corner">
              <button className={s.back} onClick={back} type="button">
                Back
              </button>
              <span className={s.progress}>{`${progress}% Completed`}</span>
            </div>

            <ProgressBar progress={progress} />
            <VehicleContextProvider>
              <Parts part={3} />
            </VehicleContextProvider>
          </div>
          <Confirm
            toggleModal={() => toggleModal()}
            handleChange={() => handleConsentChange()}
            handleSubmit={() => handleConsentSubmit()}
            isDataSending={isSubmitting}
            isConsent={isConsent}
            isLeadgen={ssj.leadgen}
          />
          <PrivacyNotice onChange={onUnsub} unsubscribe={unsubscribe} />
        </>
      )}
    </div>
  );
};

export default AlmostDone;
