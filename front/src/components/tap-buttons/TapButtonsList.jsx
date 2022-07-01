import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { INPUT_STATUS } from '~constants';
import s from './styles/tap-buttons.module.sass';

export const isEmpty = (obj) => {
  if (!obj) return true;

  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const TapButtonsList = ({
  options,
  value: apiVal,
  onChange,
  status,
  defaultVal,
  sectionName,
  ...rest
}) => {
  const isValueExist = (value) => value || value === false || value === 0;
  const labelClass = classNames(s.label, {
    [s.error]: status === INPUT_STATUS.INVALID,
  });

  return (
    <>
      {options.map(({ option, value: elVal, content }) => {
        const active = isValueExist(apiVal)
          ? apiVal === elVal
          : defaultVal === elVal;
        const buttonClass = classNames(s.item, { [s.active]: active });

        const handleChange = (e) =>
          onChange({
            ...e,
            target: { ...e.target, name: e.target.name, value: elVal },
          });

        return (
          <div className={buttonClass} key={elVal}>
            <label htmlFor={option} className={labelClass}>
              <span className={s.labelText}>{option}</span>
              <input
                className={s.input}
                type="radio"
                name={sectionName}
                value={elVal}
                onChange={handleChange}
                checked={active}
                data-id={option || null}
                {...rest}
              />
              <span className={s.checkmark} />
            </label>
            {!isEmpty(content) && <content.Component {...content.props} />}
          </div>
        );
      })}
    </>
  );
};

TapButtonsList.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      option: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  defaultVal: PropTypes.any,
  status: PropTypes.string,
  sectionName: PropTypes.string,
};

TapButtonsList.defaultProps = {
  value: '',
  defaultVal: '',
  status: INPUT_STATUS.DEFAULT,
  sectionName: '',
};

export default TapButtonsList;
