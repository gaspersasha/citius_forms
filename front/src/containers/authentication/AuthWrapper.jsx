import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthModal } from '.';

const AuthWrapper = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const setActiveForm = (form) => setFormType(form);
  const onModalClose = () => setModalOpen(false);

  const onToggleModal = (form) => {
    setActiveForm(form);
    setModalOpen(true);
  };

  return (
    <>
      {children({ openModal: onToggleModal })}
      {isModalOpen && (
        <AuthModal
          onModalClose={onModalClose}
          activeForm={formType}
          setActiveForm={setActiveForm}
        />
      )}
    </>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default AuthWrapper;
