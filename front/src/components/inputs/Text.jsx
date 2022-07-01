import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputText = ({
  label,
  status,
  name,
  required,
  customClasses,
  className,
  placeholder,
  subTitle,
  errorMessage,
  children,
  ...rest
}) => {
  const inputClassName = cn(
    { 'error-input-border': status === INPUT_STATUS.INVALID },
    className
  );
  const isInvalid = errorMessage && status === INPUT_STATUS.INVALID;
  const withSub = !!(subTitle || isInvalid);

  return (
    <Label
      name={name}
      title={label}
      status={status}
      required={required}
      customClasses={customClasses}
      withSub={withSub}
    >
      {withSub && (
        <span
          className={cn(
            { 'warning-label-subtitle': isInvalid },
            'label-sub-title'
          )}
          data-id="input-text-sub"
        >
          {isInvalid ? errorMessage : subTitle}
        </span>
      )}
      <input
        type="text"
        name={name}
        placeholder={placeholder || label}
        className={inputClassName}
        {...rest}
      />
      {children}
    </Label>
  );
};

InputText.propTypes = {
  customClasses: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  status: PropTypes.string,
  name: PropTypes.string,
  subTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  children: PropTypes.any,
};

InputText.defaultProps = {
  customClasses: '',
  className: '',
  required: false,
  name: '',
  subTitle: '',
  errorMessage: '',
  label: '',
  status: '',
  placeholder: '',
  children: null,
};

export default InputText;
