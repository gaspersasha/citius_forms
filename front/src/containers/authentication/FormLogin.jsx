import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { AuthForm } from '.';
import s from './auth.module.sass';

const FormLogin = ({
  extendedActiveForm,
  activeForm,
  setFieldValue,
  isUserRemembered,
  onSubmit,
  errorMessage,
  emailValue,
}) => (
  <form onSubmit={onSubmit}>
    <div className={s.wrapper}>
      <AuthForm
        title="Sign in to your BuyaCar account"
        subTitle="Enter your email address and password"
        setFieldValue={setFieldValue}
        isUserRemembered={isUserRemembered}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        activeForm={activeForm}
        emailValue={emailValue}
      />
      <div className={cn(s.row, s.row__middleBottomSpace)}>
        <span
          onClick={() => extendedActiveForm('reset')}
          role="button"
          tabIndex={0}
          className={cn(s.typo, s.typo__small, s.forgotPassword)}
        >
          Forgot password?
        </span>
      </div>
      <p className={cn(s.typo, s.typo__small, s.link)}>
        <span>Don’t have an account? </span>
        <b
          data-id="link"
          role="dialog"
          onClick={() => extendedActiveForm('signup')}
        >
          Sign up
        </b>
      </p>
    </div>
  </form>
);

FormLogin.defaultProps = {
  errorMessage: '',
  activeForm: 'login',
  emailValue: '',
};

FormLogin.propTypes = {
  extendedActiveForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUserRemembered: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  activeForm: PropTypes.string,
  errorMessage: PropTypes.string,
  emailValue: PropTypes.string,
};

export default FormLogin;
