import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';
import { preventSymbols } from '~utils';

const InputNumber = ({
  label,
  className,
  status,
  name,
  required,
  subTitle,
  placeholder,
  children,
  onKeyPress,
  ...rest
}) => {
  const inputClassName = cn(
    { 'error-input-border': status === INPUT_STATUS.INVALID },
    className
  );

  return (
    <Label
      name={name}
      title={label}
      required={required}
      status={status}
      withSub={!!subTitle}
    >
      {subTitle && <span className="label-sub-title">{subTitle}</span>}
      <input
        type="number"
        className={inputClassName}
        name={name}
        placeholder={placeholder || label}
        onKeyPress={onKeyPress || preventSymbols}
        {...rest}
      />
      {children}
    </Label>
  );
};

InputNumber.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  subTitle: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.any,
  onKeyPress: PropTypes.func,
};

InputNumber.defaultProps = {
  className: '',
  required: false,
  name: '',
  subTitle: '',
  status: '',
  label: '',
  placeholder: '',
  children: null,
  onKeyPress: null,
};

export default InputNumber;
