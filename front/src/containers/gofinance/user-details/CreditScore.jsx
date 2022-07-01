import React from 'react';
import PropTypes from 'prop-types';
import { CreditScore as CreditScoreIcon } from '~assets/svg';
import { getCreditScoreLevel } from './helpers';
import s from './styles/credit-score.module.sass';

const CreditScore = ({ creditScore, firstName }) => {
  const level = getCreditScoreLevel(creditScore);

  const renderCreditScoreText = () => {
    if (!level || level === 'Bad') {
      return (
        <p>
          Continue your finance application below. Once complete we can
          determine if you are likely to be approved.
        </p>
      );
    }

    if (level === 'Very poor' || level === 'Poor') {
      return (
        <p>Hi {firstName}, please continue your finance application below.</p>
      );
    }

    if (level === 'Fair') {
      return (
        <p>
          Hi {firstName}, good news!
          <span className={s.accent}> You are likely to be approved</span> for
          finance, continue your application below.
        </p>
      );
    }

    if (level === 'Good' || level === 'Excellent') {
      return (
        <p>
          Hi {firstName}, great news!
          <span className={s.accent}>
            {' '}
            You are very likely to be approved
          </span>{' '}
          for finance, continue your application below.
        </p>
      );
    }
  };

  return (
    <div className={`align-left ${s.wrapper}`}>
      <div className={s.img}>
        <CreditScoreIcon />
      </div>
      <div>{renderCreditScoreText()}</div>
    </div>
  );
};

CreditScore.propTypes = {
  firstName: PropTypes.string.isRequired,
  creditScore: PropTypes.number,
};

CreditScore.defaultProps = {
  creditScore: null,
};

export default CreditScore;
