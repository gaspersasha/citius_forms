import React from 'react';
import PropTypes from 'prop-types';
import s from './styles/account-vehicle-card.module.sass';

const MaybeLink = ({ children, status, path, leadgen }) =>
  status || leadgen ? (
    <>{children}</>
  ) : (
    <a className={s.linkWrapper} href={path}>
      {children}
    </a>
  );

MaybeLink.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  leadgen: PropTypes.bool.isRequired,
};

export default MaybeLink;
