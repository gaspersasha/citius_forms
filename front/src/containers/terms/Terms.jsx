import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '~contexts';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  Button,
  Modal,
  Spinner,
  PrivacyNotice,
  Parts,
  ProgressBar,
  Seo,
} from '~components';
import {
  endpointFetch,
  endpointPush,
  validate,
  isValid,
  prepare,
  scrollTo,
  getFormData,
  makeQueryString,
  fillProgress,
  GTM_EVENT,
} from '~utils';
import TermsInputs from './TermsInputs';
import TermsResults from './TermsResults';
import { FINANCE_TYPE_CONTENT } from './constants';

import s from './terms.module.sass';

const Terms = () => {
  const [formsProgress, setFormsProgress] = useState([[1, 0]]);
  const [quotes, setQuotes] = useState({});
  const [maxFinanceDeposit, setMaxFinanceDeposit] = useState({
    value: 4400,
    status: INPUT_STATUS.DEFAULT,
    validationType: VALIDATION_TYPES.NUMBER,
  });
  const [state, setState] = useState({
    deposit: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NUMBER,
    },
    mileage: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NUMBER,
    },
    terms: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NUMBER,
    },
    delivery: {
      value: 18,
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NUMBER,
    },
    credit: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
  });
  const [financeType, setFinanceType] = useState({
    finance: {
      value: 'PCP',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
  });
  const [carInfo, setCarInfo] = useState({ price: '' }); // price
  const [userInfo, setUserInfo] = useState({ creditScore: '' }); // creditScore | creditSearch
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState('');
  const [modalType, setModalType] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(false);

  const {
    query: { productAdvertId, quoteId, leadgen },
  } = useRouter();
  const router = useRouter();
  const isLeadGen = !!Number(leadgen);

  const { user } = useUserContext();

  useEffect(() => {
    const isUnsubscribe =
      user.subscribed !== undefined ? !user.subscribed : false;

    setUnsubscribe(isUnsubscribe);
  }, []);

  const onUnsub = () => setUnsubscribe(!unsubscribe);

  const financeQuoteRequest = (params) => {
    const formData = getFormData(params);

    return endpointPush('POST', 'newFinanceQuote', {}, formData);
  };

  const calcMaxFinanceDeposit = (type) =>
    Math.round(
      (FINANCE_TYPE_CONTENT[type].max / 100) * Number(carInfo.price || 100000)
    );

  const initialQuoteSuccess = (financeQuote, creditScore) => {
    let creditRating = '';

    if (!financeQuote) throw new Error('empty_quotes');

    if (creditScore >= 1 && creditScore <= 319) creditRating = 'poor';

    if (creditScore >= 320 && creditScore <= 409) creditRating = 'average';

    if (creditScore >= 410 && creditScore <= 469) creditRating = 'good';

    if (creditScore >= 470) creditRating = 'excellent';

    const { deposit, mileage, terms, delivery, credit } = state;

    if (Object.values(financeQuote)[0].financeType === 'Hire Purchase') {
      Object.values(financeQuote)[0].financeType = 'HP';
    }

    setState({
      ...state,
      deposit: {
        ...deposit,
        value: Object.values(financeQuote)[0].totalDeposit,
      },
      mileage: { ...mileage, value: Object.values(financeQuote)[0].mileagePA },
      terms: { ...terms, value: Object.values(financeQuote)[0].periodMonths },
      delivery: {
        ...delivery,
        value: Object.values(financeQuote)[0].deliveryMethodId || 18,
      },
      credit: { ...credit, value: creditRating || userInfo.creditScore },
    });
    setFinanceType({
      finance: {
        ...financeType.finance,
        value: Object.values(financeQuote)[0].financeType,
      },
    });
    setQuotes({ ...quotes, ...financeQuote });
    setMaxFinanceDeposit({
      ...maxFinanceDeposit,
      value: calcMaxFinanceDeposit(
        Object.values(financeQuote)[0].financeType || 'PCP'
      ),
    });
  };

  const setDeliveryInfo = (deliveries) => {
    deliveries.map((delivery) =>
      setDeliveryOptions((deliveryOption) => [
        ...deliveryOption,
        {
          value: delivery.deliveryMethodId,
          option: `${delivery.description} £${delivery.deliveryCostPlusVAT}`,
        },
      ])
    );
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const quoteInfo = await financeQuoteRequest({
        pageload: true,
        productAdvertId,
      });
      const userProfileInfo = await endpointFetch('userProfileInfo');
      const productInformation = await endpointFetch('productInformation', {
        productAdvertId,
      });
      const getDeliveryOptions = !isLeadGen
        ? await endpointFetch('getDeliveryOptions', {
            productAdvertId,
          })
        : null;

      setUserInfo({ ...userProfileInfo });

      initialQuoteSuccess(quoteInfo, userProfileInfo.creditScore);

      setCarInfo({ ...productInformation });

      if (!isLeadGen) {
        setDeliveryInfo(getDeliveryOptions);
      }
    } catch (error) {
      setApiError('');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [productAdvertId]);

  const financeQuoteSuccess = (financeQuote) => {
    if (!financeQuote) throw new Error('empty_quotes');

    if (Object.values(financeQuote)[0].financeType === 'Hire Purchase') {
      Object.values(financeQuote)[0].financeType = 'HP';
    }

    setQuotes({ ...financeQuote });
    setApiError('');
    setMaxFinanceDeposit({
      ...maxFinanceDeposit,
      value: calcMaxFinanceDeposit(
        Object.values(financeQuote)[0].financeType || 'PCP'
      ),
    });

    if (Object.keys(quotes).length !== Object.keys(financeQuote).length) {
      setFinanceType({
        finance: {
          ...financeType.finance,
          value: Object.values(financeQuote)[0].financeType,
        },
      });
    }
  };

  const setErrorMessage = (error) => setApiError(error);

  useEffect(() => {
    const { price: totalPrice } = carInfo;
    const { deposit, terms, mileage, delivery, credit } = state;
    const { finance } = financeType;
    const params = {
      pageload: false,
      financeType: finance.value === 'HP' ? 'Hire Purchase' : finance.value,
      financeCreditRating: credit.value,
      totalPrice,
      deliveryMethodId: delivery.value,
      productAdvertId,
      financeDeposit: deposit.value,
      financePeriodMonths: terms.value,
      financeAnnualMileage: mileage.value,
    };

    if (deposit.status !== INPUT_STATUS.INVALID) {
      financeQuoteRequest(params)
        .then((data) => financeQuoteSuccess(data))
        .catch(setErrorMessage);
    }
  }, [
    state.deposit.value,
    state.mileage.value,
    state.terms.value,
    state.delivery.value,
    state.credit.value,
  ]);

  const handleChange = ({ target: { name, value, id } }) => {
    let status = INPUT_STATUS.DEFAULT;
    let type = value || id;
    let maxDeposit = '';

    switch (name || id) {
      case 'finance': {
        if (value === 'Hire Purchase') {
          type = 'HP';
        }

        maxDeposit = calcMaxFinanceDeposit(type);

        if (state.deposit.value > maxDeposit) {
          status = INPUT_STATUS.INVALID;
        }

        setState({
          ...state,
          deposit: { ...state.deposit, status },
        });
        setFinanceType({
          finance: {
            ...financeType.finance,
            value: type,
          },
        });
        setMaxFinanceDeposit({ ...maxFinanceDeposit, value: maxDeposit });

        break;
      }

      case 'deposit': {
        if (!value || value > maxFinanceDeposit.value) {
          status = INPUT_STATUS.INVALID;
        }

        maxDeposit = calcMaxFinanceDeposit(financeType.finance.value || 'PCP');

        setState({
          ...state,
          deposit: { ...state.deposit, value, status },
        });
        setMaxFinanceDeposit({ ...maxFinanceDeposit, value: maxDeposit });

        break;
      }

      case String(id): {
        if (id === 'Hire Purchase') {
          type = 'HP';
        }

        maxDeposit = calcMaxFinanceDeposit(type);

        if (state.deposit.value > maxDeposit) {
          status = INPUT_STATUS.INVALID;
        }

        setState({
          ...state,
          deposit: { ...state.deposit, status },
        });
        setFinanceType({
          finance: {
            ...financeType.finance,
            value: type,
          },
        });
        setMaxFinanceDeposit({ ...maxFinanceDeposit, value: maxDeposit });

        break;
      }

      default:
        setState({
          ...state,
          [name]: {
            ...state[name],
            value,
            status: INPUT_STATUS.DEFAULT,
          },
        });
    }
  };

  const setNextStep = (index, max, nextStep) => {
    setFormsProgress((prevState) => {
      const updateStatuses = [...prevState];

      updateStatuses[index] = [max, nextStep];

      return [...updateStatuses];
    });
  };

  const StepState = (index) => {
    const [max, curr] = formsProgress[index];
    const nextStep = curr + 1;

    setNextStep(index, max, nextStep);

    return {
      nextStep,
      isFilled: nextStep === max,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedState = validate(prepare(state));

    setState(validatedState);
    const tryAgain = !isValid(validatedState);

    if (tryAgain) return scrollTo('.error-input-border');

    StepState(0);

    const newState = {
      ...quotes[String(financeType.finance.value)],
      quoteId,
      deliveryMethodId: state.delivery.value,
    };

    endpointPush('POST', 'updateFinanceTerms', newState).then(() => {
      GTM_EVENT('ssFinanceTermsCompleted');

      const url = makeQueryString('almost-done', {
        quoteId: router.query.quoteId || '',
        quoteItemId: router.query.quoteItemId || '',
        productAdvertId: router.query.productAdvertId || '',
      });

      router.push(url);
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const showModal = (type) => {
    setModalType(type);
    toggleModal();
  };

  const infoModal = (
    <Modal isDark onClose={toggleModal}>
      <div>
        {modalType === 'PCP' ? (
          <div>
            <span>{FINANCE_TYPE_CONTENT.PCP.title}</span>
            <p>{FINANCE_TYPE_CONTENT.PCP.subtitle}</p>
            <p>{FINANCE_TYPE_CONTENT.PCP.description}</p>
          </div>
        ) : (
          <div>
            <span>{FINANCE_TYPE_CONTENT.HP.title}</span>
            <p>{FINANCE_TYPE_CONTENT.HP.subtitle}</p>
            <p>{FINANCE_TYPE_CONTENT.HP.description}</p>
          </div>
        )}
      </div>
    </Modal>
  );

  const disabledForm = (type) => {
    if (
      state.terms.value > FINANCE_TYPE_CONTENT.PCP.max &&
      type === ('HP' || 'Hire Purchase')
    ) {
      return false;
    }
  };

  const disableFinanceDeposit =
    (maxFinanceDeposit.value < state.deposit.value ||
      state.deposit.value < 0) &&
    true;

  const disabledFinanceValue =
    !quotes.PCP && financeType.finance.value === 'PCP' && true;

  const disabledTrue = true;

  const progress = fillProgress(formsProgress);

  return (
    <div className={s.container}>
      <Seo />
      {isModalOpen && infoModal}
      <div className={s.controls}>
        <div className="align-corner">
          <button className={s.back} type="button" onClick={router.back}>
            Back
          </button>
          <span className={s.progress}>{`${progress}% Completed`}</span>
        </div>

        <ProgressBar progress={progress} />
        <Parts part={2} step={4} />
      </div>
      <div className="form-container">
        <div className="form">
          {isLoading || !productAdvertId ? (
            <Spinner />
          ) : (
            <>
              <h1 className={s.title}>Choose your finance terms</h1>
              <p className={s.subTitle}>
                Tailor your finance details to see how much you could be paying
              </p>
              <form className={s.financeForm} onSubmit={handleSubmit}>
                <TermsInputs
                  disabledTrue={disabledTrue}
                  fields={{ ...state, ...financeType }}
                  handleChange={handleChange}
                  deliveryOptions={deliveryOptions}
                  isLeadGen={isLeadGen}
                  maxFinanceDeposit={maxFinanceDeposit.value}
                />
                <div className={s.financeType}>
                  <h5>Now select your finance type</h5>
                  <TermsResults
                    disabledForm={disabledForm}
                    fields={{ ...state, ...financeType }}
                    quotes={quotes}
                    handleChange={handleChange}
                    showModal={showModal}
                    apiError={apiError}
                  />
                </div>
                <Button
                  type="submit"
                  className={s.submitBtn}
                  disabled={
                    disableFinanceDeposit || disabledFinanceValue || !!apiError
                  }
                >
                  Next
                </Button>
              </form>
              <div className={s.descriptions}>
                <p>Representative example when buying on PCP</p>
                <p>
                  Borrowing £9,500 over 48 months, zero deposit, on PCP, an
                  annual mileage of 8,000pa, with a Representative APR of 9.9%,
                  the amount payable would be £192 per month, an optional final
                  payment of £2,923, with a total cost of credit of £2,426 and a
                  total amount payable of £11,926 (** based on a Ford Fiesta
                  Titanium hatchback)
                </p>
                <p>
                  Buyacar is a credit broker, not a lender. Our rates start from
                  6.9% APR. The rate you are offered will depend on your
                  individual circumstances.
                </p>
              </div>
            </>
          )}
        </div>
        <PrivacyNotice onChange={onUnsub} unsubscribe={unsubscribe} />
      </div>
    </div>
  );
};

export default Terms;
