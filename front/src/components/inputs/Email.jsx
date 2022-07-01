import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputEmail = ({
  label,
  status,
  required,
  customClasses,
  name,
  placeholder,
  subTitle,
  errorMessage,
  useErrorBorder,
  className,
  ...rest
}) => {
  const inputClassName = cn(
    {
      'error-input-border':
        (status === INPUT_STATUS.INVALID && useErrorBorder) ||
        status === INPUT_STATUS.MISSMATCH,
    },
    className
  );
  const isInvalid =
    errorMessage !== '' &&
    (status === INPUT_STATUS.INVALID || status === INPUT_STATUS.MISSMATCH);
  const withSub = !!(subTitle || isInvalid);

  return (
    <Label
      name={name}
      required={required}
      customClasses={customClasses}
      status={status}
      title={label}
      withSub={withSub}
    >
      {withSub && (
        <span
          data-id="input-email-subtitle"
          className={cn(
            { 'warning-label-subtitle': isInvalid },
            'label-sub-title'
          )}
        >
          {isInvalid ? errorMessage : subTitle}
        </span>
      )}
      <input
        type="email"
        className={inputClassName}
        name={name}
        placeholder={placeholder || 'Enter your email address'}
        {...rest}
      />
    </Label>
  );
};

InputEmail.propTypes = {
  required: PropTypes.bool,
  subTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  useErrorBorder: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  customClasses: PropTypes.string,
  className: PropTypes.string,
};

InputEmail.defaultProps = {
  required: false,
  label: '',
  subTitle: '',
  errorMessage: 'The email address you entered is not valid, please try again',
  useErrorBorder: true,
  status: '',
  placeholder: '',
  name: '',
  customClasses: '',
  className: '',
};

export default InputEmail;
