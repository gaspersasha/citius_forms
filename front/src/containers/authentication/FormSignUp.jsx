import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { InputCheckbox } from '~components';
import { URL } from '~constants';
import { AuthForm } from '.';
import s from './auth.module.sass';

const { PRIVACY_EXT, BRANDS } = URL;

const FormSignUp = ({
  extendedActiveForm,
  isUserRemembered,
  onSubmit,
  errorMessage,
  activeForm,
  firstNameValue,
  lastNameValue,
  setFieldValue,
  isUnsubscribed,
  emailValue,
}) => (
  <form onSubmit={onSubmit}>
    <div className={s.wrapper}>
      <AuthForm
        title="Create a BuyaCar account"
        subTitle="Enter your email address and password"
        setFieldValue={setFieldValue}
        isUserRemembered={isUserRemembered}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        activeForm={activeForm}
        firstNameValue={firstNameValue}
        lastNameValue={lastNameValue}
        emailValue={emailValue}
      />
      <p className={cn(s.typo, s.typo__small, s.link)}>
        <span>Already have a BuyaCar account? </span>
        <b
          data-id="link"
          onClick={() => extendedActiveForm('login')}
          role="dialog"
        >
          Login
        </b>
      </p>
      <div className={s.privacyNotice}>
        <p>
          Privacy Notice
          <br />
          We will use the details you have shared to manage your car purchase.
          You agree to the processing, storage, sharing and use of this
          information for the purpose of managing your car purchase as described
          in our
          <a
            className={s.privacyLinks}
            href={PRIVACY_EXT}
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;Privacy Policy
          </a>
          .
        </p>
        <div className={s.field_type_text__auth}>
          We believe that based on this purchase you may be interested in other
          related products and services we offer. As described in our
          <a
            className={s.privacyLinks}
            href={PRIVACY_EXT}
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;Privacy Policy&nbsp;
          </a>
          we will use the information you have shared to send you communications
          about such products and services. If you do not wish to receive these
          communications from us then please click here and you will be
          unsubscribed from this activity.
          <InputCheckbox
            onChange={() => setFieldValue('unsubscribe', !isUnsubscribed)}
            checked={isUnsubscribed}
            customClasses="sign_up"
            className={cn(s.checkbox, s.checkbox__unsubscribe)}
          />
        </div>
        <p>
          We includes BuyaCar, AutoExpress, Carbuyer, evo and other Autovia
          Group brands as
          <a
            className={s.privacyLinks}
            href={BRANDS}
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;detailed here
          </a>
          .
        </p>
      </div>
    </div>
  </form>
);

FormSignUp.defaultProps = {
  errorMessage: '',
  firstNameValue: '',
  lastNameValue: '',
  isUnsubscribed: false,
  emailValue: '',
};

FormSignUp.propTypes = {
  extendedActiveForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUserRemembered: PropTypes.bool.isRequired,
  activeForm: PropTypes.string.isRequired,
  isUnsubscribed: PropTypes.bool,
  errorMessage: PropTypes.string,
  firstNameValue: PropTypes.string,
  lastNameValue: PropTypes.string,
  emailValue: PropTypes.string,
};

export default FormSignUp;
