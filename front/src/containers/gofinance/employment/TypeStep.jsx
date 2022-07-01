import React from 'react';
import PropTypes from 'prop-types';

import { TapButtons } from '~components';
import { FORM } from '~constants';
import s from './employment.module.sass';

const { EMPLOYMENT_TYPES } = FORM;

const TypeStep = ({ onChange, employmentType }) => (
  <div className={s.typeFormWrapper}>
    <TapButtons
      label="What is your employment type?"
      subTitle="Select from the list below"
      options={EMPLOYMENT_TYPES}
      onChange={onChange}
      required
      status={employmentType.status}
      value={employmentType.value}
    />
  </div>
);

TypeStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  employmentType: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default TypeStep;
