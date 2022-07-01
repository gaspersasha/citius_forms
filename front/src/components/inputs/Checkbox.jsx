import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';
import s from './styles/checkbox.module.sass';

const InputCheckbox = ({
  name,
  label,
  status,
  className,
  customClasses,
  ...rest
}) => {
  const inputClassName = cn(
    {
      'error-form-border':
        status === INPUT_STATUS.INVALID || status === INPUT_STATUS.MISSMATCH,
    },
    className
  );

  return (
    <div className={cn(s.wrapper, s[customClasses])}>
      <input type="checkbox" className={inputClassName} name={name} {...rest} />
      {label && (
        <Label
          customClasses={customClasses}
          name={name}
          title={label}
          status={status}
        />
      )}
    </div>
  );
};

InputCheckbox.propTypes = {
  customClasses: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  status: PropTypes.string,
};

InputCheckbox.defaultProps = {
  customClasses: '',
  className: '',
  name: '',
  label: '',
  status: '',
};

export default InputCheckbox;
