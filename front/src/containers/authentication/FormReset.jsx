import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { InputEmail, Button } from '~components';
import s from './auth.module.sass';

const FormReset = ({
  extendedActiveForm,
  onSubmit,
  errorMessage,
  setFieldValue,
  emailValue,
}) => {
  const onChangeField = ({ target: { name, value } }) =>
    setFieldValue(name, value);

  return (
    <form onSubmit={onSubmit}>
      <div className={s.reset}>
        <h6 className={cn(s.typo, s.title)}>Reset password</h6>
        <span className={cn(s.typo, s.typo__small, s.subTitle)}>
          Enter the email address associated with your account, and we&#39;ll
          email you a link to reset your password.
        </span>
        {errorMessage && (
          <div className={cn(s.row, s.row__withError)} data-id="with-error">
            <span className={s.errorMessage} data-id="error-message">
              {errorMessage}
            </span>
          </div>
        )}
        <div className={s.row}>
          <div className={s.email}>
            <InputEmail
              name="email"
              autoFocus
              value={emailValue}
              placeholder="Email Address"
              onChange={onChangeField}
              customClasses="auth"
              className={cn(s.typo, s.input)}
            />
          </div>
        </div>
        <div className={s.action}>
          <div className={s.action__back}>
            <span
              id="authBack"
              role="dialog"
              className={cn(s.typo, s.typo__small, s.back)}
              onClick={() => extendedActiveForm('login')}
            >
              Back to login
            </span>
          </div>
          <div className={cn(s.row, s.row__half, s.row__withoutBottomSpace)}>
            <Button
              type="submit"
              onClick={onSubmit}
              className={cn(s.typo, s.submit)}
            >
              Send reset link
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

FormReset.propTypes = {
  extendedActiveForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  emailValue: PropTypes.string,
};

FormReset.defaultProps = {
  emailValue: '',
};

export default FormReset;
