import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '~components';
import { SCC } from '~constants';
import { makeQueryString } from '~utils';
import { typoPropsShape } from './VehicleStatus';
import s from './styles/vehicle-status.module.sass';

const FinanceSoft = ({
  productAdvertId,
  financeQuoteId,
  softCreditSearch: { band, score },
  typoProps,
}) => {
  const title = (
    <Typography {...typoProps.title}>Your finance eligibility</Typography>
  );

  if (score < SCC.TOO_LOW_CREDIT_SCORE) {
    return (
      <>
        {title}
        <Typography {...typoProps.text}>
          Unfortunately, based on your credit score you will not be approved for
          finance with any of the lenders on our panel
        </Typography>
        <Typography {...typoProps.text} className={s.lowScoreTitle}>
          Check your credit score
        </Typography>
        <Typography {...typoProps.text}>
          Your credit score and financial history is used by lenders to find out
          if you are eligible to take out finance, and what interest rates your
          likely to get. Read our guide to find out how to check your credit
          score.
        </Typography>
        <Typography {...typoProps.text} className={s.lowScoreTitle}>
          What next?
        </Typography>
        <Typography {...typoProps.text}>
          We’d recommend waiting at least 4 weeks before submitting a new
          application - frequent eligibility checks with lenders could impact
          your credit score negatively.
        </Typography>
      </>
    );
  }

  // A|B - 'very likely', C - 'likely'
  const probability = band === 'A' || band === 'B' ? 'very likely' : 'likely';

  return (
    <>
      {title}
      {band && band.toUpperCase() > 'C' ? (
        <Typography {...typoProps.subTitle}>
          We need more information to determine if you are likely to approved
          for finance with one of our lenders. Please complete a finance
          application
        </Typography>
      ) : (
        <Typography data-id="probability-text" {...typoProps.subTitle}>
          From your soft credit check we can see that you are
          {` ${probability} `}
          to be approved for finance
        </Typography>
      )}
      <Button
        className={s.btn}
        target="_blank"
        href={makeQueryString('/finance', { productAdvertId, financeQuoteId })}
      >
        Continue your application
      </Button>
    </>
  );
};

FinanceSoft.propTypes = {
  productAdvertId: PropTypes.number,
  financeQuoteId: PropTypes.number,
  softCreditSearch: PropTypes.shape({
    band: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

FinanceSoft.defaultProps = {
  productAdvertId: null,
  financeQuoteId: null,
  softCreditSearch: {},
};

export default FinanceSoft;
