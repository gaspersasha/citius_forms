import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';
import { preventSymbols, formatPreselectPhone } from '~utils';

const InputPhone = ({
  label,
  className,
  status,
  name,
  subTitle,
  errorMessage,
  useErrorBorder = true,
  required,
  placeholder,
  children,
  onChange,
  onKeyPress,
  ...rest
}) => {
  const inputClassName = cn(
    { 'error-input-border': status === INPUT_STATUS.INVALID && useErrorBorder },
    className
  );
  const isInvalid = errorMessage && status === INPUT_STATUS.INVALID;
  const withSub = !!(subTitle || isInvalid);

  const handleChange = (e) => {
    // TODO: Check the validity of this util func
    e.target.value = formatPreselectPhone(e.target.value);

    onChange(e);
  };

  return (
    <Label
      name={name}
      title={label}
      status={status}
      required={required}
      withSub={withSub}
    >
      {withSub && (
        <span
          className={cn(
            { 'warning-label-subtitle': isInvalid },
            'label-sub-title'
          )}
        >
          {isInvalid ? errorMessage : subTitle}
        </span>
      )}
      <input
        type="tel"
        className={inputClassName}
        name={name}
        placeholder={placeholder || label}
        onChange={handleChange}
        onKeyPress={onKeyPress || preventSymbols}
        {...rest}
      />
      {children}
    </Label>
  );
};

InputPhone.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  status: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errorMessage: PropTypes.string,
  useErrorBorder: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.any,
  onKeyPress: PropTypes.func,
};

InputPhone.defaultProps = {
  className: '',
  required: false,
  name: '',
  subTitle: '',
  errorMessage: '',
  useErrorBorder: true,
  status: '',
  label: '',
  placeholder: '',
  children: null,
  onKeyPress: null,
};

export default InputPhone;
