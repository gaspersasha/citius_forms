import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  InputCheckbox,
  InputEmail,
  InputPassword,
  InputText,
  Button,
} from '~components';
import s from './auth.module.sass';

const AuthForm = ({
  title,
  subTitle,
  activeForm,
  setFieldValue,
  isUserRemembered,
  onSubmit,
  errorMessage,
  firstNameValue,
  lastNameValue,
  emailValue,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onChangeField = ({ target: { name, value } }) => {
    setFieldValue(name, value);
  };

  const onChangeRememberMe = () => {
    setFieldValue('rememberMe', !isUserRemembered);
  };

  const setPasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <>
      <h6 className={cn(s.typo, s.title)}>{title}</h6>
      <span className={cn(s.typo, s.typo__small, s.subTitle)}>{subTitle}</span>
      {errorMessage && (
        <div data-id="with-error" className={cn(s.row, s.row__withError)}>
          <span className={s.errorMessage}>{errorMessage}</span>
        </div>
      )}
      {activeForm === 'signup' && (
        <>
          <div className={s.row}>
            <div className={s.firstName}>
              <InputText
                id="firstName"
                placeholder="First Name"
                name="firstName"
                value={firstNameValue}
                onChange={onChangeField}
                className={cn(s.typo, s.input)}
                customClasses="auth"
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.lastName}>
              <InputText
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                value={lastNameValue}
                onChange={onChangeField}
                className={cn(s.typo, s.input)}
                customClasses="auth"
              />
            </div>
          </div>
        </>
      )}
      <div className={s.row}>
        <div className={s.email}>
          <InputEmail
            id="authEmail"
            name="email"
            placeholder="Email Address"
            autoFocus
            label={false}
            value={emailValue}
            onChange={onChangeField}
            customClasses="auth"
            className={cn(s.typo, s.input)}
          />
        </div>
      </div>
      <div className={s.row}>
        <div className={s.password}>
          <InputPassword
            id="userPassword"
            onChange={onChangeField}
            label={false}
            name="password"
            type={isPasswordHidden ? 'password' : 'text'}
            customClasses="auth"
            className={cn(s.typo, s.input)}
          />
        </div>
      </div>
      <div className={cn(s.row, s.row__largeBottomSpace)}>
        <InputCheckbox
          id="authRememberMe"
          onChange={onChangeRememberMe}
          checked={isUserRemembered}
          label="Remember me"
          customClasses="auth"
          className={s.checkbox}
        />
        <span
          className={cn(s.typo, s.typo__small, s.typo__pointer)}
          onClick={setPasswordVisibility}
          role="button"
          data-id="toggle-pass"
          tabIndex={0}
        >
          {isPasswordHidden ? 'Show password' : 'Hide password'}
        </span>
      </div>
      <div className={cn(s.row, s.row__middleBottomSpace)}>
        <Button
          type="submit"
          onClick={onSubmit}
          data-id="login"
          className={cn(s.typo, s.submit)}
        >
          {activeForm === 'login' ? 'Login' : 'Sign Up'}
        </Button>
      </div>
    </>
  );
};

AuthForm.defaultProps = {
  errorMessage: '',
  firstNameValue: '',
  lastNameValue: '',
  emailValue: '',
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUserRemembered: PropTypes.bool.isRequired,
  activeForm: PropTypes.string.isRequired,
  firstNameValue: PropTypes.string,
  lastNameValue: PropTypes.string,
  errorMessage: PropTypes.string,
  emailValue: PropTypes.string,
};

export default AuthForm;
