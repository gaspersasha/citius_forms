import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Modal } from '~components';
import { useUserContext } from '~contexts';
import {
  endpointPush,
  endpointFetch,
  checkEmail,
  getObjProperty,
  getGaClientId,
  generateScriptTag,
  removeScriptTag,
  preventBodyScroll,
} from '~utils';
import { GTM } from '~services';
import { FormLogin, FormSignUp, FormReset } from '.';
import s from './auth.module.sass';

const AuthModal = ({ activeForm, setActiveForm, onModalClose }) => {
  const initialState = {
    rememberMe: true,
    unsubscribe: false,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
    recaptchaToken: '',
  };

  const [
    {
      rememberMe,
      unsubscribe,
      email,
      password,
      firstName,
      lastName,
      error,
      recaptchaToken,
    },
    setState,
  ] = useState(initialState);

  const isReCaptchaVisible = ['signup', 'reset'].includes(activeForm);

  const {
    actions: { setUserState },
  } = useUserContext();
  const [siteKey, setSiteKey] = useState('');

  useEffect(() => {
    endpointFetch('captchaSiteKey').then(({ siteKey: value }) =>
      setSiteKey(value)
    );
  }, []);

  useEffect(() => {
    const scriptId = 'recaptcha-v3';

    preventBodyScroll(true);
    isReCaptchaVisible &&
      generateScriptTag(
        `https://www.google.com/recaptcha/api.js?render=${siteKey}`,
        scriptId
      );

    return () => {
      removeScriptTag(scriptId, '.grecaptcha-badge');
      preventBodyScroll(false);
    };
  }, [isReCaptchaVisible]);

  const clearStateFields = () => {
    setState({ ...initialState });
  };

  const changeState = (field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const checkIsEmpty = (params) =>
    Object.keys(params).filter((key) => params[key].length === 0);

  const checkError = (data) => {
    const status = getObjProperty(data, 'response.data.status');
    const message = getObjProperty(data, 'response.data.message');

    if (status === 'error') throw new Error(message);
  };

  const onClose = () => {
    clearStateFields();
    onModalClose();
  };

  const extendedActiveForm = (form) => {
    clearStateFields();
    setActiveForm(form);
  };

  const executeRecaptcha = () => {
    window.grecaptcha
      .execute(siteKey, { action: activeForm })
      .then((token) => changeState('recaptchaToken', token));
  };

  const successHandler = (data = {}) => {
    checkError(data);

    if (activeForm === 'reset') {
      return extendedActiveForm('resetSuccess');
    }

    window.ga(
      'send',
      'pageview',
      '/virtual/main-nav-registration-form-complete?completedAction=registration_newlySaved'
    );
    onClose();
  };

  const formatEmptyFieldsValue = (emptyFields) => {
    const newValue = emptyFields;

    if (activeForm === 'signup') {
      emptyFields.map((value, i) => {
        if (value === 'firstName') newValue[i] = 'first name';
        if (value === 'lastName') newValue[i] = 'last name';

        return newValue;
      });
    }

    return newValue.join(', ').replace(/,(?=[^,]*$)/, ' and');
  };

  const sendPermutiveTag = (data) => {
    if (window.permutive) {
      window.permutive.track('Registered', {});
    }

    return data;
  };

  const parseLoginData = (data) =>
    data.replace('userDetails(', '').replace(');', '');

  const loginSuccess = (data) => {
    const parsedData = JSON.parse(data);
    const { user } = parsedData;

    if (
      Object.prototype.hasOwnProperty.call(parsedData, 'error') &&
      parsedData.error === 'Invalid login'
    ) {
      throw new Error(parsedData.error);
    } else {
      // TODO: Move this part into logic layer
      setUserState({ ...user, isLoggedIn: Boolean(user.id) });
    }

    GTM.setUserId(user.id);
    onClose();
  };

  const loginFailure = () =>
    changeState('error', 'Account email or password is not recognised');

  const requestFailure = (err) => {
    const message = getObjProperty(err, 'response.data.message');
    const defaultMessage = 'Something went wrong, try one more time later';

    window.grecaptcha.reset(siteKey);
    executeRecaptcha();
    changeState('error', message || defaultMessage);
  };

  const resetRequest = () => {
    changeState('error', '');
    const headers = { 'g-recaptcha-response': recaptchaToken };
    const emptyFields = checkIsEmpty({ email });

    if (emptyFields.length) {
      return changeState('error', `Please enter your ${emptyFields}`);
    }

    if (!checkEmail(email)) {
      return changeState('error', 'Please enter a valid email address');
    }

    const formData = new FormData();

    formData.append('email', email);

    return endpointPush('POST', 'passwordReminder', {}, formData, headers)
      .then(successHandler)
      .catch(requestFailure);
  };

  const signupRequest = () => {
    changeState('error', '');
    const headers = { 'g-recaptcha-response': recaptchaToken };
    const clientId = getGaClientId();
    const emptyFields = checkIsEmpty({
      email,
      password,
      firstName,
      lastName,
    });
    const formattedEmptyFields = formatEmptyFieldsValue(emptyFields);

    if (emptyFields.length) {
      return changeState('error', `Please enter your ${formattedEmptyFields}`);
    }

    if (!checkEmail(email)) {
      return changeState('error', 'Please enter a valid email address');
    }

    const formData = new FormData();
    const params = {
      email,
      password,
      rememberMe,
      firstName,
      lastName,
      clientId,
      unsubscribe,
    };

    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    return endpointPush('POST', 'registerNewUser', {}, formData, headers)
      .then(sendPermutiveTag)
      .then((data) => {
        checkError(data);
      })
      .then(() => endpointPush('POST', 'userDetails', {}, {}))
      .then(parseLoginData)
      .then(loginSuccess)
      .catch(requestFailure);
  };

  const sendDataToServer = () => {
    switch (activeForm) {
      case 'reset':
        return resetRequest();
      case 'signup':
        return signupRequest();
      case 'login':
      case 'resetSuccess':
      default:
        return null;
    }
  };

  useEffect(() => {
    recaptchaToken && !error && sendDataToServer();
  }, [recaptchaToken]);

  const loginRequest = (e) => {
    e.preventDefault();
    changeState('error', '');

    const clientId = getGaClientId();
    const emptyFields = checkIsEmpty({ email, password });
    const formattedEmptyFields = formatEmptyFieldsValue(emptyFields);

    if (emptyFields.length) {
      return changeState('error', `Please enter your ${formattedEmptyFields}`);
    }

    if (!checkEmail(email)) {
      return changeState('error', 'Please enter a valid email address');
    }

    const formData = new FormData();
    const params = {
      email,
      password,
      rememberMe,
      clientId,
    };

    Object.keys(params).forEach((key) => formData.append(key, params[key]));

    return endpointPush('POST', 'userDetails', {}, formData)
      .then(parseLoginData)
      .then(loginSuccess)
      .catch(loginFailure);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (recaptchaToken) return sendDataToServer();

    return executeRecaptcha();
  };

  return (
    <Modal isDark onClose={onClose} classModifier="modal__auth">
      <div className={s.authentication}>
        {activeForm === 'login' && (
          <FormLogin
            extendedActiveForm={extendedActiveForm}
            setFieldValue={changeState}
            isUserRemembered={rememberMe}
            onSubmit={loginRequest}
            emailValue={email}
            errorMessage={error}
            activeForm={activeForm}
          />
        )}
        {activeForm === 'signup' && (
          <FormSignUp
            setFieldValue={changeState}
            extendedActiveForm={extendedActiveForm}
            firstNameValue={firstName}
            lastNameValue={lastName}
            isUserRemembered={rememberMe}
            isUnsubscribed={unsubscribe}
            onSubmit={submitHandler}
            emailValue={email}
            errorMessage={error}
            activeForm={activeForm}
          />
        )}
        {activeForm === 'reset' && (
          <FormReset
            extendedActiveForm={extendedActiveForm}
            setFieldValue={changeState}
            onSubmit={submitHandler}
            errorMessage={error}
            emailValue={email}
          />
        )}
        {activeForm === 'resetSuccess' && (
          <div
            className={cn(s.row, s.row__hugeVerticalSpace, s.reset__success)}
          >
            <h6 className={cn(s.typo, s.title)}>
              Your password reminder has been sent to you
            </h6>
            <div className={cn(s.typo, s.typo__small, s.subTitle)}>
              Please follow the instructions on your email
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

AuthModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  setActiveForm: PropTypes.func.isRequired,
  activeForm: PropTypes.oneOf(['login', 'signup', 'reset', 'resetSuccess'])
    .isRequired,
};

export default AuthModal;
