import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import s from './progress-bar-steps.module.sass';

export const ProgressBarSteps = ({ steps, currentStep, progress }) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className={s.container}>
      <div className={s.bar}>
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            {currentStepIndex > index && (
              <div
                className={`${s.step} ${s.passed}`}
                data-id="progress-bar-step"
                key={step.id}
              >
                <div className={s.icon} />
                <div className={s.title}>{step.text}</div>
              </div>
            )}
            {currentStepIndex === index && (
              <div
                className={`${s.step} ${s.current}`}
                data-id="progress-bar-step"
                key={step.id}
              >
                <div className={s.icon}>
                  <div className={s.diagram}>
                    <svg
                      width="51px"
                      height="52px"
                      viewBox="0 0 42 42"
                      className="donut"
                    >
                      <circle
                        className="donut-segment"
                        cx="21"
                        cy="21"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke="#0076FD"
                        strokeWidth="3"
                        strokeDasharray={`${progress} ${100 - progress}`}
                        strokeDashoffset="25"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className={s.progress}>{`${progress}%`}</span>
                </div>
                <div className={s.title}>{step.text}</div>
              </div>
            )}
            {currentStepIndex < index && (
              <div
                className={`${s.step} ${s.future}`}
                data-id="progress-bar-step"
                key={step.id}
              >
                <div className={s.icon}>
                  <span className={s.stepNumber}>{index + 1}</span>
                </div>
                <div className={s.title}>{step.text}</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

ProgressBarSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default ProgressBarSteps;
