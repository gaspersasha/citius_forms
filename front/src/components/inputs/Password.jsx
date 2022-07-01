import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputPassword = ({
  type,
  name,
  value,
  label,
  status,
  subTitle,
  required,
  className,
  customClasses,
  ...rest
}) => {
  const inputClassName = cn(
    {
      'error-input-border':
        status === INPUT_STATUS.INVALID || status === INPUT_STATUS.MISSMATCH,
    },
    className
  );

  return (
    <Label
      name={name}
      required={required}
      title={label}
      customClasses={customClasses}
      status={status}
      withSub={!!subTitle}
    >
      {subTitle && <span className="label-sub-title">{subTitle}</span>}
      <input
        data-id="password-input"
        className={inputClassName}
        defaultValue={value}
        name={name}
        type={type}
        placeholder="Enter your password"
        {...rest}
      />
    </Label>
  );
};

InputPassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subTitle: PropTypes.string,
  customClasses: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  status: PropTypes.string,
};

InputPassword.defaultProps = {
  required: false,
  label: 'Password',
  customClasses: '',
  className: '',
  subTitle: '',
  value: '',
  name: '',
  status: '',
  type: 'password',
};

export default InputPassword;
