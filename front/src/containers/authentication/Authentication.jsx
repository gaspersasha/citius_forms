import React from 'react';
import { AuthWrapper, AuthLink } from '.';

import s from './auth.module.sass';

const Authentication = () => (
  <AuthWrapper>
    {({ openModal }) => (
      <ul className={s.authButtonsWrapper}>
        <AuthLink dataId="button-login" openModal={() => openModal('login')}>
          Login
        </AuthLink>
        <AuthLink dataId="button-signup" openModal={() => openModal('signup')}>
          Sign Up
        </AuthLink>
      </ul>
    )}
  </AuthWrapper>
);

export default Authentication;
