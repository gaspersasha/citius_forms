import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { URL } from '~constants';
import { GA, GTM as GTMService } from '~services';
import { useUserContext, useSsjContext, useGOContext } from '~contexts';
import {
  getUserDeviceName,
  getUserDevicePlatform,
  makeQueryString,
  cutUrlFromParams,
  makeMinTwoDigits,
  getSumYearsByParam,
  GET,
  POST,
  scrollTo,
  GTM_EVENT,
  getTestFlag,
  getFinanceSubmitEvent,
  getCookie,
} from '~utils';
import { getOrderSummaryData } from '~components/order-summary/requests';
import { GTM, sendGTM, truncateData } from './helpers';

export const useGofinance = (query) => {
  const { query: routerQuery, ...router } = useRouter();

  const {
    productAdvertId: productAdvertIdString,
    quoteId,
    quoteItemId,
    financeQuoteId,
  } = query;
  // query be like: quoteId=801742&quoteItemId=881346&productAdvertId=3091697
  // or: productAdvertId=3093803&financeQuoteId=9758324
  const productAdvertId = Number(productAdvertIdString);

  // If no vehicle to show - move on to details form right away
  const [formsProgress, setFormsProgress] = useState([
    [1, productAdvertId ? 0 : 1],
    [7, 0],
    [3, 0],
    [5, 0],
    [2, 0],
    [1, 0],
  ]);
  const [carParams, setCarParams] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [variantOrderSummary, setOrderSummaryVariant] = useState('No test');

  // flag for backend to understand what finance flow we use (1 - old, 2 - new).
  // It depends on "Google optimize" a/b test config.
  // TODO after end of A/B test Sync up with backend team and delete this param
  const [phase, setPhase] = useState(1);
  const [details, setDetails] = useState({});
  const [addresses, setAddress] = useState([{}]);
  const [employments, setEmployments] = useState([{}]);
  const [alreadyHave, setAlreadyHave] = useState({
    addresses: false,
    employments: false,
  });
  const [bankDetails, setBank] = useState({});
  const [isConsent, setConsent] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showModal, setModal] = useState(false);
  const [vehicleStatus, setVehicleStatus] = useState(undefined);
  const [carDetails, setCarDetails] = useState(undefined);
  const [campaign, setCampaign] = useState(null);

  const [other, setOther] = useState({
    clientId: '',
    form: 'finance',
    device: getUserDeviceName(),
    platform: getUserDevicePlatform(),
    productDefinitionId: productAdvertId || '',
    quoteId: quoteId || '',
    quoteItemId: quoteItemId || '',
    financeQuoteId: financeQuoteId || '',
    productAdvertId: productAdvertId || '',
    leadgen: false,
    step: 1,
    termsAccepted: false,
    unsubscribe: false,
    completedAction: null,
  });

  // Helpers
  const [, setError] = useState('');
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDataSending, setIsDataSending] = useState(false);

  const { user, actions } = useUserContext();
  const { ssj, setSsj } = useSsjContext();
  const { isGoRdy } = useGOContext();

  // SSJ a/b test
  const [variant, setVariant] = useState('0');

  const start = () => {
    sendGTM('start');
    const [max] = formsProgress[0];

    setFormsProgress((progress) => {
      const updated = [...progress];

      updated[0] = [max, max];

      return [...updated];
    });
  };

  const setDetailsProgress = () => {
    const updated = [...formsProgress];
    let [max] = updated[1];
    // set progress to be further if we have some data already

    if (user.firstName) max -= 3; // cause also we skip step with email, dob, phone

    updated[1] = [max, 0];
    setFormsProgress(updated);
    start();
  };

  // effects

  useEffect(() => {
    if (!isGoRdy) return;
    const testFlag = getTestFlag('ssj');

    setVariant(testFlag);
    testFlag && setPhase(+testFlag + 1);

    setOrderSummaryVariant(getTestFlag('orderSummary'));
  }, [isGoRdy]);

  useEffect(() => {
    if (user.isLoggedIn && variantOrderSummary === '1' && productAdvertId) {
      getOrderSummaryData(productAdvertId, setVehicleStatus, setCarDetails);
    }
  }, [user.isLoggedIn, variantOrderSummary, productAdvertId]);

  useEffect(() => {
    // const isUnsub = user.subscribed !== undefined ? !user.subscribed : false;
    // Is state updaters should be for each state field???
    // setUnsubscribe(isUnsub);

    const fillUserData = () => {
      const wasAlreadyFilled =
        !!ssj.details &&
        !!ssj.bankDetails &&
        !!ssj.addresses &&
        !!ssj.employments;

      if (!wasAlreadyFilled) return setDetailsProgress();

      const cameFromPartExchange =
        ssj.prevRoute && ssj.prevRoute.includes('part-ex');

      setSsj({
        ...ssj,
        prevRoute: router.pathname,
      });

      console.warn('somethign is fishy SSJ:', ssj);

      // we go to the last finance sub-form if we came from part-exchange (via back button)
      const STEPS_TO_SKIP_FOR_LOGGED_IN_USER = 3;

      if (wasAlreadyFilled && cameFromPartExchange) {
        setFormsProgress((progress) =>
          progress.map(([max], index) => {
            if (index === progress.length - 2) {
              return [max, 1];
            }

            if (index === 1) {
              const newMax = user.firstName
                ? max - STEPS_TO_SKIP_FOR_LOGGED_IN_USER
                : max;

              return [newMax, newMax];
            }

            return [max, max];
          })
        );

        // use previously filled user data from context
        const {
          details: ssjDetails,
          bankDetails: ssjBankDetails,
          addresses: ssjAddresses,
          employments: ssjEmployments,
          ...ssjOther
        } = ssj;

        console.warn('somethign is SSJ:', ssj, ssjOther);

        ssjDetails && setDetails(ssjDetails);
        ssjBankDetails && setBank(ssjBankDetails);
        ssjAddresses && setAddress(ssjAddresses);
        ssjEmployments && setEmployments(ssjEmployments);
        ssjOther && setOther(ssjOther);
      } else {
        setFormsProgress((progress) =>
          progress.map(([max, substep], index) => {
            if (index === 1) {
              const newMax = user.firstName
                ? max - STEPS_TO_SKIP_FOR_LOGGED_IN_USER
                : max;

              return [newMax, substep];
            }

            return [max, substep];
          })
        );
      }
    };

    if (user.isLoading) return;

    if (!user.isLoggedIn) {
      fillUserData();

      return setLoading(false);
    }

    GET('financeApiStart', {
      ...query,
      currentUserId: user.id,
    })
      .then(
        ({
          addresses: add,
          details: det,
          employments: emp,
          bankDetails: bank,
          creditScore,
          ...rest
        }) => {
          // if user logged in - he might have details, but not other filled sections
          setDetails({ creditScore, ...det, ...user });
          // additional checks for those for less renders
          setAlreadyHave({
            addresses: Boolean(add),
            employments: Boolean(emp),
          });
          add && setAddress(add);
          bank && setBank(bank);
          setOther(rest);

          // hack to pass income from login, to first empty employment form
          const emps = emp || [{ annualSalary: user.currentIncome || '' }];

          setEmployments(emps);

          fillUserData();
        }
      )
      .catch(setError)
      .then(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    setCampaign(routerQuery.cq_cmp || getCookie(URL.CAMPAIGN_URL_PARAM));

    if (!productAdvertId) return;

    GET('productInformation', { productAdvertId })
      .then(setCarParams)
      .catch(() => console.log("Can't get info about car"));
  }, []);

  // handlers

  const isFirstAddress = () => addresses.length === 1 && alreadyHave.addresses;

  const isFirstEmployments = () =>
    employments.length === 1 && alreadyHave.employments;

  const scroll = () => scrollTo('[data-bind="scrollTo"]');

  const handleUnsub = () => {
    setUnsubscribe(!unsubscribe);
  };

  const handleBack = () => {
    if (variant === '1') {
      const step = formsProgress.findIndex(([max, curr]) => curr < max);

      if (step === 1) {
        const [, substep] = formsProgress[step];

        if (substep === 0) {
          return router.back();
        }
      }
    }

    setFormsProgress((progress) => {
      let stepCount = progress.findIndex(([max, curr]) => curr < max);
      let substep = progress[stepCount][1];

      if (substep === 0) stepCount -= 1;
      [, substep] = progress[stepCount];

      // nowhere to go back
      if (stepCount === 0 && substep === 0) return { progress };

      const updated = [...progress];

      updated[stepCount][1] = substep - 1;

      return [...updated];
    });
  };

  const prepareDetails = ({
    dependants,
    drivingLicenceType,
    firstName,
    lastName,
    middleName,
    maritalStatus,
    email,
    phone,
    alternativePhone,
    title,
    validUKPassport,
    dateOfBirth,
    countryOfBirth,
    currentIncome,
  }) => {
    const [d, m, y] = dateOfBirth.split('/');
    const tempDate = new Date([m, d, y].join('/'));

    return {
      day: makeMinTwoDigits(tempDate.getDate()),
      month: makeMinTwoDigits(tempDate.getMonth() + 1),
      year: tempDate.getFullYear(),
      dependants,
      drivingLicenceType,
      firstName,
      lastName,
      maritalStatus,
      middleName,
      title,
      validUKPassport,
      dateOfBirth,
      countryOfBirth,
      emailAddress: email,
      telephoneNumber: phone,
      mobile: alternativePhone,
      annualSalary: currentIncome,
    };
  };

  const composePOST = (body) =>
    POST(
      'financeApiSend',
      {},
      {
        addresses,
        details,
        employments,
        bankDetails,
        campaign,
        phase,
        currentUserId: user.id,
        completedAction: null,
        clientId: GA.getGAClientId(),
        ...query,
        ...other,
        ...body,
      }
    );

  const handleDetails = (data) => {
    const [maxSteps, curr] = formsProgress[1];
    const step = curr + 1;
    const isFilled = step === maxSteps;

    // Prevent submitting the form if email is not checked yet
    if (!user.email && step === 2 && !data.isEmailChecked) {
      return false;
    }

    const updated = [...formsProgress];

    updated[1] = [maxSteps, step];
    setFormsProgress(updated);

    setDetails(prepareDetails(data));
    scroll();

    if (!isFilled) return null;

    setIsDataSending(true);

    composePOST({
      details: prepareDetails(data),
      step: 1,
      currentUserId: (user && user.id > -1 && user.id) || '',
      referrer: cutUrlFromParams(document.referrer || window.location.href),
      sendToLenderConsent: false,
    })
      .then((response) => {
        if (!(user && user.id > -1)) {
          GTM_EVENT('user-registered');
          actions.setUserState({
            ...prepareDetails(data),
            isLoading: false,
            isLoggedIn: true,
          });
        }

        GTM('your-details-complete');
        console.warn('and new other is: ', truncateData(response));
        setOther(truncateData(response));
      })
      .catch(setError)
      .finally(() => {
        setIsDataSending(false);
      });
  };

  const handleAddressSubmit = (data, index) => {
    const [maxSteps, curr] = formsProgress[2];
    const step = curr + 1;
    const isFilled = step === maxSteps;
    const addressForms = [...addresses];

    addressForms[index] = data;
    const needMore =
      getSumYearsByParam(addressForms, 'residenceMonths', 'residenceYears') < 3;

    setFormsProgress((progress) => {
      const updated = [...progress];

      // if filled, but not enough years - restart progress for section
      updated[2] = [maxSteps, isFilled && needMore ? 0 : step];

      return updated;
    });

    scroll();

    if (!isFilled) return;

    if (needMore) {
      addressForms.push({});

      return setAddress(addressForms);
    }

    setAddress(addressForms);

    setIsDataSending(true);

    composePOST({
      addresses: addressForms,
      step: 2,
      sendToLenderConsent: false,
      vehicleKeptAtAddress: addressForms[0].vehicleKeptAtAddress,
    })
      .then((response) => setOther(truncateData(response)))
      .then(() => GTM('address-complete'))
      .catch(setError)
      .finally(() => {
        setIsDataSending(false);
      });
  };

  const handleEmploymentSubmit = (data, index, maxSteps) => {
    const [, curr] = formsProgress[3];
    const step = curr + 1;
    const isFilled = step === maxSteps;
    const employmentForms = [...employments];

    employmentForms[index] = {
      building: data.buildingNumber || '',
      buildingName: data.buildingName || '',
      county: data.county || '',
      district: data.district || '',
      employer: data.employer || '',
      employmentMonths: data.employmentMonths || '',
      employmentSector: data.employmentSector || '',
      employmentType: data.employmentType || '',
      employmentYears: data.employmentYears || '',
      grossAnnualIncome: data.annualSalary || '',
      jobTitle: data.jobTitle || '',
      postCode: data.postCode || '',
      street: data.street || '',
      town: data.town || '',
    };

    const needMore =
      getSumYearsByParam(
        employmentForms,
        'employmentMonths',
        'employmentYears'
      ) < 3;

    setFormsProgress((progress) => {
      const updated = [...progress];

      // if filled, but not enough years - restart progress for section
      updated[3] = [maxSteps, isFilled && needMore ? 0 : step];

      return updated;
    });

    scroll();

    if (!isFilled) return;

    if (needMore) {
      employmentForms.push({});

      return setEmployments(employmentForms);
    }

    setEmployments(employmentForms);

    setIsDataSending(true);

    composePOST({
      employments: employmentForms,
      step: 3,
    })
      .then((response) => setOther(truncateData(response)))
      .then(() => GTM('employment-complete'))
      .catch(setError)
      .finally(() => {
        setIsDataSending(false);
      });
  };

  const handleOtherDetailsSubmit = (data) => {
    const [maxSteps, curr] = formsProgress[4];
    const step = curr + 1;
    const isFilled = step === maxSteps;

    setFormsProgress((progress) => {
      const updated = [...progress];

      // if filled, but not enough years - restart progress for section
      updated[4] = [maxSteps, step];

      return updated;
    });

    setSsj({
      addresses,
      details,
      employments,
      bankDetails: data,
      ...query,
      ...other,
      currentUserId: user.id,
      completedAction: null,
      clientId: GA.getGAClientId(),
    });

    scroll();
    setBank(data);

    if (!isFilled) return;

    setLoading(true);

    setIsDataSending(true);

    composePOST({
      bankDetails: data,
      step: 4,
    })
      .then((response) => setOther(truncateData(response)))
      .then(() => GTM('other-details-complete'))
      .then(() => {
        if ((!variant || variant === '0') && !carParams.leadgen_B) {
          return setLoading(false);
        }

        const url = makeQueryString('part-ex', {
          quoteId: other.quoteId || '',
          quoteItemId: other.quoteItemId || '',
          productAdvertId: other.productAdvertId || '',
          leadgen: other.leadgen ? '1' : '0',
        });

        router.push(url);
      })
      .finally(() => setIsDataSending(false));
  };

  const getSumOfYears = (index, { form, years, month }) => {
    const monthInYear = 12;
    let sumOfYears = 0;

    for (let i = 0; i < index; i += 1) {
      const item = form[i];

      sumOfYears += Number(item[years]) + Number(item[month]) / monthInYear;
    }

    return Number(sumOfYears.toFixed(2));
  };

  const toggleModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal((now) => !now);
  };

  const handleConsentChange = () => {
    setConsent(!isConsent);
  };

  const handleConsentSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (isDataSending) return;

    composePOST({
      step: 5,
      sendToLenderConsent: isConsent,
      promoCode,
    })
      .then((response) => {
        GA.gaPageView(getFinanceSubmitEvent(response.leadgen));
        GTMService.fire({
          carAttached: response.productAdvertId ? 'with' : 'without',
          creditBand: response.creditSearch?.band || null,
          event: 'finance-application-complete',
        });

        const url = makeQueryString('finance-thank-you', {
          quoteId: response.quoteId || routerQuery.quoteId || '',
          quoteItemId: response.quoteItemId || routerQuery.quoteItemId || '',
          productAdvertId:
            response.productAdvertId || routerQuery.productAdvertId || '',
        });

        router.push(url);
      })
      .then(() => setSubmitting(false)); // do we need id with redirect?
  };

  const handlePromoCodeChange = ({ target: { value } }) => {
    setPromoCode(value);
  };

  return [
    {
      productAdvertId,
      carParams,
      details,
      addresses,
      employments,
      bankDetails,
      promoCode,
      unsubscribe,
      formsProgress,
      showModal,
      vehicleStatus,
      carDetails,
      other,
      isLoading,
      isConsent,
      isSubmitting,
      isDataSending,
    },
    {
      start,
      isFirstAddress,
      isFirstEmployments,
      getSumOfYears,
      toggleModal,
      handleUnsub,
      handleBack,
      handleDetails,
      handleAddressSubmit,
      handleEmploymentSubmit,
      handleOtherDetailsSubmit,
      handleConsentChange,
      handleConsentSubmit,
      handlePromoCodeChange,
    },
  ];
};
