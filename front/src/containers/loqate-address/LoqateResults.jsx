import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { INPUT_STATUS } from '~constants';
import s from './styles/postcode.module.sass';

const LoqateResults = ({ lines, className, status }) => {
  const classes = cn(
    {
      // 'success-input-border': status === INPUT_STATUS.VALID,
      'error-input-border': status === INPUT_STATUS.INVALID,
    },
    ...className,
    s.border
  );

  return (
    <div className={classes} data-id="loqate-results">
      {lines.map(
        (line) =>
          Boolean(line && line.replace(/\s+/g, '').length) && (
            <p key={line}>{line.replace(/^\s+/g, '')}</p>
          )
      )}
    </div>
  );
};

LoqateResults.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.oneOf([
    INPUT_STATUS.DEFAULT,
    INPUT_STATUS.VALID,
    INPUT_STATUS.INVALID,
  ]),
};

LoqateResults.defaultProps = {
  className: [],
  status: INPUT_STATUS.DEFAULT,
};

export default LoqateResults;
