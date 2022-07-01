import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { INPUT_STATUS } from '~constants';
import s from './label.module.sass';

const Label = ({ title, customClasses, name, children, status, withSub }) => (
  <div
    className={cn(s.label, customClasses, {
      'error-input-label': status === INPUT_STATUS.INVALID,
    })}
  >
    <label
      htmlFor={name || ''}
      data-id={status === INPUT_STATUS.INVALID && 'with-error'}
    >
      <span
        className={cn(s.title, withSub && s.halfMargin)}
        data-id="label-title"
      >
        {title}
      </span>
      {children}
    </label>
  </div>
);

Label.propTypes = {
  customClasses: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  children: PropTypes.any,
  status: PropTypes.string,
  withSub: PropTypes.bool,
};

Label.defaultProps = {
  title: '',
  customClasses: '',
  name: '',
  children: null,
  status: INPUT_STATUS.DEFAULT,
  withSub: false,
};

export default Label;
