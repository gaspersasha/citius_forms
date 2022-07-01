import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './timer.module.sass';

export const getRemainingTime = (from, to) => {
  let distanceToDate = to - from;

  if (distanceToDate < 0) distanceToDate = 0;

  const time = {
    days: Math.floor(distanceToDate / (1000 * 60 * 60 * 24)).toString(),
    hours: Math.floor(
      (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ).toString(),
    minutes: Math.floor(
      (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
    ).toString(),
    seconds: Math.floor((distanceToDate % (1000 * 60)) / 1000).toString(),
  };

  Object.keys(time).forEach((measure) => {
    const value = time[measure];

    if (measure !== 'days' && value < 10 && value !== '0') {
      time[measure] = `0${value}`;
    }
  });

  return time;
};

export const Timer = ({ className, date }) => {
  if (!date) return null;

  const [state, setState] = useState({
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  const setTime = () => {
    const { days, hours, minutes, seconds } = getRemainingTime(
      new Date().getTime(),
      new Date(date).getTime()
    );

    setState({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    setTime();
    const interval = setInterval(setTime, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className={className} data-id="timer">
      {Object.keys(state).map((key) => (
        <React.Fragment key={`${key}_${state[key]}`}>
          <div className={s.cell}>
            <div className={s.measure}>{key}</div>
            <div className={s.value} data-id={key}>
              {state[key]}
            </div>
          </div>
          <div className={s.colon}>:</div>
        </React.Fragment>
      ))}
    </div>
  );
};

Timer.propTypes = {
  date: PropTypes.string.isRequired, // any valid date format
  className: PropTypes.string,
};

Timer.defaultProps = {
  className: '',
};

export default Timer;
