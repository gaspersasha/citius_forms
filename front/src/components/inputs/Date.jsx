import React from 'react';
import PropTypes from 'prop-types';
import MaskedTextInput from 'react-text-mask';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';

const InputDate = ({
  name,
  label,
  required,
  subTitle,
  useErrorBorder = true,
  errorMessage,
  className,
  status,
  placeholder,
  ...rest
}) => {
  const correctDaysInMonth = (userInput) => {
    // input isn't final yet - proceed with no changes
    if (userInput.indexOf('_') >= 0) return userInput;

    // transform 'DD/MM/YY' into 'MM/DD/YY' so date constructor can use it
    let [inputDay, inputMonth] = userInput.split('/');
    const [, , inputYear] = userInput.split('/');

    if (inputDay === '00') inputDay = '01';
    if (inputMonth === '00') inputMonth = '01';

    const jsDate = new Date([inputMonth, inputDay, inputYear].join('/'));
    let correctMonth = jsDate.getMonth();

    // dates aren't equal, therefor we need to update user input into a correct input
    if (parseInt(correctMonth, 10) === parseInt(inputMonth, 10)) {
      correctMonth += 1;
      let correctDay = jsDate.getDate();

      if (correctDay < 10) correctDay = `0${correctDay}`;
      if (correctMonth < 10) correctMonth = `0${correctMonth}`;

      return {
        value: [correctDay, correctMonth, inputYear].join('/'),
        indexesOfPipedChars: [0, 1, 3, 4], // we change only DD/MM
      };
    }

    // transform back, since we could have changed Day and Month for '00'
    return {
      value: [inputDay, inputMonth, inputYear].join('/'),
      indexesOfPipedChars: [0, 1, 3, 4, 6, 7, 8, 9], // we possible change only xD/xM
    };
  };

  const setInputMask = (elem) => {
    const all = /[0-9]/;
    const yearsMask = [/[1,2]/, all, all, all];
    const monthMask = [/[0,1]/, /[0-9]/];
    const daysMask = [/[0-3]/, all];

    const [days, month, years] = elem.split('/');
    const [d1] = days;

    if (years) {
      // we let user enter only 19xx and 200x
      const [y1] = years;

      if (y1 === '1') {
        yearsMask[1] = /9/;
      }

      if (y1 === '2') {
        yearsMask[1] = /0/;
        yearsMask[2] = /0/;
      }
    }

    if (month) {
      const [m1] = month;

      if (m1 === '0') {
        monthMask[1] = /[1-9]/;
      }

      // there are only 12 month
      if (m1 === '1') {
        monthMask[1] = /[0-2]/;
      }
    }

    // min 1 day, max 31 days
    if (d1 === '0') {
      daysMask[1] = /[1-9]/;
    }

    if (d1 === '3') {
      daysMask[1] = /[0,1]/;
    }

    return [...daysMask, '/', ...monthMask, '/', ...yearsMask];
  };

  const inputClassName = cn(
    {
      'error-input-border': status === INPUT_STATUS.INVALID && useErrorBorder,
    },
    className
  );

  const labelClassName = cn({
    'error-form-label': status === INPUT_STATUS.INVALID,
  });

  const isInvalid = errorMessage && status === INPUT_STATUS.INVALID;
  const withSub = !!(subTitle || isInvalid);

  return (
    <Label
      name={name}
      title={label}
      required={required}
      customClasses={labelClassName}
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
      <MaskedTextInput
        mask={setInputMask}
        pipe={correctDaysInMonth}
        placeholder={placeholder}
        className={inputClassName}
        name={name}
        guide
        {...rest}
      />
    </Label>
  );
};

InputDate.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  subTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  useErrorBorder: PropTypes.bool,
  label: PropTypes.string,
  status: PropTypes.string,
  placeholder: PropTypes.string,
};

InputDate.defaultProps = {
  className: '',
  name: 'datepicker',
  required: false,
  subTitle: '',
  errorMessage: '',
  useErrorBorder: true,
  label: 'Date of birth',
  placeholder: 'DD/MM/YYYY',
  status: '',
};

export default InputDate;
