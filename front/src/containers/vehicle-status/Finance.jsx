import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '~components';
import { makeQueryString } from '~utils';
import { subSteps } from './helpers';
import { typoPropsShape } from './VehicleStatus';
import { FinanceSoft } from '.';
import s from './styles/vehicle-status.module.sass';

const Finance = ({
  substep,
  quoteId,
  productAdvertId,
  financeQuoteId,
  typoProps,
  softCreditSearch,
}) => {
  switch (substep) {
    case subSteps.SOFT:
      return (
        <FinanceSoft
          productAdvertId={productAdvertId}
          financeQuoteId={financeQuoteId}
          softCreditSearch={softCreditSearch}
          typoProps={typoProps}
        />
      );

    case subSteps.APPLIED:
      return (
        <>
          <Typography {...typoProps.title}>Add a part exchange</Typography>
          <Typography {...typoProps.subTitle}>
            Pick up where your left off
          </Typography>
          <Button
            className={s.btn}
            target="_blank"
            href={makeQueryString('/part-ex', { productAdvertId })}
          >
            Continue your application
          </Button>
        </>
      );

    case subSteps.PART_EX:
      return (
        <>
          <Typography {...typoProps.title}>Add your terms</Typography>
          <Typography {...typoProps.subTitle}>
            Pick up where your left off
          </Typography>
          <Button
            className={s.btn}
            target="_blank"
            href={makeQueryString('/terms', { quoteId, productAdvertId })}
          >
            Continue your application
          </Button>
        </>
      );

    default:
      return null;
  }
};

Finance.propTypes = {
  substep: PropTypes.oneOf([subSteps.SOFT, subSteps.APPLIED, subSteps.PART_EX])
    .isRequired,
  productAdvertId: PropTypes.number,
  quoteId: PropTypes.number,
  quoteItemId: PropTypes.number,
  financeQuoteId: PropTypes.number,
  softCreditSearch: PropTypes.shape({
    band: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  typoProps: PropTypes.shape(typoPropsShape).isRequired,
};

Finance.defaultProps = {
  productAdvertId: null,
  quoteItemId: null,
  quoteId: null,
  financeQuoteId: null,
  softCreditSearch: {},
};

export default Finance;
