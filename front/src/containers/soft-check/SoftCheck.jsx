import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GTM, GA } from '~services';
import { LoqateAddress } from '~containers';
import {
  InputText,
  InputEmail,
  InputPhone,
  InputDate,
  TapButtons,
  Login,
  Button,
  PrivacyNotice,
  Spinner,
  Seo,
} from '~components';
import { useUserContext, useGOContext } from '~contexts';
import { FORM, INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import {
  checkNotEmpty,
  checkEmail,
  validate,
  isValid,
  prepare,
  simplify,
  scrollTo,
  getUserDeviceName,
  getUserDevicePlatform,
  cutUrlFromParams,
  makeMinTwoDigits,
  POST,
  GET,
  makeQueryString,
  getCookie,
  getTestFlag,
} from '~utils';
import { CAMPAIGN_URL_PARAM } from '~constants/urls';
import { SoftCheckResult } from '.';
import { KEYS, MAX_SALARY } from './constants';
import s from './styles/soft-check.module.sass';

const { gaPageView } = GA;

const CREDIT_CHECK_EVENTS = {
  SS_START: 'ssCreditCheckStart',
  LG_START: 'LGCreditCheckStart',
  SS_COMPLETE: 'ssCreditCheckComplete',
  LG_COMPLETE: 'LGCreditCheckComplete',
};

export default function SoftCheck() {
  const [isLeadgen, setLeadgen] = useState(false);
  const [campaign, setCampaign] = useState(null);

  const { getGAClientId } = GA;
  const router = useRouter();

  const {
    query: { productAdvertId, cq_cmp },
    isReady,
  } = router;

  // get info about product - is it leadgen model by productAdvertId
  useEffect(() => {
    if (!isReady) {
      return;
    }

    setCampaign(cq_cmp || getCookie(CAMPAIGN_URL_PARAM));

    if (!productAdvertId) {
      GTM.fire({ event: CREDIT_CHECK_EVENTS.SS_START });

      return;
    }

    GET('productInformation', { productAdvertId })
      .then((data) => {
        const leadgen = !!data.leadgen_B;

        setLeadgen(leadgen);

        GTM.fire({
          event: leadgen
            ? CREDIT_CHECK_EVENTS.LG_START
            : CREDIT_CHECK_EVENTS.SS_START,
        });

        if (leadgen) {
          gaPageView(`/virtual/${CREDIT_CHECK_EVENTS.LG_START}`);
        }
      })
      .catch(() => {
        GTM.fire({ event: CREDIT_CHECK_EVENTS.SS_START });
        console.log("Can't get info about car");
      });
  }, [productAdvertId, isReady]);

  const [softCheckResult, setSoftCheckResult] = useState(null);
  const [checkStatus, setCheckStatus] = useState('');
  const [state, setState] = useState({
    notLogged: false,
    isEmailChecked: false,

    title: {
      value: 'MR',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    firstName: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
    },
    middleName: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    lastName: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NAME,
    },
    email: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.EMAIL,
    },
    phone: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.ALT_PHONE,
    },
    dateOfBirth: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.DATE,
    },
    postCode: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.POSTCODE,
    },
    houseName: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    houseNumber: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    street: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    town: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
    },
    district: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    county: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
    },
    currentIncome: {
      value: '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.SALARY,
    },
  });

  const [unsubscribe, setUnsubscribe] = useState(false);
  const [quotes, setQuotes] = useState({});
  const [labelFocus, setLabelFocus] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
  });
  // GO a/b. 0-original, 1-test
  const [variant, setVariant] = useState('0');

  const { user } = useUserContext();
  const { isGoRdy } = useGOContext();

  useEffect(() => {
    if (user.id === -1) return;

    const updatedState = KEYS.reduce(
      (build, k) => ({
        ...build,
        [k]: {
          value: user[k] || state[k].value,
          status: INPUT_STATUS.DEFAULT,
          validationType: state[k].validationType,
        },
      }),
      {}
    );

    updatedState.postCode = {
      ...updatedState.postCode,
      value: user.postcode || '',
    };

    updatedState.notLogged = false;
    updatedState.isEmailChecked = true;

    setState(updatedState);
  }, [user]);

  useEffect(() => {
    if (!isGoRdy) return;
    setVariant(getTestFlag('sccGoFinance'));
  }, [isGoRdy]);

  const handleBack = (e) => {
    e.preventDefault();
    if (checkStatus === 'fetched' || checkStatus === 'loading')
      return setCheckStatus('');
    window.history.back();
  };

  useEffect(() => {
    window.addEventListener('popstate', handleBack);

    return window.removeEventListener('popstate', handleBack);
  }, []);

  const handleChange = ({ target: { value, name } }) =>
    setState({
      ...state,
      [name]: {
        validationType: state[name].validationType,
        status: checkNotEmpty(value)
          ? INPUT_STATUS.VALID
          : INPUT_STATUS.DEFAULT,
        value,
      },
    });

  const incomeValueChange = (event) => {
    const {
      target: { value },
    } = event;
    const incomeValue = Object.assign(event, {});
    const regexp = /^(([0-9]*?)?[,\\.]?([0-9]{1,2})?)$/g;

    if (event.target.value.indexOf(',') !== -1) {
      incomeValue.target.value = value.replace(',', '.');
    }

    if (
      !incomeValue.target.value.match(regexp) ||
      Number(incomeValue.target.value) > MAX_SALARY
    ) {
      return;
    }

    handleChange(incomeValue);
  };

  const checkIfLoggedIn = ({ target: { value } }) => {
    const { isLoggedIn } = user.id > -1;

    if (!value) return;

    if (!checkEmail(value)) {
      setState({
        ...state,
        email: {
          ...state.email,
          status: INPUT_STATUS.INVALID,
        },
      });

      return;
    }

    if (isLoggedIn) return;
    const form = new FormData();

    form.append('emailAddress', value);

    POST('emailExists', null, form).then((notLogged) =>
      setState({
        ...state,
        notLogged,
        isEmailChecked: !notLogged,
        isCheckingExistence: false,
      })
    );
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
        },
      }))
      .reduce((final, item) => ({ ...final, ...item }), {});

    setState({ ...state, ...freshAddress });
  };

  const handlePhoneChange = ({ target: { value } }) => {
    if (value !== '0' && value.length && !Number(value)) {
      return; // prevent using not Number digits in field
    }

    setState({
      ...state,
      phone: {
        ...state.phone,
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    });
  };

  const handleLoginCancel = () => {
    setState({
      ...state,
      email: {
        ...state.email,
        value: '',
        status: INPUT_STATUS.DEFAULT,
      },
      notLogged: false,
    });
  };

  const onUnsub = () => setUnsubscribe(!unsubscribe);

  const goFinanceApp = () => {
    const url = makeQueryString('finance', {
      quoteId: quotes.quoteId,
      quoteItemId: quotes.quoteItemId,
      ...quotes,
      productAdvertId,
    });

    return router.push(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const forPrepare = prepare(state);

    // no need in this field if prodId is present
    if (productAdvertId) delete forPrepare.currentIncome;
    const validatedState = validate(forPrepare);
    const tryAgain = !isValid(validatedState);

    setState({
      ...state,
      ...validatedState,
    });

    if (tryAgain) return scrollTo('.error-input-label');

    const {
      title,
      firstName,
      middleName,
      lastName,
      email,
      phone,
      dateOfBirth,
      postCode,
      houseName,
      houseNumber,
      street,
      town,
      district,
      county,
      currentIncome,
    } = simplify(state);

    const [d, m, y] = dateOfBirth.split('/');
    const dob = new Date([m, d, y].join('/'));
    const day = makeMinTwoDigits(dob.getDate());
    const month = makeMinTwoDigits(dob.getMonth() + 1);
    const year = dob.getFullYear();

    const toSend = {
      details: {
        title,
        firstName,
        middleName,
        lastName,
        emailAddress: email,
        telephoneNumber: phone,
        annualIncome: currentIncome,
        dateOfBirth,
        day,
        month,
        year,
      },
      addresses: [
        {
          county,
          postCode,
          houseName,
          houseNumber,
          street,
          town,
          district,
        },
      ],
      sendToLenderConsent: false,
      unsubscribe,
      productAdvertId,
      form: 'soft-credit-check',
      clientId: getGAClientId(),
      device: getUserDeviceName(),
      platform: getUserDevicePlatform(),
      referrer: cutUrlFromParams(document.referrer || window.location.href),
      campaign,
    };

    if (checkStatus === 'loading') return;

    setCheckStatus('loading');

    return POST('softcheck', {}, toSend)
      .then((data) => {
        setSoftCheckResult(data);

        setQuotes({
          quoteId: data.quoteId,
          quoteItemId: data.quoteItemId,
        });

        GTM.fire({
          carAttached: data.productAdvertId ? 'with' : 'without',
          creditBand: data?.creditSearch?.band || null,
          event: isLeadgen
            ? CREDIT_CHECK_EVENTS.LG_COMPLETE
            : CREDIT_CHECK_EVENTS.SS_COMPLETE,
        });

        if (isLeadgen) {
          gaPageView(`/virtual/${CREDIT_CHECK_EVENTS.LG_COMPLETE}`);
        } else if (
          variant === '1'
          && data.productAdvertId
          && data.creditSearch?.band.toUpperCase() <= 'C'
        ) {
          return goFinanceApp();
        }

        setCheckStatus('fetched');
      })
      .catch((error) => {
        setCheckStatus('fetched');
        console.warn(error);
      });
  };

  const {
    title,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    dateOfBirth,
    postCode,
    houseName,
    houseNumber,
    street,
    district,
    town,
    county,
    currentIncome,
    notLogged,
  } = state;

  useEffect(() => {
    if (isLeadgen && checkStatus === 'fetched') {
      // redirect to finance form is leadgen = true
      router.push(makeQueryString('/finance', router.query));
    }
  }, [checkStatus]);

  const handleFocus = ({ target: { name } }) => {
    setLabelFocus({
      ...labelFocus,
      [name]: true,
    });
  };

  const handleBlur = ({ target: { name } }) => {
    setLabelFocus({
      ...labelFocus,
      [name]: false,
    });
  };

  return (
    <>
      { !isLeadgen && checkStatus === 'fetched'
        ? <SoftCheckResult creditSearch={softCheckResult?.creditSearch} quotes={quotes} />
        : (
          <>
            <Seo />
            <div className="form-container">
              {
              (checkStatus === 'loading' ||

              (isLeadgen && checkStatus === 'fetched')) && (
                <div className={s.wait}>
                  <h4>Hold on while we fetch your credit score results</h4>
                  <Spinner />
                  <p>This usually takes 15 seconds</p>
                </div>
              )}
              {checkStatus === '' && (
                <>
                  {notLogged && (
                    <Login
                      email={email.value}
                      handleLoginClose={handleLoginCancel}
                      source="soft-check"
                    />
                  )}
                  <form onSubmit={handleSubmit} className="form">

                    {!campaign ? (
                      <>
                        <h1 className={s.title}>Your finance eligibility</h1>
                        <p className={s.subtitle}>
                          Find out your finance eligibility, with no impact on your credit
                          score
                        </p>
                      </>
                    ) : (
                      <>
                        <h1 className={s.titleCampaign}>Get started with our finance eligibility checker</h1>
                        <ul className={s.listCampaign}>
                          <li>Find out your finance eligibility with no impact on your credit score</li>
                          <li>Finance options from just 6.9% APR, 7.9% APR representative</li>
                          <li>Then buy online from our selection of used cars, or opt for the finance-only option</li>
                        </ul>
                        <p className={s.subtitle}>
                          Need more information about car finance options before you get started? Check out our handy&nbsp;
                          <a href="https://website/car-finance/1474/the-best-ways-to-finance-a-car">finance
                            guide</a>
                        </p>
                      </>
                    )}

                    <TapButtons
                      label="What is your title?"
                      subTitle="Select from the list below"
                      name="title"
                      options={FORM.TITLES}
                      value={title.value}
                      status={title.status}
                      onChange={handleChange}
                      defaultVal="MR"
                    />
                    <div className={labelFocus.firstName && s.label}>
                      <InputText
                        label="First name"
                        name="firstName"
                        subTitle={
                          labelFocus.firstName
                            ? 'First name MUST match your driving license so we can verify your details'
                            : 'First name as it is on your driving licence'
                        }
                        errorMessage="Please enter your first name as is it on your driving licence"
                        placeholder="e.g. James"
                        status={firstName.status}
                        value={firstName.value}
                        required
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className={labelFocus.middleName && s.label}>
                      <InputText
                        label="Middle name"
                        name="middleName"
                        subTitle={
                          labelFocus.middleName
                            ? 'Middle name MUST match your driving license so we can verify your details'
                            : 'Middle name as it is on your driving licence'
                        }
                        placeholder="e.g. Anderson"
                        status={middleName.status}
                        value={middleName.value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className={labelFocus.lastName && s.label}>
                      <InputText
                        label="Last name"
                        name="lastName"
                        subTitle={
                          labelFocus.lastName
                            ? 'Last name MUST match your driving license so we can verify your details'
                            : 'Last name as it is on your driving licence'
                        }
                        errorMessage="Please enter your last name as is it on your driving licence"
                        placeholder="e.g. Balwin"
                        status={lastName.status}
                        value={lastName.value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                    <div>
                      <InputEmail
                        label="Email"
                        name="email"
                        subTitle="Your email will be your username to login"
                        errorMessage="Please enter a valid email address"
                        useErrorBorder={false}
                        placeholder="e.g. email@email.com"
                        status={email.status}
                        value={email.value}
                        required
                        onChange={handleChange}
                        onBlur={checkIfLoggedIn}
                      />
                    </div>

                    <InputDate
                      id="datepicker"
                      name="dateOfBirth"
                      placeholder="14/12/1990"
                      subTitle="You must be over 18"
                      errorMessage="Please enter your date of birth"
                      value={dateOfBirth.value}
                      status={dateOfBirth.status}
                      onChange={handleChange}
                      required
                    />

                    <LoqateAddress
                      selectHandler={selectAddressHandler}
                      formName="soft-check"
                      subTitle="Start typing your address and select the relevant option when it appears in the list below. If it is not found then click on the 'Enter address manually' link"
                      errorMessage={
                        isValid(validate({ postCode, street, town }))
                          ? 'Please enter your current address'
                          : 'Please enter full current address'
                      }
                      manualFields={[
                        {
                          label: 'Postcode',
                          name: 'postCode',
                          required: true,
                          onChange: (e) =>
                            handleChange({
                              ...e,
                              target: {
                                name: e.target.name,
                                value: e.target.value.toUpperCase(),
                              },
                            }),
                          warning: '* Please type correct UK postal code',
                          ...postCode,
                        },
                        {
                          label: 'House name',
                          name: 'houseName',
                          onChange: handleChange,
                          ...houseName,
                        },
                        {
                          label: 'House number',
                          name: 'houseNumber',
                          onChange: handleChange,
                          ...houseNumber,
                        },
                        {
                          label: 'Street',
                          name: 'street',
                          onChange: handleChange,
                          required: true,
                          ...street,
                        },
                        {
                          label: 'District',
                          name: 'district',
                          onChange: handleChange,
                          ...district,
                        },
                        {
                          label: 'Town',
                          name: 'town',
                          onChange: handleChange,
                          required: true,
                          ...town,
                        },
                        {
                          label: 'County',
                          name: 'county',
                          onChange: handleChange,
                          ...county,
                        },
                      ]}
                    />

                    <InputPhone
                      label="Telephone number"
                      placeholder="e.g. 07712345678"
                      name="telephone"
                      subTitle="To keep you up to date with your purchase"
                      errorMessage="Please enter a valid phone number"
                      useErrorBorder={false}
                      status={phone.status}
                      value={phone.value}
                      onChange={handlePhoneChange}
                    />

                    {!productAdvertId && (
                      <InputText
                        label="Annual income"
                        name="currentIncome"
                        subTitle="Enter your annual income before any tax and including commission payments"
                        errorMessage="Please enter your annual income. Your income must be greater than or equal to £2000"
                        placeholder="per year"
                        required
                        value={currentIncome.value}
                        status={currentIncome.status}
                        onChange={incomeValueChange}
                      />
                    )}

                    <Button type="submit">Submit</Button>
                    <p className={s.ps}>
                      Once submitted we&apos;ll do a &apos;soft search&apos; with the
                      credit reference agencies. You&apos;ll be able to see this on
                      your credit rating, but no-one else will, so your credit rating
                      won&apos;t be affected at all.
                    </p>
                  </form>

                  <PrivacyNotice onChange={onUnsub} unsubscribe={unsubscribe} />
                </>
              )}
            </div>
          </>
        )
      }
    </>
  );
}
