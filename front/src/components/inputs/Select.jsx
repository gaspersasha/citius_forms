import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputSelect = ({
  name,
  value,
  label,
  status,
  options,
  subTitle,
  required,
  placeholder,
  className,
  ...rest
}) => {
  const inputClassName = cn(
    {
      'success-input-border': status === INPUT_STATUS.VALID,
      'error-input-border': status === INPUT_STATUS.INVALID,
      'select-placeholder': !value,
    },
    className
  );

  const optionsList = options.map((item) => (
    <option value={item.value} key={item.value}>
      {item.option}
    </option>
  ));

  return (
    <Label
      name={name}
      title={label}
      status={status}
      required={required}
      withSub={!!subTitle}
    >
      {subTitle && <span className="label-sub-title">{subTitle}</span>}
      <select
        className={inputClassName}
        value={value || placeholder}
        name={name}
        {...rest}
      >
        {placeholder && (
          <option key="un1quekey123" disabled value={placeholder}>
            {placeholder}
          </option>
        )}
        {optionsList}
      </select>
    </Label>
  );
};

InputSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      option: PropTypes.any.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  status: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  subTitle: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

InputSelect.defaultProps = {
  className: '',
  required: false,
  name: '',
  subTitle: '',
  value: '',
  status: '',
  placeholder: '',
  label: '',
};

export default InputSelect;
