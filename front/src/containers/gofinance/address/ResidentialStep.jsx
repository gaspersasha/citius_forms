import React from 'react';
import PropTypes from 'prop-types';

import { TapButtons } from '~components';
import { FORM } from '~constants';
import s from './address.module.sass';

const { RESIDENTIAL_STATUSES } = FORM;

const ResidentialStep = ({ residentialStatus, onChange }) => (
  <div className={s.residentialFormWrapper}>
    <TapButtons
      label="What is your residential status?"
      subTitle="Select from the list below"
      value={residentialStatus.value}
      status={residentialStatus.status}
      required
      options={RESIDENTIAL_STATUSES}
      onChange={onChange}
    />
  </div>
);

ResidentialStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  residentialStatus: PropTypes.shape({
    value: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default ResidentialStep;
