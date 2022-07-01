import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import MaskedTextInput from 'react-text-mask';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputMaskText = ({
  type,
  label,
  mask,
  className,
  status,
  name,
  subTitle,
  required,
  placeholder,
  children,
  ...rest
}) => {
  const inputClassName = cn(
    {
      'error-input-border': status === INPUT_STATUS.INVALID,
    },
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
      <MaskedTextInput
        type={type || 'text'}
        mask={mask}
        guide={false}
        className={inputClassName}
        name={name}
        placeholder={placeholder || label}
        {...rest}
      />
      {children}
    </Label>
  );
};

InputMaskText.propTypes = {
  type: PropTypes.any,
  className: PropTypes.string,
  mask: PropTypes.array,
  status: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  subTitle: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.any,
};

InputMaskText.defaultProps = {
  type: 'text',
  className: '',
  mask: [],
  required: false,
  name: '',
  label: '',
  subTitle: '',
  status: '',
  placeholder: '',
  children: null,
};

export default InputMaskText;
