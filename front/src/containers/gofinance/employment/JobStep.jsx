import React from 'react';
import PropTypes from 'prop-types';
import { InputText } from '~components';
import s from './employment.module.sass';

const JobStep = ({ employmentStatus, onJobInfoChange, employer, jobTitle }) => (
  <div className={s.jobFormWrapper}>
    {employmentStatus !== 'selfEmployed' && (
      <div className={s.jobInputWrapper}>
        <InputText
          label="Who is your employer?"
          name="employer"
          subTitle="Please provide your employer below"
          placeholder="Employer"
          required
          onChange={onJobInfoChange}
          status={employer.status}
          value={employer.value}
        />
      </div>
    )}

    <InputText
      label="What is your job title?"
      name="jobTitle"
      subTitle="Please provide your job title below"
      placeholder="Job title"
      required
      onChange={onJobInfoChange}
      status={jobTitle.status}
      value={jobTitle.value}
    />
  </div>
);

JobStep.propTypes = {
  employmentStatus: PropTypes.string.isRequired,
  onJobInfoChange: PropTypes.func.isRequired,
  employer: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  jobTitle: PropTypes.shape({
    status: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default JobStep;
