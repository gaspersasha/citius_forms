import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// TODO: Some strange styles fetching here
import s from '~components/header/styles/header.module.sass';

const AuthenticationLink = ({ children, openModal, className, dataId }) => (
  <li className={s.leaf}>
    <span
      onClick={openModal}
      data-id={dataId}
      className={cn(s.link, className)}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  </li>
);

AuthenticationLink.defaultProps = {
  className: '',
  dataId: '',
};

AuthenticationLink.propTypes = {
  openModal: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  dataId: PropTypes.string,
  className: PropTypes.string,
};

export default AuthenticationLink;
