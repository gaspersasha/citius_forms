import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, InputEmail, InputPassword } from '~components';
import { INPUT_STATUS } from '~constants';
import { fieldShape } from './Details';
import s from './styles/sign.module.sass';
import ss from './styles/details.module.sass';

const SignIn = ({ names, fields, handleChange }) => (
  <div className={s.signin}>
    <div className={s.signinInner}>
      <Typography type="h4" className={cn(s.signinHead, ss.heading)}>
        Your sign in details
      </Typography>
      <InputEmail
        id={names.email}
        name={names.email}
        value={fields.email.value}
        onChange={handleChange}
        status={fields.email.status}
        className={ss.input}
        label="Email"
        placeholder="Your email will be your user name"
        required
      />
      <div className="form-input">
        <InputEmail
          id={names.emailConfirm}
          name={names.emailConfirm}
          value={fields.emailConfirm.value}
          onChange={handleChange}
          status={fields.emailConfirm.status}
          className={ss.input}
          label="Confirm email"
          required
        />
        {fields.emailConfirm.status === INPUT_STATUS.MISSMATCH && (
          <p className="error-msg">
            The email addresses you entered do not match
          </p>
        )}
      </div>
      <Typography className={s.signinHint}>
        If you wish to change your password enter the new one here, otherwise
        leave it blank to keep your current password.
      </Typography>
      <InputPassword
        id={names.password}
        name={names.password}
        onChange={handleChange}
        status={fields.password.status}
        className={ss.input}
        autoComplete="off"
      />
      <div className="form-input">
        <InputPassword
          id={names.passwordConfirm}
          name={names.passwordConfirm}
          onChange={handleChange}
          className={ss.input}
          status={fields.passwordConfirm.status}
          autoComplete="off"
          label="Confirm password"
        />
        {fields.password.status === INPUT_STATUS.MISSMATCH && (
          <p className="error-msg">
            Confirm password must be the same as password
          </p>
        )}
        {fields.password.status === INPUT_STATUS.INVALID && (
          <p className="error-msg">
            The password you entered is weak. Password should be at least 8
            characters long, containing uppercase, lowercase, numeric symbols
            and special characters such as !,@,#,%,&,*,?,£.
          </p>
        )}
      </div>
    </div>
  </div>
);

SignIn.propTypes = {
  fields: PropTypes.shape({
    email: fieldShape,
    emailConfirm: fieldShape,
    password: fieldShape,
    passwordConfirm: fieldShape,
  }).isRequired,
  names: PropTypes.shape({
    email: PropTypes.string,
    emailConfirm: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SignIn;
