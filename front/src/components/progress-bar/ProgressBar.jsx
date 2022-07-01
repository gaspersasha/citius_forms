import React from 'react';
import PropTypes from 'prop-types';
import s from './progress-bar.module.sass';

export default function ProgressBar({ progress }) {
  let validProgress = progress;

  if (progress < 0) validProgress = 0;
  if (progress > 100) validProgress = 100;

  return (
    <div className={s.container}>
      <div
        data-id="progress-bar"
        className={s.line}
        style={{ width: `${validProgress}%` }}
      >
        &nbsp;
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
