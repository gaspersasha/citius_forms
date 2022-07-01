import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './spinner.module.sass';

const Spinner = ({ className, ...rest }) => (
  <div className={s.container} {...rest}>
    <div className={cn(s.loader, className)} />
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
};
Spinner.defaultProps = {
  className: '',
};

export default Spinner;
