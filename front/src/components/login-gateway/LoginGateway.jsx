import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthModal } from '~containers/authentication';
import { Button, Typography, Spinner } from '~components';
import { useUserContext } from '~contexts';
import s from './login-gateway.module.sass';

const LoginGateway = ({ children }) => {
  const { user } = useUserContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleClick = () => {
    setFormType('login');
    setModalOpen(true);
  };

  const render = user.isLoggedIn ? (
    children
  ) : (
    <>
      {isModalOpen && (
        <AuthModal
          onModalClose={() => setModalOpen(false)}
          activeForm={formType}
          setActiveForm={(form) => setFormType(form)}
        />
      )}
      <div className={s.wrapper}>
        <Typography type="h2">Please log in</Typography>
        <Typography className={s.msg}>
          You need to be logged in to access this page, please log in via the
          link below
        </Typography>
        <Button onClick={handleClick}>Log in</Button>
      </div>
    </>
  );

  return user.isLoading ? <Spinner /> : render;
};

LoginGateway.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginGateway;
