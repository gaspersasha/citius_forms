import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useUserContext } from '~contexts';
import { InputPassword, InputEmail, Button, Spinner } from '~components';
import { INPUT_STATUS } from '~constants';
import {
  endpointPush,
  checkEmail,
  checkNotEmpty,
  GTM_EVENT,
  GTM_GA,
} from '~utils';
import s from './login-popup.module.sass';

function Login(props) {
  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const {
    actions: { setUserState },
  } = useUserContext();

  function collectFormData() {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);
    props.source && formData.append('source', props.source);

    return formData;
  }

  function login(e) {
    e.preventDefault();

    if (!checkEmail(email) || !checkNotEmpty(password)) {
      return setError('Incorrect values');
    }

    GTM_GA('User clicked login', 'login popup');
    setLoading(true);

    endpointPush('POST', 'userDetails', {}, collectFormData())
      .then((data) => {
        setLoading(false);

        return data;
      })
      .then((data) => data.replace('userDetails(', '').replace(');', ''))
      .then((data) => {
        const parsed = JSON.parse(data);

        if (parsed?.error === 'Invalid login') {
          throw parsed.error;
        }

        GTM_EVENT('user-login');
        setUserState({ ...parsed.user, isLoggedIn: true, isLoading: false });
      })
      .catch(() => setError('Account email or password is not recognised'));
  }

  function exit() {
    GTM_GA('User dismissed sign in', 'login popup');
    props.handleLoginClose();
  }

  function forgotPwd() {
    GTM_GA('User clicked forgotten password', 'login popup');
  }

  return (
    <div>
      <div onClick={exit} className={s.overlay} role="dialog" />
      <div className={cn(s.container, 'open')}>
        {isLoading && (
          <div className={s.overlay}>
            <Spinner />
          </div>
        )}

        <div className={s.modal}>
          <h4>Welcome back</h4>
          <h5>
            From your email address it looks like you already have an account
            with us.
          </h5>
          {error && (
            <p className="warning" data-id="with-error">
              {error}
            </p>
          )}

          <form className={s.form}>
            <InputEmail
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                checkEmail(email) ? INPUT_STATUS.VALID : INPUT_STATUS.INVALID
              }
              label="Email"
              required
            />
            <InputPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                checkNotEmpty(password)
                  ? INPUT_STATUS.VALID
                  : INPUT_STATUS.INVALID
              }
              autoFocus
              required
            />
            <div className={s.footer}>
              <Button className={s.loginButton} type="button" onClick={() => login()}>
                Login
              </Button>
            </div>
          </form>

          <a
            href="/mybuyacar/forgottenPassword.jhtml"
            target="_blank"
            data-id="forgot-pass-link"
            onClick={forgotPwd}
          >
            Forgotten your password?
          </a>

          <Button
            onClick={() => exit()}
            className={s.buttonSkip}
            styleType="cancel"
            type="button"
            data-id="login-cancel"
          >
            Use an alternative email
          </Button>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  source: PropTypes.string,
  handleLoginClose: PropTypes.func,
};

Login.defaultProps = {
  source: '',
  handleLoginClose: () => {},
};

export default Login;
